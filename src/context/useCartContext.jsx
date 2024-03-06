import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const CartContext = createContext();
// createContext({ products, setProducts, addToCart }) esari chai context bhitra k k rakhecham bhanera specify garna milcha, nagarda ni huncha,
// kei asar pardaina.

// khali array initialize gareko for products ni tyo array bhitra chai objects aaucha, every product ko euta object.

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );
  const [activeProduct, setActiveProduct] = useState([]);
  const [productsBought, setProductsBought] = useState([]);

  const addToCart = (item) => {
    const isItemInCart = products.find((cartItem) => cartItem._id === item._id); // check if the item is already in the cart

    if (isItemInCart) {
      setProducts(
        products.map(
          (
            cartItem // if the item is already in the cart, increase the quantity of the item
          ) =>
            cartItem._id === item._id
              ? {
                  ...cartItem,
                  chosenQuantity: cartItem.chosenQuantity + item.chosenQuantity,
                }
              : cartItem // otherwise, return the cart item
        )
      );
    } else {
      setProducts([...products, item]);

      // setCartItems([...cartItems, { ...item, quantity: 1 }]); // if the item is not in the cart, add the item to the cart
    }
  };
  const clearCart = () => {
    setProducts([]); // set the cart items to an empty array
  };

  const removeFromCart = (productId) => {
    // const isItemInCart = products.find((cartItem) => cartItem._id === item._id);

    // if (isItemInCart.chosenQuantity === 1) {
    setProducts(products.filter((cartItem) => cartItem._id !== productId)); // if the quantity of the item is 1, remove the item from the cart
    // } else {
    //   setProducts(
    //     products.map((cartItem) =>
    //       cartItem._id === item._id
    //         ? { ...cartItem, chosenQuantity: cartItem.chosenQuantity - 1 } // if the quantity of the item is greater than 1, decrease the quantity of the item
    //         : cartItem
    //     )
    //   );
    // }
  };

  // Function to handle purchase
  const handlePurchase = (product) => {
    console.log("Products bought");
    setProductsBought([...productsBought, product]);
    removeFromCart(product._id);
  };
  const handlePurchaseAll = (product) => {
    clearCart();
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setProducts(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        products,
        setProducts,
        addToCart,
        clearCart,
        removeFromCart,
        activeProduct,
        setActiveProduct,
        productsBought,
        setProductsBought,
        handlePurchase,
        handlePurchaseAll
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// export default useCartContext;
