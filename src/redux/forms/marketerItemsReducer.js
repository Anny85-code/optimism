import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_MARKETER_ITEMS = 'SRC/REDUX/PERCENTAGE/GET_MARKETER_ITEMS';
const FAILED_GET_MARKETER_ITEMS = 'SRC/REDUX/PERCENTAGEREDUCER/FAILED_GET_MARKETER_ITEMS';
const GET_MARKETER_ITEMS_REQUEST = 'SRC/REDUX/PERCENTAGEREDUCER/GET_MARKETER_ITEMS_REQUEST';
const url = `${endpoint}/users`;
const { token } = localStorage;

const fetchMarketerItems = (payload) => ({
  type: GET_MARKETER_ITEMS,
  payload,
});

const fetchMarketerItemsFailed = (payload) => ({
  type: FAILED_GET_MARKETER_ITEMS,
  payload,
});

const fetchMarketerItemsRequest = () => ({
  type: GET_MARKETER_ITEMS_REQUEST,
  loading: true,
  error: null,
});

export const getMarketerItemsFromApi = (id) => async (dispatch) => {
  dispatch(fetchMarketerItemsRequest());
  try {
    const response = await axios.get(`${url}/${id}/marketer_items`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchMarketerItems(response.data));
  } catch (error) {
    dispatch(fetchMarketerItemsFailed(error.message));
  }
};

const marketerItemsReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action,
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
