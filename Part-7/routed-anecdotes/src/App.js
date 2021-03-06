import React, { useState } from 'react';
import {
  NavLink,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from 'react-router-dom';

// Custom Hooks
import { useField } from '../src/hooks/useField';

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

const Anecdote = ({ anecdotes }) => {
  const { id } = useParams();
  const anecdote = anecdotes.find((el) => el.id === id);

  return (
    <div>
      <h1>{anecdote.content}</h1>
      <p>Has {anecdote.votes} votes</p>
      <p>For more info see {anecdote.info} votes</p>
      <p>Anecdote's id: {id}</p>
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

const CreateNew = ({ addNew, setNotification }) => {
  // Custom HOOK
  const content = useField('content', 'text');
  const author = useField('author', 'text');
  const info = useField('info', 'url');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

    history.push('/');

    setNotification(`A new anecdote ${content} has just been created!`);

    setTimeout(() => {
      setNotification(``);
    }, 10000);
  };

  const onResetFieldsHandler = () => {
    content.onReset();
    author.onReset();
    info.onReset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name={content.name}
            value={content.value}
            onChange={content.onChange}
            type={content.type}
          />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type='submit'>create</button>
        <button onClick={onResetFieldsHandler} type='reset'>
          reset
        </button>
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

  const [notification, setNotification] = useState('');

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

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification ? <p>{notification}</p> : null}
      <Switch>
        <Route path='/' exact>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdotes={anecdotes} />
        </Route>
        <Route path='/create-new'>
          <CreateNew addNew={addNew} setNotification={setNotification} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
      </Switch>

      <Footer />
    </div>
  );
};

export default App;
