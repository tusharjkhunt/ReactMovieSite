import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.name === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.name = path;
      sortColumn.order = "asc";
    }
    this.props.onCSort(sortColumn);
  };

  /*renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    //if (sortColumn.order === "asc") return <FontAwesomeIcon icon={faSortUp} />;
    return <FontAwesomeIcon icon={faSort} />;
  };*/

  render() {
    const { column } = this.props;
    return (
      <thead>
        <tr>
          {column.map(c => (
            <th
              className="clickable"
              key={c.path || c.key}
              onClick={() => this.raiseSort(c.path)}
            >
              {c.label} {c.label ? <FontAwesomeIcon icon={faSort} /> : null}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
