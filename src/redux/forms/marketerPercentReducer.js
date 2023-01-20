import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_MARKETER_PERCENT = 'SRC/REDUX/PERCENT/GET_MARKETER_PERCENT';
const FAILED_GET_MARKETER_PERCENT = 'SRC/REDUX/PERCENT/GET_MARKETER_PERCENT';
const GET_MARKETER_PERCENT_REQUEST = 'SRC/REDUX/PERCENT/GET_MARKETER_PERCENT';
const url = `${endpoint}/users`;
const { token } = localStorage;

const fetchMarketerPercent = (payload) => ({
  type: GET_MARKETER_PERCENT,
  payload,
});

const fetchMarketerPercentFailed = (payload) => ({
  type: FAILED_GET_MARKETER_PERCENT,
  payload,
});

const fetchMarketerPercentRequest = () => ({
  type: GET_MARKETER_PERCENT_REQUEST,
  loading: true,
  error: null,
});

export const getMarketerPercentFromApi = (id) => async (dispatch) => {
  dispatch(fetchMarketerPercentRequest());
  try {
    const response = await axios.get(`${url}/${id}/marketer_percent`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchMarketerPercent(response.data));
  } catch (error) {
    dispatch(fetchMarketerPercentFailed(error.message));
  }
};

const marketerPercentReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_MARKETER_PERCENT:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_MARKETER_PERCENT:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_MARKETER_PERCENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default marketerPercentReducer;
