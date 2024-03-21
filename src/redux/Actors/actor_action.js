import axios from "axios";

export const ACTOR_DATA_RECEIVED = "ACTOR_DATA_RECEIVED";
export const ACTOR_NAME_CHANGE = "ACTOR_NAME_CHANGE";
export const ACTOR_MOVIE_ID_CHANGE = "ACTOR_MOVIE_ID_CHANGE";

const BASE_API_URL = "https://localhost:7239/api/Actors";

export const actor_name_change = (payload) => ({
  type: ACTOR_NAME_CHANGE,
  payload,
});

export const actor_movie_id_change = (payload) => ({
  type: ACTOR_NAME_CHANGE,
  payload,
});

const actor_data_received = (payload) => ({
  type: ACTOR_DATA_RECEIVED,
  payload,
});

export const actor_get_data = () => {
  return (dispatch) => {
    axios.get(BASE_API_URL).then((response) => {
      dispatch(actor_data_received(response.data));
    });
  };
};
