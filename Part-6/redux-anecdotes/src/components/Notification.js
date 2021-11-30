import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notifFromStore = useSelector((state) => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return <div style={style}>{notifFromStore.notifMessage}</div>;
};

export default Notification;
