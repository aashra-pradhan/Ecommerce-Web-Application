import React, { useContext } from "react";
import { CartContext } from "../context/useCartContext";
import { NavLink } from "react-router-dom";

const CartItem = ({
  productId,
  productName,
  buyingQuantity,
  payingPrice,
  productImage,
}) => {
  const { products, removeFromCart } = useContext(CartContext);

  return (
    <>
      <div className="cart-item">
        <img src={productImage} alt="productImage" />
        <br />
        <p className="cart-items">{productName}</p>
        <br />
        <p className="cart-items">{buyingQuantity}</p>
        <br />
        <p className="cart-items">{payingPrice}</p>
        <br />
        <NavLink to="/product/purchase">
          <button className="rounded w-full border-slate-900 rounded-lg bg-green-100 mt-2 hover:cursor-pointer">
            Buy now
          </button>
        </NavLink>
        <br />
        <button
          className="rounded w-full border-slate-900 rounded-lg bg-green-100 mt-2 hover:cursor-pointer"
          onClick={() => removeFromCart(productId)} // Pass the filtered item to removeFromCart
        >
          Remove item
        </button>
      </div>
    </>
  );
};

export default CartItem;
