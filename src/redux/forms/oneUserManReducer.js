import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_ONE_USER = 'src/redux/userreducer/get_one_user'.toUpperCase();
const DEL_ONE_USER = 'src/redux/userreducer/del_one_user'.toUpperCase();
const FAILED_GET_ONE_USER = 'src/redux/userreducer/failed_get_one_user'.toUpperCase();
const FAILED_DEL_ONE_USER = 'src/redux/userreducer/failed_del_one_user'.toUpperCase();
const GET_ONE_USER_REQUEST = 'src/redux/userreducer/get_one_user_request'.toUpperCase();
const DEL_ONE_USER_REQUEST = 'src/redux/userreducer/del_one_user_request'.toUpperCase();
const url = `${endpoint}/users`;
const { token } = localStorage;

const fetchOneUserData = (payload) => ({
  type: GET_ONE_USER,
  payload,
});

const delOneUserData = (payload) => ({
  type: DEL_ONE_USER,
  payload,
});

const fetchOneUserDataFailed = (payload) => ({
  type: FAILED_GET_ONE_USER,
  payload,
});

const delOneUserDataFailed = (payload) => ({
  type: FAILED_DEL_ONE_USER,
  payload,
});

const fetchOneUserRequest = () => ({
  type: GET_ONE_USER_REQUEST,
  loading: true,
  error: null,
});

const delOneUserRequest = () => ({
  type: DEL_ONE_USER_REQUEST,
  loading: true,
  error: null,
});

export const getOneUserFromApi = (id) => async (dispatch) => {
  dispatch(fetchOneUserRequest());
  try {
    const response = await axios.get(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchOneUserData(response.data));
  } catch (error) {
    dispatch(fetchOneUserDataFailed(error.message));
  }
};

export const delOneUserFromApi = (id) => async (dispatch) => {
  dispatch(delOneUserRequest());
  try {
    const response = await axios.delete(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(delOneUserData(response.data));
    window.history.pushState({}, '', '/');
    window.location.reload();
  } catch (error) {
    dispatch(delOneUserDataFailed(error.message));
  }
};

const oneUserReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case GET_ONE_USER:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_ONE_USER:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_ONE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DEL_ONE_USER:
      return state.filter((user) => user.id !== action.id);
    default:
      return state;
  }
};

export default oneUserReducer;
