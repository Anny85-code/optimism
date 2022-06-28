export const registerUserToApi = (userData) => (dispatch) => {
  fetch('https://rent-a-car-brytebee.herokuapp.com/api/v1/users', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ user: userData }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.error || data.errors) {
        const errorMsg = data.error || data.errors;
        dispatch({ type: 'SIGNUP_FAILED', errorMsg });
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', true);
        window.history.pushState({}, '', '/');
        window.location.reload();
        dispatch({ type: 'SIGNUP_SUCCESS', data });
      }
    });
};

export const logUserToApi = (userData) => (dispatch) => {
  // fetch('https://rent-a-car-brytebee.herokuapp.com/api/v1/auth/login', {
  fetch('https://optimistic-food.herokuapp.com/api/v1/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ user: userData }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (data.error) {
        const errorMsg = data.error;
        dispatch({ type: 'LOGIN_FAILED', errorMsg });
      } else {
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', true);
        window.history.pushState({}, '', '/');
        window.location.reload();
        dispatch({ type: 'LOGIN_SUCCESS', data });
      }
    });
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
