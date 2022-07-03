import axios from 'axios';

const GET_ONE_USER = 'src/redux/userreducer/get_one_user'.toUpperCase();
const FAILED_GET_ONE_USER = 'src/redux/userreducer/failed_get_one_user'.toUpperCase();
const GET_ONE_USER_REQUEST = 'src/redux/userreducer/get_one_user_request'.toUpperCase();
const url = 'https://optimistic-food.herokuapp.com/api/v1/users';
const { token } = localStorage;

const fetchOneUserData = (payload) => ({
  type: GET_ONE_USER,
  payload,
});

const fetchOneUserDataFailed = (payload) => ({
  type: FAILED_GET_ONE_USER,
  payload,
});

const fetchOneUserRequest = () => ({
  type: GET_ONE_USER_REQUEST,
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
    default:
      return state;
  }
};

export default oneUserReducer;
