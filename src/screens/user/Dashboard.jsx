import React from "react";
import { NavLink, Route, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();

  return (
    <>
      <div className="dashboard-container">
        <div className="side-bar">
          <div className="side-bar-container">
            <div className="products">
              <NavLink
                to="/dashboard/products"
                className="dashboard-title text-white rounded-md px-5 mt-4 text-lg font-medium"
              >
                Add Products
              </NavLink>
            </div>
            <div className="products">
              <NavLink
                to="/dashboard/add-promo"
                className="dashboard-title text-white rounded-md px-5 mt-4   text-lg font-medium"
              >
                Add Promo
              </NavLink>
            </div>
            <div className="products">
              <NavLink
                to="/dashboard/my-products"
                className="dashboard-title text-white rounded-md px-5 mt-4 text-lg font-medium"
              >
                My Products
              </NavLink>
            </div>

            <div className="products">
              <NavLink
                to="/dashboard/my-purchases"
                className="dashboard-title text-white rounded-md px-5 mt-4 text-lg font-medium"
              >
                My Purchases
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
