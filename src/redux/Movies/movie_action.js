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

const movie_data_requested = () => ({
  type: MOVIE_DATA_REQUESTED,
});

const movie_data_received = (data) => ({
  type: MOVIE_DATA_RECEIVED,
  data,
});

export const movie_get_data = () => {
  return (dispatch) => {
    const uri = BASE_API_URL + "?title=Avengers&page=1&pageSize=10000"; // title=Avengers&
    dispatch(movie_data_requested());
    axios.get(uri).then((response) => {
      dispatch(movie_data_received(response.data.data));
    });
  };
};

export const movie_update_data = (body) => {
  return (dispatch) => {
    const string_names = body.actors.split(",");
    const names = string_names.map((actor) => ({
      name: actor.trim(),
      movieId: body.id,
    }));
    const data = {
      id: body.id,
      title: body.title,
      actors: names,
      releaseDate: body.releaseDate,
      ratings: [
        {
          stars: body.averageRating,
        },
      ],
    };
    const uri = BASE_API_URL + "/" + body.id;
    axios
      .put(uri, data)
      .then((response) => {
        if (response.status === 204) dispatch(movie_get_data());
      })
      .catch((errMsg) => {
        console.log(errMsg);
      });
  };
};

export const movie_delete_data = (id) => {
  return (dispatch) => {
    const uri = BASE_API_URL + "/" + id;
    axios.delete(uri).then((response) => {
      if (response.status === 204) dispatch(movie_get_data());
    });
  };
};

const movie_add_received = (payload) => {
  return (dispatch, getState) => {
    const state = getState();
    const { movie_list } = state.movie;
    const stringURL = payload.replace(/ /g, "+");
    const uri = BASE_API_URL + "?title=" + stringURL + "&page=1&pageSize=30";
    axios.get(uri).then((response) => {
      dispatch(movie_data_received([...movie_list, ...response.data.data]));
    });
  };
};

export const movie_create_data = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.movie;
    const string_names = payload.actors.split(",");
    const names = string_names.map((actor) => ({ name: actor.trim() }));
    const data = {
      title: payload.title,
      actors: names,
      releaseDate: payload.releaseDate,
      ratings: [
        {
          stars: payload.averageRating,
        },
      ],
    };
    axios.post(BASE_API_URL, data).then((response) => {
      dispatch(movie_add_received(payload.title));
    });
  };
};
