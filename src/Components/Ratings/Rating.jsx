import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TanStackTable from "../Generic/TanStackTable";
import { createColumnHelper } from "@tanstack/react-table";
import {Button, Modal} from 'react-bootstrap'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RatingModal from "./RatingModal";
import { 
    rating_add_data,
    rating_delete_data,
    rating_get_data, 
    rating_movie_id_change, 
    rating_stars_change, 
    rating_update_data,
} from "../../redux/Ratings/rating_action";
import { movie_get_data } from "../../redux/Movies/movie_action";
import { faExclamationCircle, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";


const Ratings = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [data, setData] = useState(null);
    const [btnName, setBtnName] = useState('Save New');
    const [deleteName, setDeleteTitle] = useState('');
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const { isLoading, isLoaded } = useSelector((state) => state.rating);
    const ratings_list = useSelector((state) => state.rating.rating_list);
    const ratings_movie =  useSelector((state) => state.movie.movie_list);
    const ratingsWithMovies = ratings_list.map((rating) => {
        const movie = ratings_movie.find((movie) => movie.id === rating.movieId);
        return {
          ...rating,
          movie_title: movie ? movie.title : 'Movie not Found',
        };
      });
    const columnHelper = createColumnHelper();

    const changeRating = (row_id) => {
        const update_data = ratings_list.find((rating) => rating.id === row_id)
        setData(update_data);
        setShow(true);
    }

    const onDeleteModal = () => {
        if(deleteId !== null)
            dispatch(rating_delete_data(deleteId));
        setShowDelete(false);
        setDeleteId(null);
        setDeleteTitle('');
    }

    const deleteRating = (id) => {
        const rating_id = ratings_list.find( rating => rating.id === id);
        if(rating_id !== null){
            setDeleteTitle(rating_id.title);
            setShowDelete(true);
            setDeleteId(id);
        }
    }

    const onUpdate = () => {
        dispatch(rating_update_data(data));
        dispatch(rating_movie_id_change(data.movieId))
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
        columnHelper.accessor("stars", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Stars",
        }),
        columnHelper.accessor("movie_title", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Movie",
        }),
        columnHelper.accessor("action", {
            cell: (info) => <>
                <Button variant="warning" onClick={() => changeRating(info.row.original.id)}>
                    <FontAwesomeIcon icon={faPencil} />
                </Button>
                <Button variant="danger" onClick={() => deleteRating(info.row.original.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </>,
            header: "Actions",
        }),
    ];

    useEffect(() => {
        dispatch(rating_get_data());
        dispatch(movie_get_data());
    }, [dispatch]);

    const handleCloseDelete = () => {
        setDeleteTitle('');
        setDeleteId(null);
        setShowDelete(false);
    }

    const handleClose = () => {
        dispatch(rating_stars_change(0));
        dispatch(rating_movie_id_change(0));
        setShow(false);
        setData(null);
    }
    const onCreate = () => {
        dispatch(rating_add_data());
        dispatch(rating_stars_change(0));
        dispatch(rating_movie_id_change(0));
        setBtnName('Save New');
        setData(null);        
        setShow(false);
    }
    const create_new_rating = () => {
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
                data={ratingsWithMovies}
                new_data = { create_new_rating }
                columns={columns}
                title="Ratings"
                loading={isLoading}
                loaded={isLoaded}
            />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{data !== null ? 'Update ' : 'Create New '} Rating</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <RatingModal data={data}/>
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
                <Modal.Title>Delete Rating</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <h4> <FontAwesomeIcon icon={faExclamationCircle}/> Are You sure to delete this rating: { deleteName }</h4>
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

export default Ratings;