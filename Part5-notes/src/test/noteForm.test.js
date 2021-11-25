import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import NoteForm from '../components/NoteForm';

test('<NoteForm /> updates parent state and calls onSubmit', () => {
  const createNote = jest.fn();
  const allNotesTest = ['someNote1', 'someNote2', 'someNote3'];

  const component = render(
    <NoteForm sendNewNoteService={createNote} allNotes={allNotesTest} />
  );

  const input = component.container.querySelector('input');
  const form = component.container.querySelector('form');

  fireEvent.change(input, {
    target: { value: 'testing of forms could be easier' },
  });
  fireEvent.submit(form);

  expect(createNote.mock.calls.length).toBe(1);
  expect(createNote.mock.calls[0][0].content).toBe(
    'testing of forms could be easier'
  );
});
