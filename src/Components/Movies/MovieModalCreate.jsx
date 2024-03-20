import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, FormControl } from "react-bootstrap";
import {
  movie_title_change,
  movie_releaseDate_change,
  movie_actor_change,
  movie_averageRating_change,
} from "../../redux/Movies/movie_action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import BaseDatePicker from "../Generic/BaseDatePicker";

const MovieModalCreate = () => {
  const dispatch = useDispatch();
  const { title, releaseDate, actor, averageRating } = useSelector(
    (state) => state.movie.payload,
  );
  const onChangeTitle = (value) => dispatch(movie_title_change(value));
  const onChangeActor = (value) => dispatch(movie_actor_change(value));
  const onChangeReleaseDate = (value) => {
    dispatch(movie_releaseDate_change(value));
    }
  const onChangeAverageRating = (value) =>
    dispatch(movie_averageRating_change(value));

  return (
    <div>
      <InputGroup className="m-t-sm mb-3">
        <InputGroup.Text id="basic-addon3">Title</InputGroup.Text>
        <FormControl
          type="text"
          placeholder="insert movie title..."
          defaultValue={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          maxLength="50"
          style={{ border: "1px solid gray" }}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <InputGroup className="m-t-sm mb-3">
        <InputGroup.Text id="basic-addon3">Actors</InputGroup.Text>
        <FormControl
          type="text"
          placeholder="insert movie actors..."
          defaultValue={actor}
          onChange={onChangeActor}
          maxLength="200"
          style={{ border: "1px solid gray" }}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
        <InputGroup.Text>
            <FontAwesomeIcon icon={faQuestion} title="Insert Actors separated with commas"/>
        </InputGroup.Text>
      </InputGroup>
      <InputGroup className="m-t-sm mb-3">
        <InputGroup.Text id="basic-addon3">Average Rating</InputGroup.Text>
        <FormControl
          type="text"
          placeholder="insert average rating..."
          defaultValue={averageRating}
          onChange={(e) => onChangeAverageRating(e.target.value)}
          maxLength="50"
          style={{ border: "1px solid gray" }}
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </InputGroup>
      <InputGroup className="m-t-sm mb-3">
        <InputGroup.Text id="basic-addon3">Release Date</InputGroup.Text>
        <InputGroup.Text className="align-items-center">
            <BaseDatePicker
                selected={releaseDate} 
                onChange={(date) => onChangeReleaseDate(date)}
            />
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
};

export default MovieModalCreate;
