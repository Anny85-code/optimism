import axios from 'axios';

const GET_USERS = 'SRC/REDUX/USER_REDUCER/GET_USERS';
const FAILED_GET_USERS = 'SRC/REDUX/USER_REDUCER/FAILED_GET_USERS';
const GET_USERS_REQUEST = 'SRC/REDUX/USER_REDUCER/GET_USERS_REQUEST';
const url = 'https://optimistic-food.herokuapp.com/api/v1/users';
const { token } = localStorage;

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
    // case FAILED_PATCH_CUSTOMER:
    //   return { error: action.errorMsg };
    default:
      return state;
  }
};

export default userManReducer;
