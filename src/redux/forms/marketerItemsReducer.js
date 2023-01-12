import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_MARKETER_ITEMS =
  'src/redux/percentagereducer/get_marketer_items'.toUpperCase();
const FAILED_GET_MARKETER_ITEMS =
  'src/redux/percentagereducer/failed_get_marketer_items'.toUpperCase();
const GET_MARKETER_ITEMS_REQUEST =
  'src/redux/percentagereducer/get_marketer_items_request'.toUpperCase();
const url = `${endpoint}/users`;
const { token } = localStorage;

const fetchMyPercentageData = (payload) => ({
  type: GET_MARKETER_ITEMS,
  payload,
});

const fetchMyPercentageDataFailed = (payload) => ({
  type: FAILED_GET_MARKETER_ITEMS,
  payload,
});

const fetchMyPercentageRequest = () => ({
  type: GET_MARKETER_ITEMS_REQUEST,
  loading: true,
  error: null,
});

export const getMyPercentageFromApi = (id) => async (dispatch) => {
  dispatch(fetchMyPercentageRequest());
  try {
    const response = await axios.get(`${url}/${id}/marketer_items`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchMyPercentageData(response.data));
  } catch (error) {
    dispatch(fetchMyPercentageDataFailed(error.message));
  }
};

const marketerItemsReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_MARKETER_ITEMS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_MARKETER_ITEMS:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_MARKETER_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default marketerItemsReducer;
