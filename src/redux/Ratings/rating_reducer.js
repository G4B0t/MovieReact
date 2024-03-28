import {
  RATING_DATA_RECEIVED,
  RATING_DATA_REQUESTED,
  RATING_MOVIE_ID_CHANGE,
  RATING_STARS_CHANGE,
} from "./rating_action";

const defaultState = {
  data: [
    {
      id: 1,
      stars: 5,
      movieId: 1,
    },
    {
      id: 2,
      stars: 4,
      movieId: 2,
    },
    {
      id: 3,
      stars: 3,
      movieId: 3,
    },
    {
      id: 4,
      stars: 5,
      movieId: 4,
    },
    {
      id: 5,
      stars: 4,
      movieId: 1,
    },
  ],
  payload: {
    stars: 0,
    movieId: 0,
  },
  isLoading: false,
  isLoaded: false,
  rating_list: [],
};
const rating_reducer = (state = defaultState, action = null) => {
  switch (action.type) {
    case RATING_DATA_REQUESTED: {
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
      };
    }
    case RATING_DATA_RECEIVED: {
      return {
        ...state,
        isLoaded: true,
        rating_list: action.payload,
      };
    }
    case RATING_STARS_CHANGE: {
      return {
        ...state,
        payload: {
          ...state.payload,
          stars: action.payload,
        },
      };
    }
    case RATING_MOVIE_ID_CHANGE: {
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

export default rating_reducer;
