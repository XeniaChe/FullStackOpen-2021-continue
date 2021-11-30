import React from 'react';
import { /*  useSelector, */ useDispatch } from 'react-redux';
import { setFilter } from '../store/reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();
  //   const filterVal = useSelector((state) => state.filter);
  const style = { marginBottom: 10 };

  const handleChange = (event) => {
    const value = event.target.value;
    dispatch(setFilter(value));
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
