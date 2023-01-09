import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_ONE_CUSTOMER_TRANS = 'SRC/REDUX/ONECUSTOMER_REDUCER/GET_ONE_CUSTOMER_TRANS';
const FAILED_GET_ONE_CUSTOMER_TRANS = 'SRC/REDUX/ONECUSTOMER_REDUCER/FAILED_GET_ONE_CUSTOMER_TRANS';
const GET_ONE_CUSTOMER_TRANS_REQUEST = 'SRC/REDUX/ONECUSTOMER_REDUCER/GET_ONE_CUSTOMER_TRANS';
const url = `${endpoint}/v2_customers`;
const { token } = localStorage;

const fetchOneCustomerTransData = (payload) => ({
  type: GET_ONE_CUSTOMER_TRANS,
  payload,
});

const fetchOneCustomersTransDataFailed = (payload) => ({
  type: FAILED_GET_ONE_CUSTOMER_TRANS,
  payload,
});

const fetchOneCustomerTransRequest = () => ({
  type: GET_ONE_CUSTOMER_TRANS_REQUEST,
  loading: true,
  error: null,
});

export const getOneCustomerTransFromApi = (id) => async (dispatch) => {
  dispatch(fetchOneCustomerTransRequest());
  try {
    const response = await axios.get(`${url}/${id}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchOneCustomerTransData(response.data));
  } catch (error) {
    dispatch(fetchOneCustomersTransDataFailed(error.message));
  }
};

const OneCustomerTransactsReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action,
) => {
  switch (action.type) {
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

export default OneCustomerTransactsReducer;
