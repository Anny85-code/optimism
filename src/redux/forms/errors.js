const GET_ERRORS = 'OPTIMISM/REDUX/ERRORS';

export const sendErrors = (payload) => ({
  type: GET_ERRORS,
  payload,
});

const errorReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export default errorReducer;
