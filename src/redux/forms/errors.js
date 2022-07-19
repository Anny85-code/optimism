const GET_ERRORS = 'OPTIMISM/REDUX/ERRORS';
const GET_NOTIFICATIONS = 'OPTIMISM/REDUX/GET_NOTIFICATIONS';

export const sendErrors = (payload) => ({
  type: GET_ERRORS,
  payload,
});

export const sendNotifications = (payload) => ({
  type: GET_NOTIFICATIONS,
  payload,
});

const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case GET_NOTIFICATIONS:
      return action.payload;
    default:
      return state;
  }
};

export default errorReducer;
