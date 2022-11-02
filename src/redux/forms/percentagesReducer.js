import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_CUSTOMER = 'src/redux/customerreducer/get_customer'.toUpperCase();
const FAILED_GET_CUSTOMER =
  'src/redux/customerreducer/failed_get_customer'.toUpperCase();
const GET_CUSTOMERS_REQUEST =
  'src/redux/customerreducer/get_customer_request'.toUpperCase();
const url = `${endpoint}/customers`;
const { token } = localStorage;

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

const percentagesReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action
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
    default:
      return state;
  }
};

export default percentagesReducer;
