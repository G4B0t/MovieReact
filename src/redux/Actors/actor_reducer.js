import {
  ACTOR_DATA_RECEIVED,
  ACTOR_DATA_REQUESTED,
  ACTOR_MOVIE_ID_CHANGE,
  ACTOR_NAME_CHANGE,
} from "./actor_action";

const defaultState = {
  data: [
    {
      id: 1,
      name: "Tom Hanks",
      movieId: 1,
    },
    {
      id: 2,
      name: "Scarlett Johansson",
      movieId: 2,
    },
    {
      id: 3,
      name: "Leonardo DiCaprio",
      movieId: 3,
    },
    {
      id: 4,
      name: "Emma Watson",
      movieId: 4,
    },
    {
      id: 5,
      name: "Robert Downey Jr.",
      movieId: 1,
    },
  ],
  actor_list: [],
  isLoading: false,
  isLoaded: false,
  payload: {
    name: "",
    movieId: 0,
  },
};

const actor_reducer = (state = defaultState, action = null) => {
  switch (action.type) {
    case ACTOR_DATA_REQUESTED: {
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
      };
    }
    case ACTOR_DATA_RECEIVED: {
      const data = action.payload;
      const reducedArray = [];
      for (let i = 0; i < 1000; i++) {
        reducedArray.push(data[i]);
      }
      return {
        ...state,
        actor_list: reducedArray,
        isLoading: false,
        isLoaded: true,
      };
    }
    case ACTOR_NAME_CHANGE: {
      return {
        ...state,
        payload: {
          ...state.payload,
          name: action.payload,
        },
      };
    }
    case ACTOR_MOVIE_ID_CHANGE: {
      return {
        ...state,
        payload: {
          ...state.payload,
          movieId: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default actor_reducer;
