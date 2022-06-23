/// Action Types

export const succesNotification = (msg) => ({
  type: 'NOTIFICATION/SUCCESS_MESSAGE',
  payload: msg,
});

export const errorNotification = (msg) => ({
  type: 'NOTIFICATION/ERROR_MESSAGE',
  payload: msg,
});

export const clearNotifSYNC = () => ({
  type: 'NOTIFICATION/CLEAR',
});

export const clearNotif = () => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(clearNotifSYNC());
    }, 2000);
  };
};

// REDUCER
const initialState = {
  showNotifSuccess: false,
  showNotifError: false,
  successMessage: '',
  errorMessage: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION/SUCCESS_MESSAGE': {
      return {
        ...state,
        showNotifSuccess: true,
        successMessage: action.payload,
      };
    }
    case 'NOTIFICATION/ERROR_MESSAGE': {
      return {
        ...state,
        showNotifError: true,
        errorMessage: action.payload,
      };
    }
    case 'NOTIFICATION/CLEAR': {
      return {
        ...state,
        showNotifError: false,
        showNotifSuccess: false,
      };
    }
    case 'NOTIFICATION/SHOW_SUCCESS_MESSAGE': {
      return {
        ...state,
        showNotifSuccess: true,
      };
    }

    default:
      return state;
  }
};

export default reducer;
