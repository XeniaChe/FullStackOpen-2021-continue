// Before React added
/* export const App = () => {
  console.log(`App file`);
}; */

// After React added

import React, { useState } from 'react'; // we need this now also in component files

import './index.css';

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);

  const handleClick = () => {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  };

  return (
    <div className='container'>
      hello webpack {counter} clicks
      <button onClick={handleClick}>press</button>
    </div>
  );
};

export default App;