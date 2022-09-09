const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const SECRET_FOR_TOKEN = 'this_must_be_a_secret';

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

let allAuthors = [];
const getAllAuthorsInit = async () => await Author.find({}).populate('books');

// Before N+1 solved
/* const booksCountHandler = async (id) => {
  try {
    const allBooks = await Book.find({ author: id });
    return allBooks.length;
  } catch (error) {
    throw new Error(error.message);
  }
}; */

const resolvers = {
  Author: {
    // Before N+1 solved
    // bookCount: async (root) => await booksCountHandler(root.id),
    bookCount: (root) => root.books.length,
  },

  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async () => await Book.find({}).populate('author'),
    allAuthors: async () =>
      allAuthors.length ? allAuthors : getAllAuthorsInit(),
    me: async (_, args, { currentUser }) => currentUser,
    filteredBooks: async (_, args) =>
      await Book.find({ genres: { $in: [args.filter] } }).populate('author'),
  },

  Mutation: {
    addBook: async (_, args, { currentUser }) => {
      if (!currentUser)
        throw new AuthenticationError('Not authenticated. Bad credentials.');

      try {
        let authorMatch = await Author.findOne({ name: args.author });
        if (!authorMatch)
          authorMatch = await Author.create({ name: args.author });

        const newBook = new Book({
          title: args.title,
          published: args.published,
          genres: args.genres,
          author: authorMatch.id,
        });

        const books = await Book.find({});
        if (
          !books.some(
            (book) => book.title === args.title && book.author === args.author
          )
        ) {
          const bookSaved = await (await newBook.save()).populate('author');

          // Add newBook to author's 'books' list
          authorMatch.books = authorMatch.books.concat(bookSaved.id);
          await authorMatch.save();
        }

        pubsub.publish('BOOK_ADDED', { bookAdded: newBook });

        return newBook;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: Object.keys(args),
        });
      }
    },

    editAuthor: async (_, args, { currentUser }) => {
      if (!currentUser)
        throw new AuthenticationError('Not authenticated. Bad credentials.');

      try {
        const authToUpd = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.born },
          { new: true }
        );

        if (!authToUpd) throw new Error('Author is not found ');

        return authToUpd;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: Object.keys(args),
        });
      }
    },

    createUser: async (_, args) => {
      const passHash = await bcrypt.hash(args.password, saltRounds);

      const newUser = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
        passwordHash: passHash,
      });

      try {
        await newUser.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: Object.keys(args),
        });
      }

      return newUser;
    },

    login: async (_, args) => {
      try {
        const userMatch = await User.findOne({ username: args.userName });

        if (!userMatch)
          throw new Error('Please sign up to continue using the platform');

        const passwordCorrect = await bcrypt.compare(
          args.password,
          userMatch.passwordHash
        );

        if (!passwordCorrect) throw new Error('Wrong credentials');

        const userForToken = {
          username: args.userName,
          id: userMatch.id,
        };

        const token = jwt.sign(userForToken, SECRET_FOR_TOKEN);

        return { value: token };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Subscription: {
    bookAdded: { subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']) },
  },
};

module.exports = resolvers;
