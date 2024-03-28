import axios from "axios";

export const ACTOR_DATA_RECEIVED = "ACTOR_DATA_RECEIVED";
export const ACTOR_NAME_CHANGE = "ACTOR_NAME_CHANGE";
export const ACTOR_MOVIE_ID_CHANGE = "ACTOR_MOVIE_ID_CHANGE";
export const ACTOR_DATA_REQUESTED = "ACTOR_DATA_REQUESTED";

const BASE_API_URL = "https://localhost:7239/api/Actors";

export const actor_name_change = (payload) => ({
  type: ACTOR_NAME_CHANGE,
  payload,
});

export const actor_movie_id_change = (payload) => ({
  type: ACTOR_MOVIE_ID_CHANGE,
  payload,
});

const actor_data_requested = () => ({
  type: ACTOR_DATA_REQUESTED,
});

const actor_data_received = (payload) => ({
  type: ACTOR_DATA_RECEIVED,
  payload,
});

export const actor_get_data = () => {
  return (dispatch) => {
    dispatch(actor_data_requested());
    axios.get(BASE_API_URL).then((response) => {
      dispatch(actor_data_received(response.data));
    });
  };
};

export const actor_update_data = (body) => {
  return (dispatch, getState) => {
    const state = getState();
    const actor = state.actors.payload;
    axios.update(BASE_API_URL, actor).then((response) => {
      console.log(response);
      dispatch(actor_get_data());
    });
  };
};

export const actor_delete_data = (body) => {
  return (dispatch) => {
    const uri = BASE_API_URL + "/" + body.id;
    axios.delete(uri).then((response) => {
      console.log(response);
      dispatch(actor_get_data());
    });
  };
};

export const actor_add_data = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { payload } = state.actor;
    axios.post(BASE_API_URL, payload).then((response) => {
      console.log(response);
      dispatch(actor_get_data());
    });
  };
};
