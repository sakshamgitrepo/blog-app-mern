import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { BsFillPlusCircleFill } from "react-icons/bs";
import "./Header.css";
import { UserContext } from "../contextApi/UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async() => {
     await fetch("http://localhost:4000/user/profile", {
        credentials: "include",
      }).then((response) => {
        response.json().then((data) => {
          setUserInfo(data);
        });
      });
    };
    fetchApi()
  }, []);

  function logout() {
    fetch("http://localhost:4000/user/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    navigate("/");
  }
  const userName = userInfo?.username;
  return (
    <header>
      <Link to="/" className="logo">
        My blog
      </Link>
      {userName ? (
        <>
          <p className="profilename">Welcome, {userName}</p>
          <nav>
            <Link to="/create" className="navlink">
              <BsFillPlusCircleFill className="authIcons" /> Create Post
            </Link>
            <span onClick={logout} className="navlink">
              <FaSignOutAlt className="authIcons" />
              Logout
            </span>
          </nav>
        </>
      ) : (
        <nav>
          <Link to="/login" className="navlink">
            <FaSignInAlt className="authIcons" />
            Login
          </Link>
          <Link to="/register" className="navlink">
            <FaUser className="authIcons" />
            Register
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
