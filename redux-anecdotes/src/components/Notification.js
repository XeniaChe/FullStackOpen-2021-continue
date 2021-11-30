import React from 'react';
import { connect } from 'react-redux';

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return <div style={style}>{props.notifFromStore.notifMessage}</div>;
};

const mapStateToProps = (state) => ({
  notifFromStore: state.notification,
});

export default connect(mapStateToProps)(Notification);
