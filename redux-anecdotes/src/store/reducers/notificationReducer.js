/////////////////////////////// Action Creators
//  TEST TEST TEST TEST
//  TEST TEST TEST TEST
const showNotifMessage = (msg) => ({
  type: 'NOTIFICATION/SHOW_MESSAGE',
  payload: { message: msg },
});

const hideNotifMessage = () => ({ type: 'NOTIFICATION/HIDE_MESSAGE' });

/////////////////////////////// ASYNC action with Redux THUNK
export const manageNotifAsync = (msg, sec) => {
  return async (dispatch) => {
    dispatch(showNotifMessage(msg));

    setTimeout(() => {
      dispatch(hideNotifMessage());
    }, sec * 1000);
  };
};

/////////////////////////////// REDUSER
const initialState = {
  notifMessage: 'Initial notification',
  showNotification: false,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION/ADD_VOTE': {
      return {
        ...state,
        notifMessage: `You voted for ${action.payload.matchedObject.content}`,
        showNotification: true,
      };
    }

    case 'NOTIFICATION/SHOW_MESSAGE': {
      return {
        ...state,
        notifMessage: action.payload.message,
        showNotification: true,
      };
    }

    case 'NOTIFICATION/HIDE_MESSAGE': {
      return {
        ...state,
        showNotification: false,
      };
    }

    default:
      return state;
  }
};

export default notificationReducer;
