import React from "react";
import "./Post.css";
import {format} from 'date-fns'
import { Link } from "react-router-dom";


const Post = ({_id,title,summary,cover,createdAt,author}) => {
  return (
    <div className="post">
      <div className="image">
        <Link to={`post/${_id}`}>
        <img
          src={'http://localhost:4000/'+cover}
          alt=""
        />
        </Link>
      </div>

      <div className="texts">
      <Link to={`post/${_id}`}>
        <h2>{title}</h2>
        </Link>
        <p className="info">
          <span className="author">{author.username}</span>
<time>{format(new Date(createdAt),'MMM d, yyy HH:mm')}</time>
        </p>
        <p className="summary">
         {summary}
        </p>
      </div>
    </div>
  );
};

export default Post;
