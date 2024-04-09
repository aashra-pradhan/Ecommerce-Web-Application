import React, { useContext } from "react";
import { CartContext } from "../context/useCartContext";
import { NavLink } from "react-router-dom";

const CartItem = ({ product }) => {
  const { products, removeFromCart, setActiveProduct } =
    useContext(CartContext);

  return (
    <>
      <div className="cart-item p-10">
        {/* <img src={product?.productImages[0]?.url} alt="productImage" /> */}
        <img
          src={`https://source.unsplash.com/250x180/?${product?.name}`}
          alt="productImage"
        />

        <br />
        <p className="cart-items font-medium">Name: {product?.name}</p>
        <br />
        <p className="cart-items font-medium">
          Quantity: {product?.chosenQuantity}
        </p>
        <br />
        <p className="cart-items font-medium">
          Total amount: Rs.{product?.totalPrice}
        </p>
        <br />
        <NavLink to="/product/purchase">
          <button
            className="rounded w-full border-slate-900 rounded-lg bg-green-100 mt-2 hover:cursor-pointer font-medium"
            onClick={() => {
              setActiveProduct([product]);
            }}
          >
            Buy now
          </button>
        </NavLink>
        <br />
        <button
          className="rounded w-full border-slate-900 rounded-lg bg-green-100 mt-2 hover:cursor-pointer font-medium"
          onClick={() => {
            removeFromCart(product?._id);
            console.log(product?._id, "okk");
          }} // Pass the filtered item to removeFromCart
        >
          Remove item
        </button>
      </div>
    </>
  );
};

export default CartItem;
