import React from "react";
import { Outlet, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Home from "../screens/user/Home";
import SignUp from "../screens/user/SignUp";
import Login from "../screens/user/Login";

const Public = () => {
  return (
    <>
      {/* <NavLink to="/">Home</NavLink>

      <NavLink to="/signup">Signup</NavLink>
      <NavLink to="/login">Login</NavLink> */}
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<>404 not found</>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Public;
