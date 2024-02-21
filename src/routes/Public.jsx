import React from "react";
import { Outlet, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Home from "../screens/user/Home";
import SignUp from "../screens/user/SignUp";
import Login from "../screens/user/Login";
import Productpage from "../screens/user/Productpage";

const Public = () => {
  return (
    <>
      {/* <NavLink to="/">Home</NavLink>

      <NavLink to="/signup">Signup</NavLink>
      <NavLink to="/login">Login</NavLink> */}
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/product" element={<Productpage />} />
          <Route
            path="/product/detail/:userId/:productId"
            element={<Productpage />}
          />

          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<>404 - given public route not found</>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Public;
