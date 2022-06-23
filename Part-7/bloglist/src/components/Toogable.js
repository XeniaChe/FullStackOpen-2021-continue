import React, { useState, forwardRef, useImperativeHandle } from 'react';

const Toogable = (props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideIfVisible = { display: visible ? 'none' : '' };
  const showIfVisible = { display: visible ? '' : 'none' };

  const toogleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toogleVisibility,
    };
  });

  return (
    <div>
      <div style={hideIfVisible}>
        <button onClick={toogleVisibility}>new note</button>
      </div>
      <div style={showIfVisible}>
        {props.children}
        <button onClick={toogleVisibility}>cancel</button>
      </div>
    </div>
  );
};

export default forwardRef(Toogable);
