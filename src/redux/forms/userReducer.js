export const registerUserToApi = (userData) => async () => {
  console.log(userData);

  // const auth
  const regUser = await fetch(
    // 'https://optimistic-food.herokuapp.com/api/v1/users',
    'http://localhost:4000/api/v1/users',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
        // Authorization: {},
      },
      body: JSON.stringify(userData),
    }
  );
  const regUserResp = await regUser.json();
  console.log(regUserResp);
  // .then((resp) => resp.json())
  // .then((data) => {
  //   if (data.error || data.errors) {
  //     const errorMsg = data.error || data.errors;
  //     dispatch({ type: 'SIGNUP_FAILED', errorMsg });
  //   } else {
  //     localStorage.setItem('user', JSON.stringify(data));
  //     localStorage.setItem('token', data.token);
  //     localStorage.setItem('isLoggedIn', true);
  //     // window.history.pushState({}, '', '/dashboard');
  //     // window.location.reload();
  //     dispatch({ type: 'SIGNUP_SUCCESS', data });
  //   }
  // });
};

export const logUserToApi = (userData) => async (dispatch) => {
  const { username, password } = userData;
  const sendData = await fetch(
    // 'https://optimistic-food.herokuapp.com/api/v1/login',
    'http://localhost:4000/api/v1/login',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        // Accept: 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }
  );
  const rawData = await sendData.json();
  console.log(rawData);
  if (rawData.error) {
    const errorMsg = rawData.error;
    dispatch({ type: 'LOGIN_FAILED', errorMsg });
  } else {
    localStorage.setItem('user', JSON.stringify(rawData));
    localStorage.setItem('token', rawData.token);
    localStorage.setItem('isLoggedIn', true);
    // window.history.pushState({}, '', '/dashboard');
    window.location.reload();
    dispatch({ type: 'LOGIN_SUCCESS', rawData });
  }
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
