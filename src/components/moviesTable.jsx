import React, { Component } from "react";
import Table from "./reusable/table";
import { Link } from "react-router-dom";
class MoviesTable extends Component {
  moviesTableHeader = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "delete",
      content: m => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.onDeleteMovies(m)}
        >
          Delete
        </button>
      )
    }
  ];
  render() {
    const { paginatedMovies, onColumnSort, sortColumn } = this.props;
    return (
      <Table
        sortColumn={sortColumn}
        onColumnSort={onColumnSort}
        paginatedMovies={paginatedMovies}
        column={this.moviesTableHeader}
      />
    );
  }
}

export default MoviesTable;
