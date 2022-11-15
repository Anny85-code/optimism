import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_ONE_TRANSACTION =
  'src/redux/transactionreducer/get_one_transaction'.toUpperCase();
const FAILED_GET_ONE_TRANSACTION =
  'src/redux/transactionreducer/failed_get_one_transaction'.toUpperCase();
const GET_ONE_TRANSACTION_REQUEST =
  'src/redux/transactionreducer/get_one_transaction_request'.toUpperCase();
const DEL_ONE_TRANS_REQUEST =
  'src/redux/onetransactionreducer/del_one_customer_request'.toUpperCase();

const DEL_ONE_TRANSACTION =
  'src/redux/onecustomerreducer/del_one_customer'.toUpperCase();

const FAILED_DEL_ONE_CUSTOMER =
  'src/redux/onecustomerreducer/failed_del_one_customer'.toUpperCase();

const delOneTransDataFailed = (payload) => ({
  type: FAILED_DEL_ONE_CUSTOMER,
  payload,
});

const delOneTransData = (payload) => ({
  type: DEL_ONE_TRANSACTION,
  payload,
});

const url = `${endpoint}/transactions`;
const { token } = localStorage;

const fetchOneTransactionData = (payload) => ({
  type: GET_ONE_TRANSACTION,
  payload,
});

const fetchOneTransactionDataFailed = (payload) => ({
  type: FAILED_GET_ONE_TRANSACTION,
  payload,
});

const fetchOneTransactionRequest = () => ({
  type: GET_ONE_TRANSACTION_REQUEST,
  loading: true,
  error: null,
});

const delOneTransRequest = () => ({
  type: DEL_ONE_TRANS_REQUEST,
  loading: true,
  error: null,
});

export const getOneTransactionFromApi = (id) => async (dispatch) => {
  dispatch(fetchOneTransactionRequest());
  try {
    const response = await axios.get(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchOneTransactionData(response.data));
  } catch (error) {
    dispatch(fetchOneTransactionDataFailed(error.message));
  }
};

export const delOneTransFromApi = (id) => async (dispatch) => {
  dispatch(delOneTransRequest());
  try {
    const response = await axios.delete(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(delOneTransData(response.data));
  } catch (error) {
    dispatch(delOneTransDataFailed(error.message));
  }
};

const OneTransactionReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_ONE_TRANSACTION:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_ONE_TRANSACTION:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_ONE_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DEL_ONE_TRANSACTION:
      return state.filter((transact) => transact.id !== action.id);
    default:
      return state;
  }
};

export default OneTransactionReducer;
