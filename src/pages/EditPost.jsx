import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { Navigate, useParams } from 'react-router-dom';
import { toast, Toaster } from "react-hot-toast";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const EditPost = () => {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchApi = async()=>{
    await fetch('/blogs/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      })
    }
    fetchApi()
  }, [id]);

  const updatePostHandler = async (e)=>{
    e.preventDefault()
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
 await fetch('/blogs/post'
 , {
      method: 'PUT',
      body: data,
      credentials: 'include',
    }).then((response) => {
       setRedirect(true)
    }).catch(()=>{
      toast.error("error in editing")
    })
     
  }

  if (redirect) {
    return <Navigate to={`/post/${id}`}/>
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

<ReactQuill
          value={content}
          onChange={(newValue) => setContent(newValue)}
          modules={modules}
        /> 
   
    <button type="submit" style={{ marginTop: "5px" }}>
      Update Post
    </button>
    <Toaster />
  </form>
  )
}

export default EditPost