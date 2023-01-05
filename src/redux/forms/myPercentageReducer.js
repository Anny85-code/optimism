import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_MY_PERCENTAGE = 'src/redux/percentagereducer/get_percentage'.toUpperCase();
const FAILED_GET_MY_PERCENTAGE = 'src/redux/percentagereducer/failed_get_percentage'.toUpperCase();
const GET_MY_PERCENTAGES_REQUEST = 'src/redux/percentagereducer/get_percentage_request'.toUpperCase();
const url = `${endpoint}/v2_customers`;
const { token } = localStorage;

const fetchMyPercentageData = (payload) => ({
  type: GET_MY_PERCENTAGE,
  payload,
});

const fetchMyPercentageDataFailed = (payload) => ({
  type: FAILED_GET_MY_PERCENTAGE,
  payload,
});

const fetchMyPercentageRequest = () => ({
  type: GET_MY_PERCENTAGES_REQUEST,
  loading: true,
  error: null,
});

export const getMyPercentageFromApi = (id) => async (dispatch) => {
  dispatch(fetchMyPercentageRequest());
  try {
    const response = await axios.get(`${url}/${id}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchMyPercentageData(response.data));
  } catch (error) {
    dispatch(fetchMyPercentageDataFailed(error.message));
  }
};

const myPercentageReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case GET_MY_PERCENTAGE:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_MY_PERCENTAGE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_MY_PERCENTAGES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default myPercentageReducer;
