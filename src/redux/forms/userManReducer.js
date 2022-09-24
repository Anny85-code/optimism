import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_USERS = 'SRC/REDUX/USER_REDUCER/GET_USERS';
const FAILED_GET_USERS = 'SRC/REDUX/USER_REDUCER/FAILED_GET_USERS';
const GET_USERS_REQUEST = 'SRC/REDUX/USER_REDUCER/GET_USERS_REQUEST';
const FAILED_PATCH_USER = 'SRC/REDUX/USER_REDUCER/FAILED_PATCH_USER';
const url = `${endpoint}/users`;
const { token } = localStorage;

const patchUserDataFailed = (payload) => ({
  type: FAILED_PATCH_USER,
  payload,
});
export const postUpdateUserToApi = (userData) => async (dispatch) => {
  const { id } = userData;
  const sendData = axios.patch(`${url}/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (sendData.error || sendData.errors || sendData.rejected) {
    const errorMsg = sendData.error || sendData.errors;
    dispatch(patchUserDataFailed(errorMsg));
  } else {
    window.history.pushState({}, '', `/users/${id}`);
    window.location.reload();
  }
};

const fetchUsersData = (payload) => ({
  type: GET_USERS,
  payload,
});

const fetchUsersDataFailed = (payload) => ({
  type: FAILED_GET_USERS,
  payload,
});

const fetchUsersRequest = () => ({
  type: GET_USERS_REQUEST,
  loading: true,
  error: null,
});

export const getUsersFromApi = () => async (dispatch) => {
  dispatch(fetchUsersRequest());
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchUsersData(response.data));
  } catch (error) {
    dispatch(fetchUsersDataFailed(error.message));
  }
};

const userManReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_USERS:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAILED_PATCH_USER:
      return { error: action.errorMsg };
    default:
      return state;
  }
};

export default userManReducer;
