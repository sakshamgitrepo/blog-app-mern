import React, { useEffect, useState } from "react";
import Post from "../components/Post";


const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchApi =()=>{
    fetch(`/blogs/post`,
     {
      credentials: "include",
    }).then((response) => {
      response.json().then((data) => {
        setPosts(data);
        setLoading(false)
      });
    });
  }
  fetchApi()
  }, []);

  
  return (
    <>
    {loading && <p style={{fontSize:'1.5rem', fontWeight:'bold',textAlign:'center'}}>Loading...</p>}
      {posts.length > 0 &&
        posts.map((post) => <Post {...post} key={post._id} />)}

    
    </>
  );
};

export default IndexPage;
