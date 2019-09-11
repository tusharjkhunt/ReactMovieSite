import React from "react";

const ListGroup = props => {
  return (
    <ul className="list-group">
      {props.genres.map(genre => (
        <li
          key={genre._id}
          className={
            genre.name === props.currentGenre
              ? "list-group-item active clickable"
              : "list-group-item clickable"
          }
          onClick={() => props.onGenreChange(genre)}
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
