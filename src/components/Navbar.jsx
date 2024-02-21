import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, startingLetter }) => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      {!isLoggedIn ? (
        <div className="nav-container">
          <NavLink
            to="/login"
            className="text-white rounded-md px-3 py-2 text-sm font-medium"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="text-white rounded-md px-3 py-2 text-sm font-medium"
          >
            Sign Up
          </NavLink>
        </div>
      ) : (
        <>
          <div className="nav-container">
            <div className="dashboard">
              <NavLink
                to="/dashboard"
                className="dashboard-title text-white rounded-md px-3 py-2 text-lg font-medium"
              >
                Dashboard
              </NavLink>
            </div>
            <div className="profile">
              <NavLink
                to="/profile"
                className="profile-title text-white rounded-md px-3 py-2 text-lg font-medium"
              >
                Profile
              </NavLink>
            </div>
            <div className="logout">
              <button
                className="profile-title text-white rounded-md px-3 py-2 text-lg font-medium"
                onClick={() => {
                  alert("Logging out!");
                  localStorage.removeItem("_id");
                  localStorage.removeItem("fullName");
                  localStorage.removeItem("email");
                  localStorage.removeItem("access_token");
                  navigate(0); //page reload gardincha so aba public home page dekhaidincha, not private
                }}
              >
                Log Out
              </button>
            </div>
            <div className=" ini-profile flex bg-white h-8 w-8 rounded-full border-2 font-extrabold border-slate-900 items-center justify-center">
              <p className="text-xl"> {startingLetter}</p>
            </div>
            <button className=" cart-icon ini-profile flex  h-8 w-14 border-2 border-slate-900 bg-white font-extrabold rounded items-center justify-center">
              <p className="text-xl">
                <NavLink to="/cart" className="">
                  Cart
                </NavLink>

                {/* <ShoppingCartSimple size={32} /> */}
              </p>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
