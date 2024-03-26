import {
  MOVIE_DATA_RECEIVED,
  MOVIE_RELEASE_DATE_CHANGE,
  MOVIE_ACTOR_CHANGE,
  MOVIE_TITLE_CHANGE,
  MOVIE_AVERAGE_RATING_CHANGE,
  MOVIE_DATA_REQUESTED,
} from "./movie_action";

const defaultState = {
  data: [
    {
      id: 1,
      img: "https://ichef.bbci.co.uk/images/ic/640x360/p0dr7p6t.jpg",
      title: "The Shawshank Redemption",
      releaseDate: new Date(1994, 9, 14),
      actors: [
        { id: 1, name: "Tim Robbins" },
        { id: 2, name: "Morgan Freeman" },
      ],
      ratings: [
        { id: 1, stars: 5 },
        { id: 2, stars: 4 },
      ],
    },
    {
      id: 2,
      img: "https://upload.wikimedia.org/wikipedia/en/a/af/The_Godfather%2C_The_Game.jpg",
      title: "The Godfather",
      releaseDate: new Date(1972, 2, 24),
      actors: [
        { id: 3, name: "Marlon Brando" },
        { id: 4, name: "Al Pacino" },
      ],
      ratings: [
        { id: 3, stars: 5 },
        { id: 4, stars: 4 },
      ],
    },
  ],
  movie_list: [],
  isloading: false,
  isloaded: false,
  error: null,
  payload: {
    title: "",
    releaseDate: "",
    averageRating: "",
    actors: "",
  },
};
const movie_reducer = (state = defaultState, action = null) => {
  switch (action.type) {
    case MOVIE_DATA_REQUESTED: {
      return {
        ...state,
        isloading: true,
        isloaded: false,
      };
    }
    case MOVIE_DATA_RECEIVED: {
      return {
        ...state,
        movie_list: action.data,
        isloaded: true,
        isloading: false,
      };
    }
    case MOVIE_TITLE_CHANGE:
      return {
        ...state,
        payload: {
          ...state.payload,
          title: action.payload,
        },
      };
    case MOVIE_RELEASE_DATE_CHANGE:
      return {
        ...state,
        payload: {
          ...state.payload,
          releaseDate: action.payload,
        },
      };
    case MOVIE_AVERAGE_RATING_CHANGE:
      return {
        ...state,
        payload: {
          ...state.payload,
          averageRating: action.payload,
        },
      };
    case MOVIE_ACTOR_CHANGE:
      return {
        ...state,
        payload: {
          ...state.payload,
          actors: action.payload,
        },
      };
    default:
      return state;
  }
};

export default movie_reducer;
