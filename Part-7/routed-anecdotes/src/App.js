import React, { useContext, useState } from 'react';
import {
  NavLink,
  Routes,
  Route,
  Link,
  // useParams,
  Outlet,
  useMatch,
  useNavigate,
} from 'react-router-dom';
import Context from './context';
import useField from './hooks/custom-hook';

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <NavLink to='/' style={padding}>
        {' '}
        anecdotes
      </NavLink>
      <NavLink to='/create-new' style={padding}>
        {' '}
        create new
      </NavLink>
      <NavLink to='/about' style={padding}>
        {' '}
        about
      </NavLink>
    </div>
  );
};

const Anecdote = ({ anecdote }) => {
  // BEfore useMatch()
  // const { id } = useParams();
  // const anecdote = anecdotes.find((el) => el.id === id);

  return (
    <div>
      <h1>{anecdote.content}</h1>
      <p>Has {anecdote.votes} votes</p>
      <p>For more info see {anecdote.info} votes</p>
      <p>Anecdote's id: {anecdote.id}</p>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for{' '}
    <a href='https://courses.helsinki.fi/fi/tkt21009'>
      Full Stack -websovelluskehitys
    </a>
    . See{' '}
    <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const content = useField('content');
  const author = useField('author');
  const info = useField('info');
  //To redirect after submit
  const navigate = useNavigate();

  // Update the state in App with useContext()
  const { newAncdCreated, setNewAncdCreated } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    // Setting newAncdCreated state in App component using useContext
    setNewAncdCreated(content.value);
    navigate('/');
    setTimeout(() => {
      setNewAncdCreated('');
    }, 3000);
  };

  const resetAllFields = () => {
    content.resetField();
    author.resetField();
    info.resetField();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form>
        <div>
          content
          <input
            name={content.name}
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            name={author.name}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input name={info.name} value={info.value} onChange={info.onChange} />
        </div>
        <button onClick={handleSubmit} type='submit'>
          create
        </button>
        <button onClick={resetAllFields}>reset</button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ]);

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  // After useMatch(
  const match = useMatch('/anecdotes/:id');
  const matchedAnecdote = anecdotes.find((el) => el.id === match?.params.id);

  // Using useContext
  const [newAncdCreated, setNewAncdCreated] = useState('');

  return (
    <Context.Provider value={{ newAncdCreated, setNewAncdCreated }}>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <p>{newAncdCreated ? `New anecdote: '${newAncdCreated}' added` : ''}</p>

        <Routes>
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />}>
            <Route
              path='/anecdotes/:id'
              element={<Anecdote anecdote={matchedAnecdote} />}
            />
          </Route>
          {/* For NOT nested routes */}
          {/* <Route
          path='/anecdotes/:id'
          element={<Anecdote anecdote={matchedAnecdote} />}
        /> */}
          <Route path='/create-new' element={<CreateNew addNew={addNew} />} />
          <Route path='/about' element={<About />} />
        </Routes>

        <Footer />
      </div>
    </Context.Provider>
  );
};

export default App;
