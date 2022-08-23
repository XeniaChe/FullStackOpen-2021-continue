const { ApolloServer, UserInputError, gql } = require('apollo-server');
const Book = require('./models/book');
const Author = require('./models/author');
const mongoose = require('mongoose');
/* const { populateBooks, populateAuthors } = require('./initData'); */

const MONGODB_URL =
  'mongodb+srv://mongo-start-user:resu-trats-ognom@cluster1.qm9gg.mongodb.net/library-GQL?retryWrites=true&w=majority';

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
    id: ID
    genres: [String!]
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks: [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book
    editAuthor(name: String!, born: Int!): Author
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
  },
  Mutation: {
    addBook: async (_, args) => {
      const authorMatch = await Author.findOne({ name: args.author });

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
    },
    editAuthor: async (_, args) => {
      const authToUpd = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.born },
        { new: true }
      );

      return authToUpd;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
