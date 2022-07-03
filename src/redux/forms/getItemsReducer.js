// import axios from 'axios';
const GET_ITEM = 'src/redux/itemreducer/get_item'.toUpperCase();
const FAILED_GET_ITEM = 'src/redux/itemreducer/failed_get_item'.toUpperCase();
const GET_ITEMS_REQUEST = 'src/redux/itemreducer/get_items_request'.toUpperCase();
const url = 'https://optimistic-food.herokuapp.com/api/v1/items';

const fetchItemsData = (payload) => ({
  type: GET_ITEM,
  payload,
});

const fetchItemsDataFailed = (payload) => ({
  type: FAILED_GET_ITEM,
  payload,
});

const fetchItemsRequest = () => ({
  type: GET_ITEMS_REQUEST,
  loading: true,
  error: null,
});

export const getItemFromApi = () => async (dispatch) => {
  const { token } = localStorage;
  dispatch(fetchItemsRequest());
  try {
    const req = await fetch(url, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const response = await req.json();
    // const response = await axios.get(url, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // console.log(response);
    dispatch(fetchItemsData(response));
  } catch (error) {
    dispatch(fetchItemsDataFailed(error.message));
  }
};

const itemReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case GET_ITEM:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_ITEM:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default itemReducer;
