import axios from 'axios';
import endpoint from '../../assets/url/url';

const GET_SUPERVISOR_PERCENT = 'SRC/REDUX/PERCENT/GET_SUPV_PERCENT';
const FAILED_GET_SUPERVISOR_PERCENT = 'SRC/REDUX/PERCENT/GET_SUPV_PERCENT';
const GET_SUPERVISOR_PERCENT_REQUEST = 'SRC/REDUX/PERCENT/GET_SUPV_PERCENT';
const url = `${endpoint}/users`;
const { token } = localStorage;

const fetchSupervisorPercent = (payload) => ({
  type: GET_SUPERVISOR_PERCENT,
  payload,
});

const fetchSupervisorPercentFailed = (payload) => ({
  type: FAILED_GET_SUPERVISOR_PERCENT,
  payload,
});

const fetchSupervisorPercentRequest = () => ({
  type: GET_SUPERVISOR_PERCENT_REQUEST,
  loading: true,
  error: null,
});

export const getSupervisorPercentFromApi = (id) => async (dispatch) => {
  dispatch(fetchSupervisorPercentRequest());
  try {
    const response = await axios.get(`${url}/${id}/supervisor_percent`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchSupervisorPercent(response.data));
  } catch (error) {
    dispatch(fetchSupervisorPercentFailed(error.message));
  }
};

const supervisorPercentReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case GET_SUPERVISOR_PERCENT:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_SUPERVISOR_PERCENT:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_SUPERVISOR_PERCENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default supervisorPercentReducer;
