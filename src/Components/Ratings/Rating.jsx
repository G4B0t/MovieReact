import React from "react";
import { useSelector } from "react-redux";
import TanStackTable from "../Generic/TanStackTable";
import { createColumnHelper } from "@tanstack/react-table";


const Ratings = () => {
    const data = useSelector((state) => state.rating.data);
    const columnHelper = createColumnHelper();

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
        columnHelper.accessor("movieId", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Movie Id",
        }),
    ];

    return (
        <div className="pt-4 min-h-screen bg-gray-900">
            <TanStackTable 
                className="TanStackTable" 
                data={data} 
                columns={columns}
                title="Ratings"
            />
        </div>
    );
}

export default Ratings;