import { combineReducers } from "redux";
import movie_reducer from "./Movies/movie_reducer";
import actor_reducer from "./Actors/actor_reducer";
import rating_reducer from "./Ratings/rating_reducer";

const movie_app_reducer = combineReducers({
  movie: movie_reducer,
  actor: actor_reducer,
  rating: rating_reducer,
});

export default movie_app_reducer;
