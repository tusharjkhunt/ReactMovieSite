import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
class Paginate extends Component {
  render() {
    const { totalMovies, pageSize, currentPage, onPageChange } = this.props;
    const totalPages = Math.ceil(totalMovies / pageSize);
    if (totalPages === 1) return null;
    const pages = _.range(1, totalPages + 1);
    /*let pages = [];
    let n = 1;
    while (n <= totalPages) {
      pages.push(n);
      n++;
    }*/

    return (
      <nav>
        <ul className="pagination">
          {pages.map(page => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <a className="page-link" onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
Paginate.propTypes = {
  totalMovies: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Paginate;
