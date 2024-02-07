import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {
  return (
    <>
      <div>
        <nav class="bg-orange-400">
          <div class="mx-6 max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="relative flex flex-row flex h-16 items-center justify-between">
              <div class="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
              {!isLoggedIn ? (
                <>
                  <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <NavLink
                      to="/login"
                      className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Login
                    </NavLink>
                    {/* <!-- Profile dropdown --> */}
                    <div class="relative ml-3">
                      <NavLink
                        to="/signup"
                        className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                      >
                        Sign Up
                      </NavLink>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-white" h-2 w-2 rounded-lg>
                    A
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
