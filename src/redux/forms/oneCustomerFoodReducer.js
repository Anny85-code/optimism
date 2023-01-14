import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_ONE_CUSTOMER_FOOD =
  'SRC/REDUX/ONECUSTOMER_REDUCER/GET_ONE_CUSTOMER_FOOD';
const FAILED_GET_ONE_CUSTOMER_FOOD =
  'SRC/REDUX/ONECUSTOMER_REDUCER/FAILED_GET_ONE_CUSTOMER_FOOD';
const GET_ONE_CUSTOMER_FOOD_REQUEST =
  'SRC/REDUX/ONECUSTOMER_REDUCER/GET_ONE_CUSTOMER_FOOD';
const url = `${endpoint}/v2_customers`;
const { token } = localStorage;

const fetchOneCustomerFoodData = (payload) => ({
  type: GET_ONE_CUSTOMER_FOOD,
  payload,
});

const fetchOneCustomersFoodDataFailed = (payload) => ({
  type: FAILED_GET_ONE_CUSTOMER_FOOD,
  payload,
});

const fetchOneCustomerFoodRequest = () => ({
  type: GET_ONE_CUSTOMER_FOOD_REQUEST,
  loading: true,
  error: null,
});

export const getOneCustomerFoodFromApi = (id) => async (dispatch) => {
  dispatch(fetchOneCustomerFoodRequest());
  try {
    const response = await axios.get(`${url}/${id}/my_food`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchOneCustomerFoodData(response.data));
  } catch (error) {
    dispatch(fetchOneCustomersFoodDataFailed(error.message));
  }
};

const OneCustomerFoodReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case GET_ONE_CUSTOMER_FOOD:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_ONE_CUSTOMER_FOOD:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_ONE_CUSTOMER_FOOD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default OneCustomerFoodReducer;
