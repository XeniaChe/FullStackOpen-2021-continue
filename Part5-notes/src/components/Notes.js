import React from 'react';
import { /* createStore,  */ useDispatch, useSelector } from 'react-redux';
import { /* noteReducer,  */ toggleImportance } from '../reducers/noteReducer';

// Before  useDispatch, useSelector HOOKS
// const store = createStore(noteReducer);
// const state = store.getState();
// const toogleImportanceHandler = (id) => {
//     store.dispatch(toggleImportance(id));
//   };

const Notes = () => {
  // If it's defined here within component then it will be re-defined every time the comp is being re-rendered
  // And in opposite direction: if prev and cur values of state (selector's result) are different, the comp will be re-rendered
  const dispatch = useDispatch();
  const notes = useSelector((state) => state);

  const toogleImportanceHandler = (id) => {
    dispatch(toggleImportance(id));
  };

  return (
    <>
      <ul>
        {notes.map((note) => (
          <li key={note.id} onClick={() => toogleImportanceHandler(note.id)}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Notes;
