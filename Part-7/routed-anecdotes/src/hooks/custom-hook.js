import { useState } from 'react';

const useField = (text) => {
  const [value, setVal] = useState('');
  const onChange = (e) => setVal(e.target.value);
  const resetfield = () => {
    setVal('');
  };

  return {
    name: text,
    value,
    onChange,
    resetfield,
  };
};

export default useField;
