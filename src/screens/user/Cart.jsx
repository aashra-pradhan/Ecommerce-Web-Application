import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import CartItem from "../../components/CartItem";
import { useContext } from "react";
import { CartContext } from "../../context/useCartContext";
import { NavLink } from "react-router-dom";
import Fallback from "../../components/Fallback";
import { Suspense, lazy } from "react";

const Cart = () => {
  const { products, clearCart } = useContext(CartContext);
  const CartItem = lazy(() => import("../../components/CartItem"));

  console.log(products, "ama");
  return (
    <>
      <div className="cart-nav">
        <div className="rounded w-full border-slate-900 rounded-lg bg-green-100 cart-nav-button h-[10px] flex items-center justify-center">
          <button>My Cart</button>
        </div>
        <div className="flex items-center justify-center">
          <NavLink
            to="/product/purchaseall"
            className="rounded w-full border-slate-900 rounded-lg bg-green-100 hover:cursor-pointer cart-nav-button h-[10px] flex items-center justify-center"
          >
            Buy all
          </NavLink>
        </div>
        <div className="rounded w-full border-slate-900 rounded-lg bg-green-100  hover:cursor-pointer cart-nav-button h-[10px] flex items-center justify-center">
          <button onClick={() => clearCart()}>Remove all</button>
        </div>
      </div>
      {products.length > 0 ? (
        products.map((item) => (
          <Suspense fallback={<Fallback />}>
            <CartItem
              key={item._id} // Don't forget to add a unique key prop when mapping components
              product={item}
            />
          </Suspense>
        ))
      ) : (
        <div className="flex items-center justify-center mt-10">
          <h1>No items added to cart!</h1>
        </div>
      )}
    </>
  );
};

export default Cart;

// user-products/userid
