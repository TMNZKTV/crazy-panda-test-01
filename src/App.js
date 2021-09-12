import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "./components/table/Table";
import Pagination from "./components/pagination/Pagination";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

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

  console.log("order :", order);
  return (
    <div className="container mt-5">
      <Table
        posts={currentPosts}
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
