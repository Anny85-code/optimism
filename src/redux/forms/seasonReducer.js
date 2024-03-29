import axios from 'axios';
import { Navigate } from 'react-router-dom';
import endpoint from '../../assets/url/url';

const FAILED_POST_SEASON = 'src/redux/seasonreducer/failed_post_season'.toUpperCase();
const FAILED_PATCH_SEASON = 'src/redux/seasonreducer/failed_patch_season'.toUpperCase();
const GET_SEASON = 'src/redux/seasonreducer/get_season'.toUpperCase();
const FAILED_GET_SEASON = 'src/redux/seasonreducer/failed_get_season'.toUpperCase();
const GET_SEASONS_REQUEST = 'src/redux/seasonreducer/get_season_request'.toUpperCase();
const url = `${endpoint}/v2_seasons`;
const { token } = localStorage;

const sendSeasonDataFailed = (payload) => ({
  type: FAILED_POST_SEASON,
  payload,
});

const patchSeasonDataFailed = (payload) => ({
  type: FAILED_PATCH_SEASON,
  payload,
});

const fetchSeasonsData = (payload) => ({
  type: GET_SEASON,
  payload,
});

const fetchSeasonsDataFailed = (payload) => ({
  type: FAILED_GET_SEASON,
  payload,
});

const fetchSeasonRequest = () => ({
  type: GET_SEASONS_REQUEST,
  loading: true,
  error: null,
});

export const postSeasonToApi = (userData) => async (dispatch) => {
  const sendData = axios.post(url, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (sendData.error || sendData.errors || sendData.rejected) {
    const errorMsg = sendData.error || sendData.errors;
    dispatch(sendSeasonDataFailed(errorMsg));
  } else {
    window.history.pushState({}, '', '/seasons');
      <Navigate to="/seasons" />;
    // setTimeout(() => {
    // window.location.reload();
    // }, 5e3);
  }
};

export const postUpdateSeasonToApi = (userData) => async (dispatch) => {
  const { id } = userData;
  const sendData = axios.patch(`${url}/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (sendData.error || sendData.errors || sendData.rejected) {
    const errorMsg = sendData.error || sendData.errors;
    dispatch(patchSeasonDataFailed(errorMsg));
  } else {
    window.history.pushState({}, '', `/seasons/${id}`);
    // window.location.reload();
  }
};

export const getSeasonFromApi = () => async (dispatch) => {
  dispatch(fetchSeasonRequest());
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(fetchSeasonsData(response.data));
  } catch (error) {
    dispatch(fetchSeasonsDataFailed(error.message));
  }
};

const seasonReducer = (
  state = {
    data: [],
    loading: false,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case GET_SEASON:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case FAILED_GET_SEASON:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case GET_SEASONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FAILED_POST_SEASON:
    case FAILED_PATCH_SEASON:
      return { error: action.errorMsg };
    default:
      return state;
  }
};

export default seasonReducer;
