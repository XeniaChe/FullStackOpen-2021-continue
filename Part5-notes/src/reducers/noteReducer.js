const generateId = () => Math.floor(Math.random() * 1000000);

const addNewNote = (content) => {
  return {
    type: 'ADD_NEW_NOTE',
    data: { content, import: false, id: generateId() },
  };
};

const toggleImportance = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id },
  };
};

const initialState = [];

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NEW_NOTE':
      // return state.concat(action.data);
      return [...state, action.data];

    case 'TOGGLE_IMPORTANCE': {
      const matchedNote = state.find((note) => note.id === action.data.id);
      const noteToChange = {
        ...matchedNote,
        important: !matchedNote.important,
      };
      const changedState = state.map((note) =>
        note.id === matchedNote.id ? noteToChange : note
      );
      return changedState;
    }

    default:
      return state;
  }
};

export { noteReducer, addNewNote, toggleImportance };
