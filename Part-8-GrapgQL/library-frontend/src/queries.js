import { gql } from '@apollo/client';

export const GET_ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const GET_ALL_BOOKS = gql`
  query AllBooks($author: String) {
    allBooks(author: $author) {
      title
      published
      author
      genres
    }
  }
`;
export const ADD_NEW_BOOK = gql`
  mutation addNewBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author
      genres
    }
  }
`;

export const EDIT_AUTHOR_BIRTH = gql`
  mutation editAuthorBirth($name: String!, $born: Int) {
    editAuthor(name: $name, born: $born) {
      name
      born
      bookCount
    }
  }
`;
