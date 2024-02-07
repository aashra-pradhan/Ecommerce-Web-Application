import React from "react";
import { Outlet, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Privpage from "../screens/user/Privpage";
import Home from "../screens/user/Home";

const Private = () => {
  return (
    <>
      {/* <NavLink to="/profile">Private home</NavLink> */}
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="profile" element={<Privpage />} />
          <Route path="*" element={<>404 private route not found</>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Private;
