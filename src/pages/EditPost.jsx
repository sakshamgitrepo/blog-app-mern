import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor';


const EditPost = () => {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/blogs/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, []);

  const updatePostHandler = async (e)=>{
    e.preventDefault()
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch('http://localhost:4000/blogs/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    setRedirect(false)
    console.log(response);
  }

  if (redirect) {
    return <Navigate to={'/'}/>
   }
  return (
    <form className="editPost" onSubmit={updatePostHandler}>
      <div className='heading'>Edit Your Post Here</div>
    <input
      type="title"
      placeholder={"Title"}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <input
      type="summary"
      placeholder={"Summary"}
      value={summary}
      onChange={(e) => setSummary(e.target.value)}
    />
    <input type="file" 
    onChange={(e) => setFiles(e.target.files)} 
    />

    <Editor content={content} setContent={setContent} />
   
    <button type="submit" style={{ marginTop: "5px" }}>
      Create Post
    </button>
  </form>
  )
}

export default EditPost