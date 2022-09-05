const Book = require('./models/book');
const Author = require('./models/author');

const authorsInit = [
  {
    name: 'Robert Martin',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky',
  },
  {
    name: 'Sandi Metz',
  },
];
// Populate authors coll-n with init data
const populateAuthors = async () => {
  await Author.create(authorsInit);
};

const deleteTrashAuthor = async () =>
  await Author.deleteMany({
    name: {
      $nin: authorsInit.map((auth) => auth.name),
    },
  });

const getAuthors = async () => {
  const authArr = await Author.find({});

  const authObj = {};
  authArr.forEach((auth) => {
    authObj[auth.name] = { id: auth.id };
  });

  return authObj;
};

const getBooksInit = async () => {
  const authorsObj = await getAuthors();
  const res = [
    {
      title: 'Clean Code',
      published: 2008,
      author: authorsObj['Robert Martin'].id,
      genres: ['refactoring'],
    },
    {
      title: 'Agile software development',
      published: 2002,
      author: authorsObj['Robert Martin'].id,
      genres: ['agile', 'patterns', 'design'],
    },
    {
      title: 'Refactoring, edition 2',
      published: 2018,
      author: authorsObj['Martin Fowler'].id,
      genres: ['refactoring'],
    },
    {
      title: 'Refactoring to patterns',
      published: 2008,
      author: authorsObj['Joshua Kerievsky'].id,
      genres: ['refactoring', 'patterns'],
    },
    {
      title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
      published: 2012,
      author: authorsObj['Sandi Metz'].id,
      genres: ['refactoring', 'design'],
    },
    {
      title: 'Crime and punishment',
      published: 1866,
      author: authorsObj['Fyodor Dostoevsky'].id,
      genres: ['classic', 'crime'],
    },
    {
      title: 'The Demon ',
      published: 1872,
      author: authorsObj['Fyodor Dostoevsky'].id,
      genres: ['classic', 'revolution'],
    },
  ];

  return res;
};

const populateBooks = async () => {
  const booksInit = await getBooksInit();

  await Book.create(booksInit);
};

const deleteTrashBook = async () => {
  const booksInit = await getBooksInit();

  return await Book.deleteMany({
    title: {
      $nin: booksInit.map((book) => book.title),
    },
  });
};

module.exports = {
  populateAuthors,
  populateBooks,
  deleteTrashBook,
  deleteTrashAuthor,
};
