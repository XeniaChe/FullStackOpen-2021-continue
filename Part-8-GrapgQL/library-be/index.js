const { ApolloServer } = require('apollo-server-express');
// Subscriptions
const { createServer } = require('http');
const express = require('express');
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} = require('apollo-server-core');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');

const User = require('./models/user');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const mongoose = require('mongoose');

const MONGODB_URL =
  'mongodb+srv://mongo-start-user:resu-trats-ognom@cluster1.qm9gg.mongodb.net/library-GQL?retryWrites=true&w=majority';

const {
  populateBooks,
  populateAuthors,
  deleteTrashBook,
  deleteTrashAuthor,
} = require('./initData');

const jwt = require('jsonwebtoken');
const SECRET_FOR_TOKEN = 'this_must_be_a_secret';

console.log(`Connecting to:  ${MONGODB_URL}`);

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log(`Connected to: ${MONGODB_URL}`))
  .catch((error) => console.log(`Connection failed:`));

// Create Init Data. ONLY ONCE
// populateAuthors();
// populateBooks();

// Clean the db
// deleteTrashBook();
// deleteTrashAuthor();

const schema = makeExecutableSchema({ typeDefs, resolvers });
const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  // Pass a different path here if your ApolloServer serves at
  // a different path.
  path: '/graphql',
});

const serverCleanup = useServer({ schema }, wsServer);

const start = async () => {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null;

      if (auth && auth.toLowerCase().startsWith('bearer')) {
        const token = auth.substring(7);
        const decoded = jwt.verify(token, SECRET_FOR_TOKEN);

        const currentUser = await User.findById(decoded.id);

        return { currentUser };
      }
    },
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4001;
  httpServer.listen(PORT, () => {
    console.log(
      `Server is now running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};
start();

/* const server = new ApolloServer({
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
*/

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
