import React from "react";

const Pagination = ({ postsPerPage, totalPosts, onClick }) => {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i += 1) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumber.map((number) => {
          return (
            <li key={number} className="page-item mt-3">
              <a
                href="!#"
                className="page-link"
                onClick={() => onClick(number)}
              >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
