import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_DASHBOARD = 'SRC/REDUX/DASHBOARD/GET_DASHBOARD';
const FAILED_GET_DASHBOARD = 'SRC/REDUX/DASHBOARD/FAILED_GET_DASHBOARD';
const GET_DASHBOARD_REQUEST = 'SRC/REDUX/DASHBOARD/GET_DASHBOARD';
const url = `${endpoint}/users/dashboard`;
const { token } = localStorage;

const fetchDashboard = (payload) => ({
  type: GET_DASHBOARD,
  payload,
});

const fetchDashboardFailed = (payload) => ({
  type: FAILED_GET_DASHBOARD,
  payload,
});

const fetchDashboardRequest = () => ({
  type: GET_DASHBOARD_REQUEST,
  loading: true,
  error: null,
});

export const getDashboard = () => async (dispatch) => {
  dispatch(fetchDashboardRequest());
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(fetchDashboard(response.data));
  } catch (error) {
    dispatch(fetchDashboardFailed(error.message));
  }
};

const dashboard = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case GET_DASHBOARD:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_DASHBOARD:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_DASHBOARD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default dashboard;
