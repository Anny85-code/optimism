import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_ONE_ITEM = 'src/redux/itemreducer/get_one_item'.toUpperCase();
const FAILED_GET_ONE_ITEM = 'src/redux/itemreducer/failed_get_one_item'.toUpperCase();
const GET_ONE_ITEM_REQUEST = 'src/redux/itemreducer/get_one_item_request'.toUpperCase();
const url = `${endpoint}/items`;
const { token } = localStorage;

const fetchOneItemData = (payload) => ({
  type: GET_ONE_ITEM,
  payload,
});

const fetchOneItemDataFailed = (payload) => ({
  type: FAILED_GET_ONE_ITEM,
  payload,
});

const fetchOneItemRequest = () => ({
  type: GET_ONE_ITEM_REQUEST,
  loading: true,
  error: null,
});

export const getOneItemFromApi = (id) => async (dispatch) => {
  dispatch(fetchOneItemRequest());
  try {
    const response = await axios.get(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchOneItemData(response.data));
  } catch (error) {
    dispatch(fetchOneItemDataFailed(error.message));
  }
};

const oneItemReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case GET_ONE_ITEM:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_ONE_ITEM:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_ONE_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default oneItemReducer;
