import axios from 'axios';
import { Navigate } from 'react-router-dom';
import endpoint from '../../assets/url/url';

// const POST_CUSTOMER = 'src/redux/customerreducer/post_customer'.toUpperCase();
const FAILED_POST_CUSTOMER = 'src/redux/customerreducer/failed_post_customer'.toUpperCase();
const FAILED_PATCH_CUSTOMER = 'src/redux/customerreducer/failed_patch_customer'.toUpperCase();
const GET_CUSTOMER = 'src/redux/customerreducer/get_customer'.toUpperCase();
const FAILED_GET_CUSTOMER = 'src/redux/customerreducer/failed_get_customer'.toUpperCase();
const GET_CUSTOMERS_REQUEST = 'src/redux/customerreducer/get_customer_request'.toUpperCase();
const url = `${endpoint}/v2_customers`;
const { token } = localStorage;

const sendCustomerDataFailed = (payload) => ({
  type: FAILED_POST_CUSTOMER,
  payload,
});

const patchCustomerDataFailed = (payload) => ({
  type: FAILED_PATCH_CUSTOMER,
  payload,
});

const fetchCustomersData = (payload) => ({
  type: GET_CUSTOMER,
  payload,
});

const fetchCustomersDataFailed = (payload) => ({
  type: FAILED_GET_CUSTOMER,
  payload,
});

const fetchCustomerRequest = () => ({
  type: GET_CUSTOMERS_REQUEST,
  loading: true,
  error: null,
});

export const postCustomerToApi = (userData) => async (dispatch) => {
  const sendData = axios.post(url, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (sendData.error || sendData.errors || sendData.rejected) {
    const errorMsg = sendData.error || sendData.errors;
    dispatch(sendCustomerDataFailed(errorMsg));
  } else {
    setTimeout(() => {
      window.history.pushState({}, '', '/customers');
        <Navigate to="/customers" />;
        window.location.reload();
    }, 5e3);
  }
};

export const postUpdateCustomerToApi = (userData) => async (dispatch) => {
  const { id } = userData;
  const sendData = axios.patch(`${url}/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (sendData.error || sendData.errors || sendData.rejected) {
    const errorMsg = sendData.error || sendData.errors;
    dispatch(patchCustomerDataFailed(errorMsg));
  } else {
    window.history.pushState({}, '', `/customers/${id}`);
    setTimeout(() => {
      window.location.reload();
    }, 5e3);
  }
};

export const getCustomerFromApi = () => async (dispatch) => {
  dispatch(fetchCustomerRequest());
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchCustomersData(response.data));
  } catch (error) {
    dispatch(fetchCustomersDataFailed(error.message));
  }
};

const customerReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case GET_CUSTOMER:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_CUSTOMER:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_CUSTOMERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAILED_POST_CUSTOMER:
    case FAILED_PATCH_CUSTOMER:
      return { error: action.errorMsg };
    default:
      return state;
  }
};

export default customerReducer;
