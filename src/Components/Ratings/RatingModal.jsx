import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, FormControl } from "react-bootstrap";
import BaseSelectSearch from "../Generic/BaseSelectSearch";
import { 
    rating_movie_id_change, 
    rating_stars_change,
} from "../../redux/Ratings/rating_action";

const RatingModal = ({data}) => {
  const dispatch = useDispatch();
  const { stars, movieId } = useSelector((state) => state.rating.payload);
  let action_stars = stars;
  let action_movieId = movieId;
  if (data !== null) {
    action_movieId = data.movieId;
    action_stars = data.stars;
  }
  const actors_movie = useSelector((state) => state.movie.movie_list);
  const onChangeStars = (value) => dispatch(rating_stars_change(value));
  const onChangeRatingMovie = (value) => dispatch(rating_movie_id_change(value));
  const options = actors_movie.map((movie) => {
    return {
      value: movie.id,
      label: movie.title,
    };
  });

  return (
    <div>
      <InputGroup className="m-t-sm mb-3">
        <InputGroup.Text id="basic-addon3">Stars</InputGroup.Text>
        <FormControl
          type="text"
          placeholder="insert rating stars..."
          defaultValue={action_stars}
          onChange={(e) => onChangeStars(e.target.value)}
          maxLength="50"
          style={{ border: "1px solid gray" }}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <InputGroup className="m-t-sm mb-3">
        <InputGroup.Text id="basic-addon3">Movie</InputGroup.Text>
        <BaseSelectSearch
          options={options}
          onChange={onChangeRatingMovie}
          value={action_movieId}
          width={397}
        />
      </InputGroup>
    </div>
  );
};

export default RatingModal;
