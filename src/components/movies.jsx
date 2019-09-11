import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Paginate from "./reusable/paginate";
import ListGroup from "./reusable/listGroup";
import pagination from "../utils/pagination";
import MoviesTable from "./moviesTable";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
import _ from "lodash";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: "All Genres",
    searchQuery: "",
    sortColumn: { name: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleDeleteMovies = movie => {
    const newMovies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: newMovies });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleGenreChange = genre => {
    this.setState({
      currentGenre: genre.name,
      searchQuery: "",
      currentPage: 1
    });
  };
  handleSearch = query => {
    this.setState({
      searchQuery: query,
      currentGenre: "All Genres",
      currentPage: 1
    });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  getPageData = () => {
    const {
      movies,
      pageSize,
      currentPage,
      currentGenre,
      searchQuery
    } = this.state;
    let filteredMovies = movies;
    if (searchQuery)
      filteredMovies = movies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (currentGenre === "All Genres") filteredMovies = movies;
    else
      filteredMovies = movies.filter(
        movie => movie.genre.name === currentGenre
      );

    const sortedMovies = _.orderBy(
      filteredMovies,
      [this.state.sortColumn.name],
      [this.state.sortColumn.order]
    );

    const paginatedMovies = pagination(sortedMovies, currentPage, pageSize);

    return { paginatedMovies, filteredMovies };
  };
  render() {
    const { pageSize, currentPage, genres, currentGenre } = this.state;

    if (this.state.movies.length === 0)
      return <p>There is no Movie in the Database.</p>;

    const { paginatedMovies, filteredMovies } = this.getPageData();

    return (
      <main role="main" className="container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              genres={genres}
              onGenreChange={this.handleGenreChange}
              currentGenre={currentGenre}
            />
          </div>
          <div className="col">
            <Link
              to="/movies/add"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              Add Movie
            </Link>
            <p>Showing {paginatedMovies.length} Movies from the Database.</p>
            <SearchBox
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            />
            <MoviesTable
              sortColumn={this.state.sortColumn}
              paginatedMovies={paginatedMovies}
              onDeleteMovies={this.handleDeleteMovies}
              onColumnSort={this.handleSort}
            />
            <Paginate
              totalMovies={filteredMovies.length}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Movies;
