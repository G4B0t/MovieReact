import {
  MOVIE_DATA_RECEIVED,
  MOVIE_RELEASE_DATE_CHANGE,
  MOVIE_ACTOR_CHANGE,
  MOVIE_TITLE_CHANGE,
  MOVIE_AVERAGE_RATING_CHANGE,
} from "./movie_action";
const defaultState = {
  data: [
    {
      id: 1,
      img: "https://images.squarespace-cdn.com/content/v1/5c75dfa97d0c9166551f52b1/9351f4e2-94f9-42e2-81df-003d5fe7b8e0/9964546b0ba1f6e14a6045e34b341f8ca2a3569752c5afed95b89682fcde1a68._RI_V_TTW_.jpg",
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
  payload: {
    title: "",
    releaseDate: "",
    averageRating: "",
    actors: "",
  },
};
const movie_reducer = (state = defaultState, action = null) => {
  switch (action.type) {
    case MOVIE_DATA_RECEIVED: {
      const list = action.data;
      return {
        ...state,
        movie_list: list.data,
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
