import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_ONE_CUSTOMER =
  'src/redux/onecustomerreducer/get_one_customer'.toUpperCase();
const FAILED_GET_ONE_CUSTOMER =
  'src/redux/onecustomerreducer/failed_get_one_customer'.toUpperCase();
const GET_ONE_CUSTOMERS_REQUEST =
  'src/redux/onecustomerreducer/get_one_customer_request'.toUpperCase();
const GET_ONE_CUSTOMER_TRANS =
  'SRC/REDUX/ONECUSTOMER_REDUCER/GET_ONE_CUSTOMER_TRANS';
const FAILED_GET_ONE_CUSTOMER_TRANS =
  'SRC/REDUX/ONECUSTOMER_REDUCER/FAILED_GET_ONE_CUSTOMER_TRANS';
const GET_ONE_CUSTOMER_TRANS_REQUEST =
  'SRC/REDUX/ONECUSTOMER_REDUCER/GET_ONE_CUSTOMER_TRANS';
const url = `${endpoint}/customers`;
const { token } = localStorage;

const fetchOneCustomerData = (payload) => ({
  type: GET_ONE_CUSTOMER,
  payload,
});

const fetchOneCustomerTransData = (payload) => ({
  type: GET_ONE_CUSTOMER_TRANS,
  payload,
});

const fetchOneCustomersDataFailed = (payload) => ({
  type: FAILED_GET_ONE_CUSTOMER,
  payload,
});

const fetchOneCustomersTransDataFailed = (payload) => ({
  type: FAILED_GET_ONE_CUSTOMER_TRANS,
  payload,
});

const fetchOneCustomerRequest = () => ({
  type: GET_ONE_CUSTOMERS_REQUEST,
  loading: true,
  error: null,
});

const fetchOneCustomerTransRequest = () => ({
  type: GET_ONE_CUSTOMER_TRANS_REQUEST,
  loading: true,
  error: null,
});

export const getOneCustomerFromApi = (id) => async (dispatch) => {
  dispatch(fetchOneCustomerRequest());
  try {
    const response = await axios.get(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchOneCustomerData(response.data));
  } catch (error) {
    dispatch(fetchOneCustomersDataFailed(error.message));
  }
};

export const getOneCustomerTransFromApi = (id) => async (dispatch) => {
  dispatch(fetchOneCustomerTransRequest());
  try {
    const response = await axios.get(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchOneCustomerTransData(response.data));
  } catch (error) {
    dispatch(fetchOneCustomersTransDataFailed(error.message));
  }
};

const OneCustomerReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_ONE_CUSTOMER:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_ONE_CUSTOMER:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_ONE_CUSTOMERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ONE_CUSTOMER_TRANS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_ONE_CUSTOMER_TRANS:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_ONE_CUSTOMER_TRANS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default OneCustomerReducer;
