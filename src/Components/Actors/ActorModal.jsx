import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, FormControl } from "react-bootstrap";
import {
  actor_name_change,
  actor_movie_id_change,
} from "../../redux/Actors/actor_action";
import BaseSelectSearch from "../Generic/BaseSelectSearch";

const ActorModal = ({data}) => {
  const dispatch = useDispatch();
  const { name, movieId } = useSelector((state) => state.actor.payload);
  let action_name = name;
  let action_movieId = movieId;
  if (data !== null) {
    action_movieId = data.movieId;
    action_name = data.name;
  }
  const actors_movie = useSelector((state) => state.movie.movie_list);
  const onChangeName = (value) => dispatch(actor_name_change(value));
  const onChangeActorMovie = (value) => dispatch(actor_movie_id_change(value));
  const options = actors_movie.map((movie) => {
    return {
      value: movie.id,
      label: movie.title,
    };
  });

  return (
    <div>
      <InputGroup className="m-t-sm mb-3">
        <InputGroup.Text id="basic-addon3">Name</InputGroup.Text>
        <FormControl
          type="text"
          placeholder="insert actor name..."
          defaultValue={action_name}
          onChange={(e) => onChangeName(e.target.value)}
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
          onChange={onChangeActorMovie}
          value={action_movieId}
          width={397}
        />
      </InputGroup>
    </div>
  );
};

export default ActorModal;
