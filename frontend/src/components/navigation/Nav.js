import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
    toast.success("You have successfully logged out!");
  };

  return (
    <nav className="navbar">
      <NavLink className="logo" to="/">
        Logo
      </NavLink>
      <ul className="nav-links">
        {user ? (
          <>
            <NavLink className="nav-childs" to="/dashboard">
              Dashboard
            </NavLink>
            <button className="nav-childs" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink className="nav-childs" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-childs" to="/register">
              Register
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
