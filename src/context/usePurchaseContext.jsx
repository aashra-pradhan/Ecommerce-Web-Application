import { createContext } from "react";
import { useState, useEffect } from "react";
export const PurchaseContext = createContext();

export const PurchaseProvider = ({ children }) => {
  const [purchasedProducts, setPurchasedProducts] = useState(
    localStorage.getItem("purchasedItems")
      ? JSON.parse(localStorage.getItem("purchasedItems"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("purchasedItems", JSON.stringify(purchasedProducts));
  }, [purchasedProducts]);

  useEffect(() => {
    const purchasedItems = JSON.parse(localStorage.getItem("purchasedItems"));
    if (purchasedItems) {
      setPurchasedProducts(purchasedItems);
    }
  }, []);

  return (
    <PurchaseContext.Provider
      value={{
        purchasedProducts,
        setPurchasedProducts,
      }}
    >
      {children}
    </PurchaseContext.Provider>
  );
};
