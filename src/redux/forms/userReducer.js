import endpoint from '../../assets/url/url';
import { sendErrors } from './errors';

export const registerUserToApi = (userData) => async (dispatch) => {
  // const auth
  const regUser = await fetch(`${endpoint}/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
      // Authorization: {},
    },
    body: JSON.stringify(userData),
  });
  const regUserResp = await regUser.json();
  if (regUserResp.error || regUserResp.errors) {
    const errorMsg = regUserResp.error || regUserResp.errors;
    dispatch({ type: 'SIGNUP_FAILED', errorMsg });
  } else {
    window.history.pushState({}, '', '/');
    window.location.reload();
    dispatch({ type: 'SIGNUP_SUCCESS', regUserResp });
  }
};

export const logUserToApi = (userData) => async (dispatch) => {
  const { username, password } = userData;
  const sendData = await fetch(`${endpoint}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  const rawData = await sendData.json();
  // const waitedData = await rawData;
  // console.log(waitedData);
  if (rawData.status === 500 || !rawData.length) {
    const errMsg = 'Check login credentials or internet connection!';
    dispatch(sendErrors(errMsg));
    console.error('Check login credentials or internet connection!');
  }
  //   const errorMsg = rawData.error;
  //   dispatch({ type: 'LOGIN_FAILED', errorMsg });
  // } else {
  //   localStorage.setItem('user', JSON.stringify(rawData));
  //   localStorage.setItem('token', rawData.token);
  //   localStorage.setItem('isLoggedIn', true);
  //   // window.history.pushState({}, '', '/');
  //   window.location.reload();
  //   dispatch({ type: 'LOGIN_SUCCESS', rawData });
  // }
};

const userReducer = (
  state = { user: null, isLoggedIn: false, error: null },
  action
) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
    case 'LOGIN_SUCCESS':
      return { user: action.data, isLoggedIn: true, error: null };

    case 'SIGNUP_FAILED':
    case 'LOGIN_FAILED':
      return { user: null, isLoggedIn: false, error: action.errorMsg };

    case 'LOGGED_OUT':
      return {
        ...state,
        user: null,
        isLoggedIn: false,
        error: null,
      };

    default:
      return state;
  }
};

export default userReducer;
