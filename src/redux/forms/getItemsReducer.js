import axios from 'axios';
import { Navigate } from 'react-router-dom';
import endpoint from '../../assets/url/url';

const GET_ITEM = 'src/redux/itemreducer/get_item'.toUpperCase();
const FAILED_GET_ITEM = 'src/redux/itemreducer/failed_get_item'.toUpperCase();
const FAILED_POST_ITEM = 'src/redux/itemreducer/failed_post_item'.toUpperCase();
const GET_ITEMS_REQUEST = 'src/redux/itemreducer/get_items_request'.toUpperCase();
const FAILED_PATCH_ITEM = 'src/redux/itemreducer/failed_patch_item'.toUpperCase();

const url = `${endpoint}/v2_items`;
const { token } = localStorage;

const sendItemsDataFailed = (payload) => ({
  type: FAILED_POST_ITEM,
  payload,
});

const patchItemDataFailed = (payload) => ({
  type: FAILED_PATCH_ITEM,
  payload,
});

const fetchItemsData = (payload) => ({
  type: GET_ITEM,
  payload,
});

const fetchItemsDataFailed = (payload) => ({
  type: FAILED_GET_ITEM,
  payload,
});

const fetchItemsRequest = () => ({
  type: GET_ITEMS_REQUEST,
  loading: true,
  error: null,
});

export const postItemsToApi = (userData) => async (dispatch) => {
  const sendData = axios.post(url, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (sendData.error || sendData.errors || sendData.rejected) {
    const errorMsg = sendData.error || sendData.errors;
    dispatch(sendItemsDataFailed(errorMsg));
  } else {
    window.history.pushState({}, '', '/products');
      <Navigate to="/products" />;
      setTimeout(() => {
        window.location.reload();
      }, 3000);
  }
};

export const getItemFromApi = () => async (dispatch) => {
  dispatch(fetchItemsRequest());
  try {
    const req = await fetch(url, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await req.json();
    dispatch(fetchItemsData(response));
  } catch (error) {
    dispatch(fetchItemsDataFailed(error.message));
  }
};

export const postUpdateItemToApi = (userData) => async (dispatch) => {
  const { id } = userData;
  const sendData = axios.patch(`${url}/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (sendData.error || sendData.errors || sendData.rejected) {
    const errorMsg = sendData.error || sendData.errors;
    dispatch(patchItemDataFailed(errorMsg));
  } else {
    window.history.pushState({}, '', `/products/${id}`);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
};

const itemReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case GET_ITEM:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_ITEM:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAILED_POST_ITEM:
      return { error: action.errorMsg };
    case FAILED_PATCH_ITEM:
      return { error: action.errorMsg };
    default:
      return state;
  }
};

export default itemReducer;
