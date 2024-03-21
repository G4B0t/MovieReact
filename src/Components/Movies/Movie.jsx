import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Button, Modal } from 'react-bootstrap'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import TanStackTable from "../Generic/TanStackTable";
import { createColumnHelper } from "@tanstack/react-table";
import { 
    movie_get_data,
    movie_title_change,
    movie_releaseDate_change,
    movie_actor_change,
    movie_averageRating_change,
} from "../../redux/Movies/movie_action";
import MovieModalCreate from "./MovieModalCreate";

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const Movies = () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const movies = useSelector((state) => state.movie.movie_list);
    const columnHelper = createColumnHelper();

    const data = movies.map( movie => {
        const stringDate = formatDate((new Date(movie.releaseDate)));
        return Object.assign({}, movie, {
            releaseDate: stringDate,
          });
    });

    const deleteMovie = () => {

    }
    const updateMovie = (row) => {
        console.log(row)
    }
    const create_new_movie = () => {
        setShow(true)
    }
    const handleClose = () => {
        dispatch(movie_actor_change(''));
        dispatch(movie_title_change(''));
        dispatch(movie_releaseDate_change(''));
        dispatch(movie_averageRating_change(''));

        setShow(false);
    }
    const onCreate = () => {
        dispatch()
    }

    useEffect(() => {
        dispatch(movie_get_data());
    }, [dispatch])

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
                data={data} 
                columns={columns} 
                new_data = { create_new_movie }
                title = "Movies"
            />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Create New Movie</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <MovieModalCreate />
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

export default Movies;