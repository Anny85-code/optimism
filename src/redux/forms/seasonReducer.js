import axios from 'axios';
import { Navigate } from 'react-router-dom';
import endpoint from '../../assets/url/url';

const FAILED_POST_SEASON =
  'src/redux/seasonreducer/failed_post_season'.toUpperCase();
const FAILED_PATCH_SEASON =
  'src/redux/seasonreducer/failed_patch_season'.toUpperCase();
const GET_SEASON = 'src/redux/seasonreducer/get_season'.toUpperCase();
const FAILED_GET_SEASON =
  'src/redux/seasonreducer/failed_get_season'.toUpperCase();
const GET_SEASONS_REQUEST =
  'src/redux/seasonreducer/get_season_request'.toUpperCase();
const url = `${endpoint}/seasons`;
const { token } = localStorage;

const sendSeasonDataFailed = (payload) => ({
  type: FAILED_POST_SEASON,
  payload,
});

const patchSeasonDataFailed = (payload) => ({
  type: FAILED_PATCH_SEASON,
  payload,
});

const fetchSeasonsData = (payload) => ({
  type: GET_SEASON,
  payload,
});

const fetchSeasonsDataFailed = (payload) => ({
  type: FAILED_GET_SEASON,
  payload,
});

const fetchSeasonRequest = () => ({
  type: GET_SEASONS_REQUEST,
  loading: true,
  error: null,
});

export const postSeasonToApi = (userData) => async (dispatch) => {
  const sendData = axios.post(url, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (sendData.error || sendData.errors || sendData.rejected) {
    const errorMsg = sendData.error || sendData.errors;
    dispatch(sendSeasonDataFailed(errorMsg));
  } else {
    window.history.pushState({}, '', '/seasons');
    <Navigate to="/seasons" />;
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  }
};

export const postUpdateTransactionToApi = (userData) => async (dispatch) => {
  const { id } = userData;
  const sendData = axios.patch(`${url}/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (sendData.error || sendData.errors || sendData.rejected) {
    const errorMsg = sendData.error || sendData.errors;
    dispatch(patchTransactionDataFailed(errorMsg));
  } else {
    window.history.pushState({}, '', `/transactions/${id}`);
    // window.location.reload();
  }
};

export const getTransactionFromApi = () => async (dispatch) => {
  dispatch(fetchTransactionRequest());
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchTransactionsData(response.data));
  } catch (error) {
    dispatch(fetchTransactionsDataFailed(error.message));
  }
};

const transactionReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_TRANSACTION:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_TRANSACTION:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_TRANSACTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAILED_POST_TRANSACTION:
    case FAILED_PATCH_TRANSACTION:
      return { error: action.errorMsg };
    default:
      return state;
  }
};

export default transactionReducer;
