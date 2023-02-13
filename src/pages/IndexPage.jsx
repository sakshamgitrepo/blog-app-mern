import React, { useEffect, useState } from "react";
import Post from "../components/Post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchApi =()=>{
    fetch("http://localhost:4000/blogs/post", {
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        setPosts(data);
      });
    });
  }
  fetchApi()
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post {...post} key={post._id} />)}
    </>
  );
};

export default IndexPage;
