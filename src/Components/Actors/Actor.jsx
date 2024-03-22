import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Button, Modal} from 'react-bootstrap'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TanStackTable from "../Generic/TanStackTable";
import { createColumnHelper } from "@tanstack/react-table";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { actor_get_data, actor_movie_id_change, actor_name_change } from "../../redux/Actors/actor_action";
import { movie_get_data } from "../../redux/Movies/movie_action";
import ActorModal from "./ActorModal";

const Actors = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [data, setData] = useState(null);
    const actors_list = useSelector((state) => state.actor.actor_list);
    const actors_movie =  useSelector((state) => state.movie.movie_list);
    const actorsWithMovies = actors_list.map((actor) => {
        const movie = actors_movie.find((movie) => movie.id === actor.movieId);
        return {
          ...actor,
          movie_title: movie ? movie.title : '',
        };
      });
    const columnHelper = createColumnHelper();

    const changeActor = (row_id) => {
        const update_data = actors_list.find((actor) => actor.id === row_id)
        setData(update_data);
        setShow(true);
    }
    const deleteActor = () => {

    }

    const columns = [
        columnHelper.accessor("", {
            id: "id",
            cell: (info) => <span>{info.row.index + 1}</span>,
            header: "#",
        }),
        columnHelper.accessor("name", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Name",
        }),
        columnHelper.accessor("movie_title", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Movie",
        }),
        columnHelper.accessor("action", {
            cell: (info) => <>
                <Button variant="warning" onClick={() => changeActor(info.row.original.id)}>
                    <FontAwesomeIcon icon={faPencil} />
                </Button>
                <Button variant="danger" onClick={() => deleteActor(info.row.original.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </>,
            header: "Actions",
        }),
    ];

    useEffect(() => {
        dispatch(actor_get_data());
        dispatch(movie_get_data());
    }, [dispatch]);

    const handleClose = () => {
        dispatch(actor_movie_id_change(''));
        dispatch(actor_name_change(''));
        setShow(false);
        setData(null);
    }
    const onCreate = () => {

    }
    const create_new_actor = () => {
        setData(null);
        setShow(true);
    }

    return (
        <div className="pt-4 min-h-screen bg-gray-900">
            <TanStackTable 
                className="TanStackTable" 
                data={actorsWithMovies} 
                columns={columns}
                new_data = { create_new_actor }
                title="Actors"
            />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create New Actor</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <ActorModal data={data}/>
                    </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onCreate}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Actors;