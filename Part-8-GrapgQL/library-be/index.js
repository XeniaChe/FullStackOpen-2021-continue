const {
  ApolloServer,
  UserInputError,
  gql,
  AuthenticationError,
} = require('apollo-server');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const mongoose = require('mongoose');
/* const { populateBooks, populateAuthors } = require('./initData'); */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const MONGODB_URL =
  'mongodb+srv://mongo-start-user:resu-trats-ognom@cluster1.qm9gg.mongodb.net/library-GQL?retryWrites=true&w=majority';

const SECRET_FOR_TOKEN = 'this_must_be_a_secret';

console.log(`Connecting to:  ${MONGODB_URL}`);

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log(`Connected to: ${MONGODB_URL}`))
  .catch((error) => console.log(`Connection failed:`));

// Create Init Data. ONLY ONCE
/* populateAuthors();
populateBooks(); */

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
    allAuthors: [Author!]!
    me: User!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
      token: String!
    ): Book
    editAuthor(name: String!, born: Int!, token: String!): Author
    createUser(
      username: String!
      favouriteGenre: String!
      password: String!
    ): User
    login(userName: String!, password: String!): Token
  }
`;

let allAuthors = [];
const getAllAuthorsInit = async () => await Author.find({});

const booksCountHandler = async (id) => {
  try {
    const allBooks = await Book.find({ author: id });
    return allBooks.length;
  } catch (error) {
    throw new Error(error.message);
  }
};

const resolvers = {
  Author: {
    bookCount: async (root) => await booksCountHandler(root.id),
  },

  Query: {
    bookCount: async () => await Book.countDocuments(),
    authorCount: async () => await Author.countDocuments(),
    allBooks: async () => await Book.find({}).populate('author'),
    allAuthors: async () =>
      allAuthors.length ? allAuthors : getAllAuthorsInit(),
    me: async (_, args, { currentUser }) => currentUser,
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
        )
          await newBook.save();

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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;

    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const token = auth.substring(7);
      const decoded = jwt.verify(token, SECRET_FOR_TOKEN);

      const currentUser = await User.findById(decoded.id);

      return { currentUser };
    }
  },
});

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

// Resolvers before MongoDB when data was locally stored in arrays
/* const booksCountHandler = (author) => {
  let count = 0;
  books.forEach((book) => {
    book.author === author ? ++count : count;
  });
  return count;
};
 */
/* const resolvers = {
  Author: {
    bookCount: (root) => booksCountHandler(root.name),
  },
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => books,
    // books.filter(
    //     (book) =>

    //       book.author === args.author &&
    //       (args.genre ? book.genres.includes(args.genre) : true)
    //   ) 
      allAuthors: () => authors,
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = { ...args, genres: args.genres, id: uuid() };
      const newAuthor = {
        name: args.author,
        id: uuid(),
        born: args.born || null,
      };

      if (
        !books.some(
          (book) => book.title === args.title && book.author === args.author
        )
      )
        books = books.concat(newBook);

      if (!authors.some((author) => author.name === args.author))
        authors = authors.concat(newAuthor);

      return newBook;
    },
    editAuthor: (_, args) => {
      const authorMatch = authors.find((author) => author.name === args.name);
      const authorUpd = { ...authorMatch, born: args.born };

      authors = authors.map((author) =>
        author.name === args.name ? authorUpd : author
      );

      return authorUpd;
    },
  },
};
 */
