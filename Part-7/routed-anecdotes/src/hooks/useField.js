import { useState } from 'react';

export const useField = (name, type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onReset = () => {
    setValue('');
  };

  return {
    value,
    onChange,
    name,
    type,
    onReset,
  };
};
