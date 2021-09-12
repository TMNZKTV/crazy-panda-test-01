import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "./components/table/Table";
import Pagination from "./components/pagination/Pagination";
import Filter from "./components/filter/Filter";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const response = await axios.get("/posts");
      setPosts(response.data);
      setLoading(false);
    };
    getPosts();
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

  const paginate = (number) => {
    setCurrentPage(number);
  };

  const sorting = (column) => {
    if (order) {
      const sorted = [...posts].sort((a, b) => {
        return a[column] > b[column] ? 1 : -1;
      });
      setPosts(sorted);
      setOrder(false);
    }
    if (!order) {
      const sorted = [...posts].sort((a, b) => {
        return a[column] < b[column] ? 1 : -1;
      });
      setPosts(sorted);
      setOrder(true);
    }
  };

  // Фильтруем карточки
  function search(posts) {
    const columns = posts[0] && Object.keys(posts[0]);

    return posts.filter((post) =>
      columns.some((column) =>
        post[column]
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
    );
  }

  return (
    <div className="container mt-5">
      <Filter
        searchValue={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Table
        posts={search(currentPosts)}
        loading={loading}
        onClick={sorting}
        order={order}
      />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        onClick={paginate}
      />
    </div>
  );
}

export default App;
