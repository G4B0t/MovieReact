import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Button, Modal} from 'react-bootstrap'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TanStackTable from "../Generic/TanStackTable";
import { createColumnHelper } from "@tanstack/react-table";
import { faExclamationCircle, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { 
    actor_add_data,
    actor_delete_data, 
    actor_get_data, 
    actor_movie_id_change, 
    actor_name_change,
    actor_update_data,
} from "../../redux/Actors/actor_action";
import { movie_get_data } from "../../redux/Movies/movie_action";
import ActorModal from "./ActorModal";

const Actors = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [data, setData] = useState(null);
    const [btnName, setBtnName] = useState('Save New');
    const [deleteName, setDeleteTitle] = useState('');
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const { isLoading, isLoaded } = useSelector((state) => state.actor);
    const actors_list = useSelector((state) => state.actor.actor_list);
    const actors_movie =  useSelector((state) => state.movie.movie_list);
    const actorsWithMovies = actors_list.map((actor) => {
        const movie = actors_movie.find((movie) => movie.id === actor.movieId);
        return {
          ...actor,
          movie_title: movie ? movie.title : 'Movie not Found',
        };
      });
    const columnHelper = createColumnHelper();

    const changeActor = (row_id) => {
        const update_data = actors_list.find((actor) => actor.id === row_id)
        setData(update_data);
        setShow(true);
    }

    const onDeleteModal = () => {
        if(deleteId !== null)
            dispatch(actor_delete_data(deleteId));
        setShowDelete(false);
        setDeleteId(null);
        setDeleteTitle('');
    }

    const deleteActor = (id) => {
        const actor_id = actors_list.find( actor => actor.id === id);
        if(actor_id !== null){
            setDeleteTitle(actor_id.title);
            setShowDelete(true);
            setDeleteId(id);
        }
    }

    const onUpdate = () => {
        dispatch(actor_update_data(data));
        dispatch(actor_movie_id_change(data.movieId))
        setBtnName('Save New');
        setData(null);        
        setShow(false);
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

    const handleCloseDelete = () => {
        setDeleteTitle('');
        setDeleteId(null);
        setShowDelete(false);
    }

    const handleClose = () => {
        dispatch(actor_movie_id_change(''));
        dispatch(actor_name_change(''));
        setShow(false);
        setData(null);
    }
    const onCreate = () => {
        dispatch(actor_add_data());
        dispatch(actor_movie_id_change(0));
        dispatch(actor_name_change(''));
        setBtnName('Save New');
        setData(null);        
        setShow(false);
    }
    const create_new_actor = () => {
        setData(null);
        setShow(true);
    }

    const update_add = () => {
        if(data === null) {
            onCreate();
        }else{
            onUpdate();
        }
    }

    return (
        <div className="pt-4 min-h-screen bg-gray-900">
            <TanStackTable 
                className="TanStackTable" 
                data={actorsWithMovies} 
                columns={columns}
                new_data = { create_new_actor }
                title="Actors"
                loading={isLoading}
                loaded={isLoaded}
            />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{data !== null ? 'Update ' : 'Create New '} Actor</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <ActorModal data={data}/>
                    </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={update_add}>
                    {btnName}
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                <Modal.Title>Delete Actor</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <h4> <FontAwesomeIcon icon={faExclamationCircle}/> Are You sure to delete this actor: { deleteName }</h4>
                    </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    Close
                </Button>
                <Button variant="danger" onClick={onDeleteModal}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Actors;