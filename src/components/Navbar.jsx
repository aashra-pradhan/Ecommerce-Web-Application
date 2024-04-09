import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiRequest from "../api/api_call";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Bell, ShoppingCartSimple } from "@phosphor-icons/react";
import { ShoppingCart } from "@phosphor-icons/react/dist/ssr";
import { toast } from "react-toastify";
// import phosp
const Navbar = ({ isLoggedIn, startingLetter }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const productSearchName = searchParams.get("productName");
  // yo search params le chaii http://localhost:5173/products?productName=ultimate%20post esto url bata kewal search params liyera aaaucha , search params bhaneko chai ?productName=ultimate%20post ko ?productName= pachi ko kura ho
  const [productDetail, setProductDetail] = useState([]);
  const userId = localStorage.getItem("userId");
  const apiDetails = {
    urlEndpoint: `/products`,
    requestMethod: "GET",
    authentication: false,
  };
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [isNotiOpen, setIsNotiOpen] = useState(false);

  // console.log(data, "sss");
  async function apiGet() {
    let getProducts = await apiRequest(apiDetails, null, null);
    //yo api_hit ma ki ta response aaucha ki ta error aaucha
    console.log(getProducts, "qwerty");
    //esari bhanda ni localstorage ma userDetails bhanera object nai banaidera yi details haru tyo object ko bhitra rakhdeko ramro practise
    //ani harek page ma aile hamile localstorage bata get gardai yiniharulai access gariracham ni
    //aba pachi context api(vimp concept) sikepachi, tyo details context api ma store garera pplication bhari use garna sakcham

    if (getProducts.status == 200) {
      const filteredData = getProducts.data.data.filter(
        (data) => data.userId != userId
      );

      setProductDetail(filteredData);
      console.log(productDetail, "hf");
    }
  }
  useEffect(() => {
    apiGet();
  }, []);
  return (
    <>
      {!isLoggedIn ? (
        <div className="h-[58px] w-full bg-orange-500	 flex items-center px-6">
          <NavLink to="/login" className="text-white text-lg font-medium">
            Login
          </NavLink>
          <NavLink to="/signup" className="text-white text-lg font-medium ml-6">
            Sign Up
          </NavLink>
          <div className="ml-[100px]">
            <input
              type="text"
              placeholder="Search products you want"
              className="searchbar-input"
              defaultValue={productSearchName}
              onChange={(e) => {
                setSearch(e.target.value);
                setInput(e.target.value);
              }}
            />
            <button
              type="button" // Specify type="button" to prevent the button from submitting a form
              className="search-button"
              onClick={() => {
                navigate(`/products?productName=${search}`);
                navigate(0);
              }}
            >
              Search
            </button>

            {input ? (
              <div className="suggestion-dropdown2">
                {productDetail
                  .filter((pro) =>
                    pro.name.toLowerCase().startsWith(search.toLowerCase())
                  )
                  ?.map((item) => (
                    <div
                      className="suggestion-item"
                      onClick={() => {
                        setInput("");
                        navigate(`/products?productName=${item.name}`);
                        navigate(0);
                        setSearch(item.name);
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="h-[58px] w-full bg-orange-500 flex items-center px-6">
            <NavLink to="/dashboard" className="text-white text-lg font-medium">
              Dashboard
            </NavLink>
            {/* <div className="profile">
              <NavLink to="/profile" className="text-white text-lg font-medium">
                Profile
              </NavLink>
            </div> */}
            <div
              className="text-white text-lg font-medium ml-8 cursor-pointer"
              onClick={() => {
                toast.success("Logging out!");
                localStorage.removeItem("userId");
                localStorage.removeItem("fullName");
                localStorage.removeItem("email");
                localStorage.removeItem("access_token");
                localStorage.removeItem("purchasedItems");

                localStorage.removeItem("refresh_token");
                navigate(0); //page reload gardincha so aba public home page dekhaidincha, not private
              }}
            >
              LogOut
            </div>
            <div className="ml-[100px]">
              <input
                type="text"
                placeholder="Search anything"
                className="searchbar-input"
                defaultValue={productSearchName}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setInput(e.target.value);
                }}
              />
              <button
                type="button" // Specify type="button" to prevent the button from submitting a form
                className="search-button"
                onClick={() => {
                  navigate(`/products?productName=${search}`);
                  navigate(0);
                }}
              >
                Search
              </button>

              {input ? (
                <div className="suggestion-dropdown">
                  {productDetail
                    .filter((pro) =>
                      pro.name.toLowerCase().startsWith(search.toLowerCase())
                    )
                    ?.map((item) => (
                      <div
                        className="suggestion-item"
                        onClick={() => {
                          setInput("");
                          navigate(`/products?productName=${item.name}`);
                          navigate(0);
                          setSearch(item.name);
                        }}
                      >
                        {item.name}
                      </div>
                    ))}
                </div>
              ) : (
                ""
              )}
            </div>

            {/* <div className=" ini-profile flex bg-white h-8 w-8 rounded-full border-2 font-extrabold border-slate-900 items-center justify-center">
              <p className="text-xl"> {startingLetter}</p>
            </div> */}
            <div
              className="flex h-8 w-8 rounded-full border-2border-slate-900 items-center justify-center ml-10 cursor-pointer"
              onClick={() => {
                setIsNotiOpen(true);
              }}
            >
              <Bell size={32} fill="white" />
            </div>
            {isNotiOpen ? (
              <>
                <div className="Notification-container">
                  <div className="header-Noti">
                    <p>Notifications</p>
                    <div
                      className="x-close-noti"
                      onClick={() => {
                        setIsNotiOpen(false);
                      }}
                    >
                      <p>x</p>
                    </div>
                  </div>
                  <div className="notifs-container">
                    <div className="each-noti">Working on this feature!</div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            <button className=" flex h-8 w-8 rounded-md  border-2border-slate-900 items-center justify-center ml-6 cursor-pointer">
              <p className="text-xl">
                <NavLink to="/cart" className="">
                  <ShoppingCartSimple size={32} fill="white" />
                </NavLink>
              </p>
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
