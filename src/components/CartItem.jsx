import React from "react";

const CartItem = ({
  productImage,
  productName,
  buyingQuantity,
  payingPrice,
}) => {
  return (
    <>
      <div className="cart-item">{productName}</div>
    </>
  );
};

export default CartItem;
