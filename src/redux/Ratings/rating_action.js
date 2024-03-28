import axios from "axios";

export const RATING_DATA_RECEIVED = "RATING_DATA_RECEIVED";
export const RATING_STARS_CHANGE = "RATING_STARS_CHANGE";
export const RATING_MOVIE_ID_CHANGE = "RATING_MOVIE_ID_CHANGE";
export const RATING_DATA_REQUESTED = "RATING_DATA_REQUESTED";

const BASE_API_URL = "https://localhost:7239/api/Ratings";

export const rating_stars_change = (payload) => ({
  type: RATING_STARS_CHANGE,
  payload,
});

export const rating_movie_id_change = (payload) => ({
  type: RATING_MOVIE_ID_CHANGE,
  payload,
});

const rating_data_requested = () => ({
  type: RATING_DATA_REQUESTED,
});

const rating_data_received = (payload) => ({
  type: RATING_DATA_RECEIVED,
  payload,
});

export const rating_get_data = () => {
  return (dispatch) => {
    dispatch(rating_data_requested());
    axios.get(BASE_API_URL).then((response) => {
      dispatch(rating_data_received(response.data));
    });
  };
};

export const rating_update_data = (body) => {
  return (dispatch, getState) => {
    const state = getState();
    const actor = state.actors.payload;
    axios.update(BASE_API_URL, actor).then((response) => {
      console.log(response);
      dispatch(rating_get_data());
    });
  };
};

export const rating_delete_data = (body) => {
  return (dispatch) => {
    const uri = BASE_API_URL + "/" + body.id;
    axios.delete(uri).then((response) => {
      console.log(response);
      dispatch(rating_get_data());
    });
  };
};

export const rating_add_data = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.actor;
    axios.post(BASE_API_URL, payload).then((response) => {
      console.log(response);
      dispatch(rating_get_data());
    });
  };
};
