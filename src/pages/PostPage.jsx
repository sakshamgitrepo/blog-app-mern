import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./PostPage.css";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../contextApi/UserContext";
import { FiEdit } from "react-icons/fi";

const PostPage = () => {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApi = () => {
      fetch(`http://localhost:4000/blogs/post/${id}`).then((response) => {
        response.json().then((data) => {
          setPostInfo(data);
          setLoading(false);
        });
      });
    };
    fetchApi();
  }, []);
  if (!postInfo) return "";
  return (
    <>
      {loading ? (
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
           }}
        >
          Loading...
        </p>
      ) : (
        <div className="postPage">
          <h1>{postInfo.title}</h1>
          <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
          <div className="postpage-author">by @{postInfo.author.username}</div>

          {userInfo
            ? userInfo.id === postInfo.author._id && (
                <div className="edit-post">
                  <Link to={`/edit/${postInfo._id}`}>
                    <FiEdit size={27} />
                    Edit this Post
                  </Link>
                </div>
              )
            : null}

          <div className="postpageImg">
            <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>
      )}
    </>
  );
};

export default PostPage;
