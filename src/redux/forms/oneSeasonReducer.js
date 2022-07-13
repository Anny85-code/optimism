import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_ONE_SEASON = 'src/redux/seasonreducer/get_one_season'.toUpperCase();
const FAILED_GET_ONE_SEASON =
  'src/redux/seasonreducer/failed_get_one_season'.toUpperCase();
const GET_ONE_SEASON_REQUEST =
  'src/redux/seasonreducer/get_one_season_request'.toUpperCase();
const url = `${endpoint}/seasons`;
const { token } = localStorage;

const fetchOneSeasonData = (payload) => ({
  type: GET_ONE_SEASON,
  payload,
});

const fetchOneSeasonDataFailed = (payload) => ({
  type: FAILED_GET_ONE_SEASON,
  payload,
});

const fetchOneSeasonRequest = () => ({
  type: GET_ONE_SEASON_REQUEST,
  loading: true,
  error: null,
});

export const getOneSeasonFromApi = (id) => async (dispatch) => {
  dispatch(fetchOneSeasonRequest());
  try {
    const response = await axios.get(`${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchOneSeasonData(response.data));
  } catch (error) {
    dispatch(fetchOneSeasonDataFailed(error.message));
  }
};

const OneCustomerReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_ONE_CUSTOMER:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_ONE_CUSTOMER:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_ONE_CUSTOMERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default OneCustomerReducer;
