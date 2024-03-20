import axios from "axios";

export const MOVIE_CHANGE = "MOVIE_CHANGE";
export const MOVIE_UPDATE = "MOVIE_UPDATE";
export const MOVIE_DATA_RECEIVED = "MOVIE_DATA_RECEIVED";
export const MOVIE_DATA_REQUESTED = "MOVIE_DATA_REQUESTED";
export const MOVIE_TITLE_CHANGE = "MOVIE_TITLE_CHANGE";
export const MOVIE_ACTOR_CHANGE = "MOVIE_ACTOR_CHANGE";
export const MOVIE_AVERAGE_RATING_CHANGE = "MOVIE_AVERAGE_RATING_CHANGE";
export const MOVIE_RELEASE_DATE_CHANGE = "MOVIE_RELEASE_DATE_CHANGE";

const BASE_API_URL = "https://localhost:7239/api/Movies";

export const movie_title_change = (payload) => ({
  type: MOVIE_TITLE_CHANGE,
  payload,
});

export const movie_actor_change = (payload) => ({
  type: MOVIE_ACTOR_CHANGE,
  payload,
});

export const movie_averageRating_change = (payload) => ({
  type: MOVIE_AVERAGE_RATING_CHANGE,
  payload,
});

export const movie_releaseDate_change = (payload) => ({
  type: MOVIE_RELEASE_DATE_CHANGE,
  payload,
});

/*const movie_data_requested = () => ({
  type: MOVIE_DATA_REQUESTED,
});*/

const movie_data_received = (data) => ({
  type: MOVIE_DATA_RECEIVED,
  data,
});

export const movie_get_data = () => {
  return (dispatch) => {
    const uri = BASE_API_URL + "?page=1&pageSize=30";
    axios.get(uri).then((response) => {
      dispatch(movie_data_received(response.data));
    });
  };
};

export const movie_update_data = (body) => {
  return (dispatch) => {
    axios.post();
  };
};

export const movie_delete_data = () => {};

export const movie_create_data = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.movie.payload;

    axios.post();
  };
};
