import React from "react";
import { useSelector } from "react-redux";
import {Button} from 'react-bootstrap'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TanStackTable from "../Generic/TanStackTable";
import { createColumnHelper } from "@tanstack/react-table";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

const Actors = () => {
    const data = useSelector((state) => state.actor.data);
    const columnHelper = createColumnHelper();

    const changeActor = () => {

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
        columnHelper.accessor("action", {
            cell: (info) => <>
                <Button variant="warning" onClick={changeActor}>
                    <FontAwesomeIcon icon={faPencil} />
                </Button>
                <Button variant="danger" onClick={changeActor}>
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </>,
            header: "Actions",
        }),
    ];

    return (
        <div className="pt-4 min-h-screen bg-gray-900">
            <TanStackTable className="TanStackTable" data={data} columns={columns}/>
        </div>
    );
}

export default Actors;