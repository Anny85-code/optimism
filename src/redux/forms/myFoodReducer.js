import axios from 'axios';
import { Navigate } from 'react-router-dom';
import endpoint from '../../assets/url/url';
/* eslint-disable */
const FAILED_POST_MYFOOD = 'SRC/REDUX/MY_FOOD_REDUCER/FAILED_POST_MYFOOD';
const FAILED_PATCH_MYFOOD = 'SRC/REDUX/MY_FOOD_REDUCER/FAILED_PATCH_MYFOOD';
const GET_MYFOOD = 'SRC/REDUX/MY_FOOD_REDUCER/GET_MYFOOD';
const FAILED_GET_MYFOOD = 'SRC/REDUX/MY_FOOD_REDUCER/FAILED_GET_MYFOOD';
const GET_MYFOOD_REQUEST = 'SRC/REDUX/MY_FOOD_REDUCER/GET_MYFOOD_REQUEST';
const url = `${endpoint}/v2_customer_items`;
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
    setTimeout(() => {
      window.history.pushState({}, '', '/customers');
      <Navigate to="/customers" />;
      localStorage.removeItem('updated_customer');
      localStorage.removeItem('myfood');
      localStorage.removeItem('customer');
      localStorage.removeItem('image_str');
      window.location.reload();
    }, 5e3);
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

export const getMyFoodFromApi = () => async (dispatch) => {
  dispatch(fetchMyFoodRequest());
  try {
    /* ========================   ====   Bad ID snoop   ====   ============================= */
    const response = await axios.get(`${endpoint}/users/all_items`, {
      // const response = await axios.get(url, { // use this if snooping ...
      // and comment out the line above it
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchMyFoodData(response.data));
  } catch (error) {
    dispatch(fetchMyFoodDataFailed(error.message));
  }
};

const myFoodReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_MYFOOD:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_MYFOOD:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_MYFOOD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAILED_POST_MYFOOD:
    case FAILED_PATCH_MYFOOD:
      return { error: action.errorMsg };
    default:
      return state;
  }
};
/* eslint-enable */
export default myFoodReducer;
