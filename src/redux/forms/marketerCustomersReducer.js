import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_MARKETER_CUSTOMERS = 'SRC/REDUX/CUSTOMERS/GET_MARKETER_CUSTOMERS';
const FAILED_GET_MARKETER_CUSTOMERS = 'SRC/REDUX/CUSTOMERS/GET_MARKETER_CUSTOMERS';
const GET_MARKETER_CUSTOMERS_REQUEST = 'SRC/REDUX/CUSTOMERS/GET_MARKETER_CUSTOMERS';
const url = `${endpoint}/users`;
const { token } = localStorage;

const fetchMarketerCustomers = (payload) => ({
  type: GET_MARKETER_CUSTOMERS,
  payload,
});

const fetchMarketerCustomersFailed = (payload) => ({
  type: FAILED_GET_MARKETER_CUSTOMERS,
  payload,
});

const fetchMarketerCustomersRequest = () => ({
  type: GET_MARKETER_CUSTOMERS_REQUEST,
  loading: true,
  error: null,
});

export const getMarketerCustomersFromApi = (id) => async (dispatch) => {
  dispatch(fetchMarketerCustomersRequest());
  try {
    const response = await axios.get(`${url}/${id}/marketer_customers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchMarketerCustomers(response.data));
  } catch (error) {
    dispatch(fetchMarketerCustomersFailed(error.message));
  }
};

const marketerCustomersReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case GET_MARKETER_CUSTOMERS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_MARKETER_CUSTOMERS:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_MARKETER_CUSTOMERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default marketerCustomersReducer;
