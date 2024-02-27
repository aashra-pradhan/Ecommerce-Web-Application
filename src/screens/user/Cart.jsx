import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import CartItem from "../../components/CartItem";
import { useContext } from "react";
import { CartContext } from "../../context/useCartContext";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const { products, clearCart } = useContext(CartContext);
  const accesstoken = JSON.parse(localStorage.getItem("access_token"));

  const userId = localStorage.getItem("userId");
  const baseUrl = "https://ecommerce-backend-gr3e.onrender.com/api";

  const url = `${baseUrl}/user-products/${userId}`;
  const config = {
    headers: { Authorization: "Bearer " + accesstoken },
    // not authorized to post bhanne error aairathyo, because accesstoken ta string ma liyrathyam loccal storage bata, because stringify garera store garirathyam local storge ma,,,,tara yaha ta json value mai chahincha bearer sanga so mathi access token lai json.parse garera yo problem solve bhayo
  };

  axios
    .get(url, config)
    .then((response) => {
      console.log(response.data, "dai");
    })
    .catch(function (error) {
      console.error(error);
      console.log("Error is recognized!");
    });

  console.log(products, "ama");
  return (
    <>
      <div className="cart-nav">
        <button className="rounded w-full border-slate-900 rounded-lg bg-green-100 cart-nav-button">
          My Cart
        </button>
        <NavLink to="/product/purchase">
          <button className="rounded w-full border-slate-900 rounded-lg bg-green-100 hover:cursor-pointer cart-nav-button">
            Buy all
          </button>
        </NavLink>
        <button
          className="rounded w-full border-slate-900 rounded-lg bg-green-100  hover:cursor-pointer cart-nav-button"
          onClick={() => clearCart()}
        >
          Remove all
        </button>
      </div>
      {products.map((item) => (
        <CartItem
          productId={item?._id}
          productImage={item?.productImages[0]?.url}
          productName={item?.name}
          buyingQuantity={item?.chosenQuantity}
          payingPrice={item?.totalPrice}
        />
      ))}
    </>
  );
};

export default Cart;

// user-products/userid
