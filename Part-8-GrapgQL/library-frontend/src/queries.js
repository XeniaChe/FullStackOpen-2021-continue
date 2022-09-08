import { gql } from '@apollo/client';

const BOOK_DETAIL = gql`
  fragment bookDetail on Book {
    title
    published
    author {
      name
      bookCount
      born
      id
    }
    genres
  }
`;

export const GET_ALL_AUTHORS = gql`
  query AllAuthors {
    allAuthors {
      name
      bookCount
      born
      id
    }
  }
`;

export const GET_ALL_BOOKS = gql`
  query AllBooks {
    allBooks {
      ...bookDetail
    }
  }

  ${BOOK_DETAIL}
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
      ...bookDetail
    }
  }

  ${BOOK_DETAIL}
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

export const LOGIN = gql`
  mutation Login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      value
    }
  }
`;

export const GET_ME = gql`
  query Me {
    me {
      username
      favouriteGenre
    }
  }
`;

export const GET_FILTERED_BOOKS = gql`
  query FilteredBooks($filter: String!) {
    filteredBooks(filter: $filter) {
      title
      author {
        name
      }
    }
  }
`;

export const NEW_BOOK_SUBSCRIBE = gql`
  subscription OnbOOKAdded {
    bookAdded {
      ...bookDetail
    }
  }

  ${BOOK_DETAIL}
`;
