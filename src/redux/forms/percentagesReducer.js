import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_PERCENTAGE =
  'src/redux/percentagereducer/get_percentage'.toUpperCase();
const FAILED_GET_PERCENTAGE =
  'src/redux/percentagereducer/failed_get_percentage'.toUpperCase();
const GET_PERCENTAGES_REQUEST =
  'src/redux/percentagereducer/get_percentage_request'.toUpperCase();
const url = `${endpoint}/percentages`;
const { token } = localStorage;

const fetchCustomersData = (payload) => ({
  type: GET_PERCENTAGE,
  payload,
});

const fetchCustomersDataFailed = (payload) => ({
  type: FAILED_GET_PERCENTAGE,
  payload,
});

const fetchCustomerRequest = () => ({
  type: GET_PERCENTAGES_REQUEST,
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
    case GET_PERCENTAGE:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_PERCENTAGE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_PERCENTAGES_REQUEST:
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
