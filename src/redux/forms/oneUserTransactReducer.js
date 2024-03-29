import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_ONE_USER_TRANS = 'SRC/REDUX/ONEUSER_REDUCER/GET_ONE_USER_TRANS';
const FAILED_GET_ONE_USER_TRANS = 'SRC/REDUX/ONEUSER_REDUCER/FAILED_GET_ONE_USER_TRANS';
const GET_ONE_USER_TRANS_REQUEST = 'SRC/REDUX/ONEUSER_REDUCER/GET_ONE_USER_TRANS';
const url = `${endpoint}/users`;
const { token } = localStorage;

const fetchOneUserTransData = (payload) => ({
  type: GET_ONE_USER_TRANS,
  payload,
});

const fetchOneUserTransDataFailed = (payload) => ({
  type: FAILED_GET_ONE_USER_TRANS,
  payload,
});

const fetchOneUserTransRequest = () => ({
  type: GET_ONE_USER_TRANS_REQUEST,
  loading: true,
  error: null,
});

export const getOneUserTransFromApi = (id) => async (dispatch) => {
  dispatch(fetchOneUserTransRequest());
  try {
    const response = await axios.get(`${url}/${id}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchOneUserTransData(response.data));
  } catch (error) {
    dispatch(fetchOneUserTransDataFailed(error.message));
  }
};

const oneUserTransactsReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case GET_ONE_USER_TRANS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_ONE_USER_TRANS:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_ONE_USER_TRANS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default oneUserTransactsReducer;
