import React from "react";
import { NavLink, Route, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();

  return (
    <>
      <div className="dashboard-container">
        <div className="side-bar sm:w-[74px] ">
          <div className="side-bar-container">
            <div className="products ">
              <NavLink
                to="/dashboard/products"
                className="dashboard-title text-white rounded-md px-4 mt-4 text-md font-medium "
              >
                Add Products
              </NavLink>
            </div>
            <div className="products">
              <NavLink
                to="/dashboard/add-promo"
                className="dashboard-title text-white rounded-md px-4 mt-4   text-md font-medium"
              >
                Add Promotion
              </NavLink>
            </div>
            <div className="products">
              <NavLink
                to="/dashboard/my-products"
                className="dashboard-title text-white rounded-md px-4 mt-4 text-md font-medium"
              >
                My Products
              </NavLink>
            </div>

            <div className="products">
              <NavLink
                to="/dashboard/my-purchases"
                className="dashboard-title text-white rounded-md px-4 mt-4 text-md font-medium"
              >
                My Purchases
              </NavLink>
            </div>
            <div className="products">
              <NavLink
                to="/dashboard/chat-section"
                className="dashboard-title text-white rounded-md px-4 mt-4 text-md font-medium"
              >
                Chats
              </NavLink>
            </div>

            {/* <div className="stats">
              <NavLink
                to="/dashboard"
                className="dashboard-title text-white rounded-md px-3 py-2 text-lg font-medium"
              >
                View Stats
              </NavLink>
            </div> */}
          </div>
        </div>
        <div className="other-part">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
