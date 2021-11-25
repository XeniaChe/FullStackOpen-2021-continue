import React from 'react';
import { /* createStore, */ useDispatch } from 'react-redux';
import { /*  noteReducer, */ addNewNote } from '../reducers/noteReducer';

// Before  useDispatch, useSelector HOOKS
// const store = createStore(noteReducer);
// store.dispatch(addNewNote(content));

const Note = () => {
  const dispatch = useDispatch();

  const addNewNoteHandler = (event) => {
    event.preventDefault();
    console.log('ADDING new note');

    const content = event.target.note.value;
    dispatch(addNewNote(content));
    event.target.note.value = '';
  };

  return (
    <>
      <form onSubmit={addNewNoteHandler}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>
    </>
  );
};

export default Note;
