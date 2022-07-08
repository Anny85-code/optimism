import axios from 'axios';
import { Navigate } from 'react-router-dom';
import endpoint from '../../assets/url/url';

// const POST_CUSTOMER = 'src/redux/customerreducer/post_customer'.toUpperCase();
const FAILED_POST_TRANSACTION =
  'src/redux/transactionreducer/failed_post_transaction'.toUpperCase();
const FAILED_PATCH_TRANSACTION =
  'src/redux/transactionreducer/failed_patch_transaction'.toUpperCase();
const GET_TRANSACTION =
  'src/redux/transactionreducer/get_transaction'.toUpperCase();
const FAILED_GET_TRANSACTION =
  'src/redux/transactionreducer/failed_get_transaction'.toUpperCase();
const GET_TRANSACTIONS_REQUEST =
  'src/redux/transactionreducer/get_transaction_request'.toUpperCase();
const url = `${endpoint}/transactions`;
const { token } = localStorage;

const sendTransactionDataFailed = (payload) => ({
  type: FAILED_POST_TRANSACTION,
  payload,
});

const patchTransactionDataFailed = (payload) => ({
  type: FAILED_PATCH_TRANSACTION,
  payload,
});

const fetchTransactionsData = (payload) => ({
  type: GET_TRANSACTION,
  payload,
});

const fetchTransactionsDataFailed = (payload) => ({
  type: FAILED_GET_TRANSACTION,
  payload,
});

const fetchTransactionRequest = () => ({
  type: GET_TRANSACTIONS_REQUEST,
  loading: true,
  error: null,
});

export const postTransactionToApi = (userData) => async (dispatch) => {
  const sendData = axios.post(url, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (sendData.error || sendData.errors || sendData.rejected) {
    const errorMsg = sendData.error || sendData.errors;
    dispatch(sendCustomerDataFailed(errorMsg));
  } else {
    window.history.pushState({}, '', '/customers');
    <Navigate to="/customers" />;
    setTimeout(() => {
      window.location.reload();
    }, 5000);
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
    // window.location.reload();
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
    case FAILED_POST_CUSTOMER:
    case FAILED_PATCH_CUSTOMER:
      return { error: action.errorMsg };
    default:
      return state;
  }
};

export default customerReducer;
