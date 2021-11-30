import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../store/reducers/filterReducer';

const Filter = (props) => {
  const style = { marginBottom: 10 };

  const handleChange = (event) => {
    const value = event.target.value;

    props.setFilter(value);
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (value) => {
      dispatch(setFilter(value));
    },
  };
};

export default connect(null, mapDispatchToProps)(Filter);
