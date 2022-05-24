import { createContext } from 'react';

const Context = createContext({
  setNewAncdCreated: () => {},
  newAncdCreated: '',
});

export default Context;
