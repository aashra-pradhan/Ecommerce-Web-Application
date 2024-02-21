import React, { useState } from "react";
import { createContext } from "react";

export const CartContext = createContext({ products, setProducts, addToCart });
// khali array initialize gareko for products ni tyo array bhitra chai objects aaucha, every product ko euta object.

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  console.log(products, "products");

  const addToCart = (item) => {
    console.log(item, "item");
    // const current = [...products];
    // current.push(item);
    setProducts([item, ...products]);
    //do something
  };
  return (
    <CartContext.Provider value={{ products, setProducts, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// export default useCartContext;
