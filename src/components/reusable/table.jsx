import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
const Table = ({ sortColumn, onColumnSort, paginatedMovies, column }) => {
  return (
    <table className="table">
      <TableHeader
        sortColumn={sortColumn}
        onCSort={onColumnSort}
        column={column}
      />
      <TableBody data={paginatedMovies} column={column} />
    </table>
  );
};

export default Table;
