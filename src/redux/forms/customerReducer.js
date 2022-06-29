import axios from 'axios';

// const POST_CUSTOMER = 'src/redux/customerreducer/post_customer'.toUpperCase();
const FAILED_POST_CUSTOMER =
  'src/redux/customerreducer/failed_post_customer'.toUpperCase();
const GET_CUSTOMER = 'src/redux/customerreducer/get_customer'.toUpperCase();
const FAILED_GET_CUSTOMER =
  'src/redux/customerreducer/failed_get_customer'.toUpperCase();
const GET_CUSTOMERS_REQUEST =
  'src/redux/customerreducer/get_customer_request'.toUpperCase();
const url = 'https://optimistic-food.herokuapp.com/api/v1/customers';

// const sendCustomerData = (payload) => ({
//   type: POST_CUSTOMER,
//   payload
// })

const sendCustomerDataFailed = (payload) => ({
  type: FAILED_POST_CUSTOMER,
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
  const { token } = localStorage;
  const data = { userData };

  const sendData = axios.post(
    url,
    { data },
    {
      headers: {
        Authorization: `Basic ${token}`,
      },
    }
  );

  console.log('token', token, 'data', data, 'sendData', sendData);

  if (sendData.error || sendData.errors || sendData.rejected) {
    const errorMsg = sendData.error || sendData.errors;
    dispatch(sendCustomerDataFailed(errorMsg));
  } else {
    window.history.pushState({}, '', '/customers');
    // window.location.reload();
  }
};

export const getCustomerFromApi = () => async (dispatch) => {
  dispatch(fetchCustomerRequest());
  try {
    const response = await axios.get(url);
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
      return { error: action.errorMsg };
    default:
      return state;
  }
};

export default customerReducer;
