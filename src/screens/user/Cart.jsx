import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import CartItem from "../../components/CartItem";
import { useContext } from "react";
import { CartContext } from "../../context/useCartContext";

const Cart = () => {
  const { products, setProducts } = useContext(CartContext);
  const accesstoken = localStorage.getItem("access_token");
  const name = localStorage.getItem("fullName");
  const initial = name ? name.charAt(0) : ""; //Use ternary operator to conditionally assign initial
  const userId = localStorage.getItem("userId");
  return (
    <>
      <div className="cart-nav">My Cart</div>
      <CartItem
        // productImage={products?.productImages[0]?.url}
        productName={products.name}
        buyingQuantity={products.chosenQuantity}
        payingPrice={products.totalPrice}
      />
      {/* <div className="cart-item"></div> */}
    </>
  );
};

export default Cart;
