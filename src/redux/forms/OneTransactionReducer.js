import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_ONE_TRANSACTION =
  'src/redux/transactionreducer/get_one_transaction'.toUpperCase();
const FAILED_GET_ONE_TRANSACTION =
  'src/redux/transactionreducer/failed_get_one_transaction'.toUpperCase();
const GET_ONE_TRANSACTIONS_REQUEST =
  'src/redux/transactionreducer/get_one_transaction_request'.toUpperCase();
const url = `${endpoint}/transactions`;
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
    default:
      return state;
  }
};

export default OneCustomerReducer;
