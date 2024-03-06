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

  console.log(products, "ama");
  return (
    <>
      <div className="cart-nav">
        <button className="rounded w-full border-slate-900 rounded-lg bg-green-100 cart-nav-button">
          My Cart
        </button>
        <NavLink to="/product/purchaseall">
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
          // productId={item?._id}
          // productImage={item?.productImages[0]?.url}
          // productName={item?.name}
          // buyingQuantity={item?.chosenQuantity}
          // payingPrice={item?.totalPrice}
          product={item}
        />
      ))}
    </>
  );
};

export default Cart;

// user-products/userid
