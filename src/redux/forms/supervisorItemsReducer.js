import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_SUPV_ITEMS = 'SRC/REDUX/PER/GET_SUPV_ITEMS';
const FAILED_GET_SUPV_ITEMS = 'SRC/REDUX/PER_REDUCER/FAILED_GET_SUPV_ITEMS';
const GET_SUPV_ITEMS_REQUEST = 'SRC/REDUX/PER_REDUCER/GET_SUPV_ITEMS_REQUEST';
const url = `${endpoint}/users`;
const { token } = localStorage;

const fetchSupervItems = (payload) => ({
  type: GET_SUPV_ITEMS,
  payload,
});

const fetchSupervItemsFailed = (payload) => ({
  type: FAILED_GET_SUPV_ITEMS,
  payload,
});

const fetchSupervItemsRequest = () => ({
  type: GET_SUPV_ITEMS_REQUEST,
  loading: true,
  error: null,
});

export const getSupervItemsFromApi = (id) => async (dispatch) => {
  dispatch(fetchSupervItemsRequest());
  try {
    const response = await axios.get(`${url}/${id}/supervisor_items`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchSupervItems(response.data));
  } catch (error) {
    dispatch(fetchSupervItemsFailed(error.message));
  }
};

const supervItemsReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_SUPV_ITEMS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_SUPV_ITEMS:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_SUPV_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default supervItemsReducer;
