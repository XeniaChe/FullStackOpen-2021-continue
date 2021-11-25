import React /*  useEffect, useRef, useState  */ from 'react';

// Simplified version of App with Redux
// import { createStore } from 'redux';
// import { noteReducer } from './reducers/noteReducer';

import Note from './components/Note';
import Notes from './components/Notes';

///////////////////////////////////////////////////////////// With REDUX
/* store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2,
  },
});

store.dispatch({
  type: 'TOGGLE_IMPORTANCE',
  data: {
    id: 2,
  },
});
 */

const App = () => {
  return (
    <div>
      <Note />
      <Notes />
    </div>
  );
};

export default App;
