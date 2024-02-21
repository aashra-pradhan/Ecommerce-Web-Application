import React from "react";
import { Outlet, Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Dashboard from "../screens/user/Dashboard";
import Cart from "../screens/user/Cart";
import Home from "../screens/user/Home";
import Profile from "../screens/user/Profile";
import Addproducts from "../screens/user/Addproducts";
import Productpage from "../screens/user/Productpage";
import Purchasepage from "../screens/user/Purchasepage";
const Private = () => {
  return (
    <>
      {/* <NavLink to="/profile">Private home</NavLink> */}
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />

          <Route
            path="/product/detail/:userId/:productId"
            element={<Productpage />}
          />
          <Route path="/product/purchase" element={<Purchasepage />} />
          {/* esari :userId :productId garera dynamic route set gareko ho, tyaha j ni values aauna sakcha bhanera, 
here userId and productId are parameters(params) */}
          <Route
            path="/dashboard"
            children={[
              <Route path="/dashboard/products" element={<Addproducts />} />,
            ]}
            element={<Dashboard />}
          />
          {/* children haru esari bhitra define gardine now they are dashboard/products not just /products, ani esari 
          parent bhitra define garesi pugyo, bahira main route ma define garirakhnuprena, parent bhitra gardesi pugyo */}
          <Route path="/cart" element={<Cart />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<>404- given private route not found</>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Private;
