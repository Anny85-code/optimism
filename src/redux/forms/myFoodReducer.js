import axios from 'axios';
import { Navigate } from 'react-router-dom';
import endpoint from '../../assets/url/url';

const FAILED_POST_MYFOOD = 'SRC/REDUX/MY_FOOD_REDUCER/FAILED_POST_MYFOOD';
const FAILED_PATCH_MYFOOD = 'SRC/REDUX/MY_FOOD_REDUCER/FAILED_PATCH_MYFOOD';
const GET_MYFOOD = 'SRC/REDUX/MY_FOOD_REDUCER/GET_MYFOOD';
const FAILED_GET_MYFOOD = 'SRC/REDUX/MY_FOOD_REDUCER/FAILED_GET_MYFOOD';
const GET_MYFOOD_REQUEST = 'SRC/REDUX/MY_FOOD_REDUCER/GET_MYFOOD_REQUEST';
const url = `${endpoint}/customers`;
const { token } = localStorage;

const sendMyFoodDataFailed = (payload) => ({
  type: FAILED_POST_MYFOOD,
  payload,
});

const patchMyFoodDataFailed = (payload) => ({
  type: FAILED_PATCH_MYFOOD,
  payload,
});

const fetchMyFoodData = (payload) => ({
  type: GET_MYFOOD,
  payload,
});

const fetchMyFoodDataFailed = (payload) => ({
  type: FAILED_GET_MYFOOD,
  payload,
});

const fetchMyFoodRequest = () => ({
  type: GET_MYFOOD_REQUEST,
  loading: true,
  error: null,
});

export const postMyFoodToApi = (userData) => async (dispatch) => {
  const sendData = axios.post(url, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (sendData.error || sendData.errors || sendData.rejected) {
    const errorMsg = sendData.error || sendData.errors;
    dispatch(sendMyFoodDataFailed(errorMsg));
  } else {
    window.history.pushState({}, '', '/customers');
    <Navigate to="/customers" />;
    // setTimeout(() => {
    // window.location.reload();
    // }, 5000);
  }
};

export const postUpdateMyFoodToApi = (userData) => async (dispatch) => {
  const { id } = userData;
  const sendData = axios.patch(`${url}/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (sendData.error || sendData.errors || sendData.rejected) {
    const errorMsg = sendData.error || sendData.errors;
    dispatch(patchMyFoodDataFailed(errorMsg));
  } else {
    window.history.pushState({}, '', `/customers/${id}`);
    // window.location.reload();
  }
};

export const getSeasonFromApi = () => async (dispatch) => {
  dispatch(fetchSeasonRequest());
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchSeasonsData(response.data));
  } catch (error) {
    dispatch(fetchSeasonsDataFailed(error.message));
  }
};

const seasonReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_SEASON:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_SEASON:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_SEASONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAILED_POST_SEASON:
    case FAILED_PATCH_SEASON:
      return { error: action.errorMsg };
    default:
      return state;
  }
};

export default seasonReducer;
