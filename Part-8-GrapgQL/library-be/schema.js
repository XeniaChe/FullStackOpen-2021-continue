const { gql } = require('apollo-server');

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
    filteredBooks(filter: String!): [Book!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]
    ): Book
    editAuthor(name: String!, born: Int!, token: String!): Author
    createUser(
      username: String!
      favouriteGenre: String!
      password: String!
    ): User
    login(userName: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = typeDefs;
