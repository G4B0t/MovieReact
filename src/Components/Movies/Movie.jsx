import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from 'react-bootstrap'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import TanStackTable from "../Generic/TanStackTable";
import { createColumnHelper } from "@tanstack/react-table";
import { 
    movie_get_data,
    movie_title_change,
    movie_releaseDate_change,
    movie_actor_change,
    movie_averageRating_change,
    movie_create_data,
    movie_delete_data,
    movie_update_data,
} from "../../redux/Movies/movie_action";
import MovieModal from "./MovieModal";

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const Movies = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [data, setData] = useState(null);
    const [btnName, setBtnName] = useState('Save New');
    const [deleteTitle, setDeleteTitle] = useState('');
    const [showDelete, setShowDelete] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const movies = useSelector((state) => state.movie.movie_list);
    const { isloading, isloaded } = useSelector((state) => state.movie);
    const columnHelper = createColumnHelper();

    const list = movies.map( movie => {
        const stringDate = formatDate((new Date(movie.releaseDate)));
        return Object.assign({}, movie, {
            releaseDate: stringDate,
          });
    });

    const onDeleteModal = () => {
        if(deleteId !== null)
            dispatch(movie_delete_data(deleteId));
        
        setShowDelete(false);
        setDeleteId(null);
        setDeleteTitle('');
    }

    const deleteMovie = (id) => {
        const movie_id = movies.find( movie => movie.id === id);
        if(movie_id !== null){
            setDeleteTitle(movie_id.title);
            setShowDelete(true);
            setDeleteId(id);
        }
    }

    const onUpdate = () => {
        dispatch(movie_update_data(data));
        setBtnName('Save New');
        setData(null);        
        setShow(false);
    }

    const updateMovie = (row_id) => {
        const update_data = movies.find((movie) => movie.id === row_id)
        setData(update_data);
        setBtnName('Save Changes')
        setShow(true);
    }
    const create_new_movie = () => {
        setData(null);
        setShow(true)
    }

    const handleCloseDelete = () => {
        setDeleteTitle('');
        setDeleteId(null);
        setShowDelete(false);
    }
    const handleClose = () => {
        dispatch(movie_actor_change(''));
        dispatch(movie_title_change(''));
        dispatch(movie_releaseDate_change(''));
        dispatch(movie_averageRating_change(''));
        setBtnName('Save New');
        setData(null);
        setShow(false);
    }
    const onCreate = () => {
        dispatch(movie_create_data());
        dispatch(movie_actor_change(''));
        dispatch(movie_title_change(''));
        dispatch(movie_releaseDate_change(''));
        dispatch(movie_averageRating_change(''));
        setBtnName('Save New');
        setData(null);        
        setShow(false);
    }

    const update_add = () => {
        if(data === null) {
            onCreate();
        }else{
            onUpdate();
        }
    }

    useEffect(() => {
        dispatch(movie_get_data());
    }, [dispatch]);

    const columns = [
        columnHelper.accessor("", {
            id: "id",
            cell: (info) => <span>{info.row.index + 1}</span>,
            header: "#",
        }),
        columnHelper.accessor("title", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Title",
        }),
        columnHelper.accessor("releaseDate", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Release Date",
        }),
        columnHelper.accessor("actors", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Actors",
        }),
        columnHelper.accessor("averageRating", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Ratings",
        }),
        columnHelper.accessor("",{
            cell: (info) => <>
                <Button variant="warning" onClick={() => updateMovie(info.row.original.id)}>
                    <FontAwesomeIcon icon={faPencil} />
                </Button>
                <Button variant="danger" onClick={() => deleteMovie(info.row.original.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </>,
            header: "Actions"
        })
    ];

    return (
        <div className="pt-4 min-h-screen bg-gray-900">
            <TanStackTable 
                className="TanStackTable" 
                data={list} 
                columns={columns} 
                new_data = { create_new_movie }
                title = "Movies"
                loading={isloading}
                loaded={isloaded}
            />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{data !== null ? 'Update ' : 'Create New '} Movie</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <MovieModal data={data}/>
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
                <Modal.Title>Delete Movie</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <h4> <FontAwesomeIcon icon={faExclamationTriangle}/> Are You sure to delete this movie: {deleteTitle}</h4>
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

export default Movies;