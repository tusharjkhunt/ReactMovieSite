import _ from "lodash";
export default function pagination(movieList, currentPage, pageSize) {
  const startingIndex = (currentPage - 1) * pageSize;
  return _(movieList)
    .slice(startingIndex)
    .take(pageSize)
    .value();
}
