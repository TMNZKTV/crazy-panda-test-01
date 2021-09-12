import React, { useState } from "react";
import ArrowUp from ".././UI/arrow/ArrowUp";
import ArrowDown from ".././UI/arrow/ArrowDown";
import styles from "./Table.module.css";

const Table = ({ posts, loading, onClick, order }) => {
  const [column, setColumn] = useState("");

  const Arrow = () => {
    return <>{order ? <ArrowUp /> : <ArrowDown />}</>;
  };

  const setSorting = (column) => {
    onClick(column);
    setColumn(column);
  };
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <table className="table table-bordered ">
            <thead className="table-light">
              <tr className="h4">
                <td
                  className={styles.table_column}
                  onClick={() => {
                    setSorting("id");
                  }}
                >
                  Id
                  {column === "id" ? <Arrow /> : null}
                </td>
                <td onClick={() => setSorting("title")}>
                  Title
                  {column === "title" ? <Arrow /> : null}
                </td>
                <td onClick={() => setSorting("body")}>
                  Description
                  {column === "body" ? <Arrow /> : null}
                </td>
              </tr>
            </thead>
            {posts.map((post, idx) => {
              return (
                <tbody key={idx}>
                  <tr>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </>
      )}
    </>
  );
};

export default Table;
