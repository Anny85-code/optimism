import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_ONE_CUSTOMER = 'src/redux/onecustomerreducer/get_one_customer'.toUpperCase();
const FAILED_GET_ONE_CUSTOMER = 'src/redux/onecustomerreducer/failed_get_one_customer'.toUpperCase();
const GET_ONE_CUSTOMERS_REQUEST = 'src/redux/onecustomerreducer/get_one_customer_request'.toUpperCase();
const DEL_ONE_CUSTOMER = 'src/redux/onecustomerreducer/del_one_customer'.toUpperCase();
const FAILED_DEL_ONE_CUSTOMER = 'src/redux/onecustomerreducer/failed_del_one_customer'.toUpperCase();
const DEL_ONE_CUSTOMERS_REQUEST = 'src/redux/onecustomerreducer/del_one_customer_request'.toUpperCase();
const url = `${endpoint}/v2_customers`;
const { token } = localStorage;

const fetchOneCustomerData = (payload) => ({
  type: GET_ONE_CUSTOMER,
  payload,
});

const fetchOneCustomersDataFailed = (payload) => ({
  type: FAILED_GET_ONE_CUSTOMER,
  payload,
});

const fetchOneCustomerRequest = () => ({
  type: GET_ONE_CUSTOMERS_REQUEST,
  loading: true,
  error: null,
});

const delOneCustomerData = (payload) => ({
  type: DEL_ONE_CUSTOMER,
  payload,
});

const delOneCustomersDataFailed = (payload) => ({
  type: FAILED_DEL_ONE_CUSTOMER,
  payload,
});

const delOneCustomerRequest = () => ({
  type: DEL_ONE_CUSTOMERS_REQUEST,
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

export const delOneCustomerFromApi = (id) => async (dispatch) => {
  dispatch(delOneCustomerRequest());
  try {
    const response = await axios.delete(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(delOneCustomerData(response.data));
    window.location.reload();
  } catch (error) {
    dispatch(delOneCustomersDataFailed(error.message));
  }
};

const OneCustomerReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action,
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
    case DEL_ONE_CUSTOMER:
      return state.filter((customer) => customer.id !== action.id);
    default:
      return state;
  }
};

export default OneCustomerReducer;
