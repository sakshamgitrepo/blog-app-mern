import React, { useContext, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contextApi/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const login = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:4000/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
        setRedirect(true);
      })
      .catch((error) => {
        toast.error("Wrong Credentials Or Fetch Failed", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <form className="login" onSubmit={login}>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
        <ToastContainer />
      </form>
    </>
  );
};

export default LoginPage;
