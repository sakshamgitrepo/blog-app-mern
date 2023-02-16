import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";





const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const register = async (e) => {
    e.preventDefault();
    await fetch(`/user/register`,
 {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then(() => {
        alert("Registraion Successfull");
        navigate("/login");
      })
      .catch(() => {
        toast.error("Error in Registration");
      });
  };

  return (
    <>
      <form className="register" onSubmit={register}>
        <h1>
          <FaUser /> Register
        </h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>Register</button>
        <Toaster />
      </form>
    </>
  );
};

export default RegisterPage;
