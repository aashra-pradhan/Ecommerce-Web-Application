import { createContext } from "react";
import { useState, useEffect } from "react";

export const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState({ success: false, message: "" });

  //   useEffect(() => {
  //     const purchasedItems = JSON.parse(localStorage.getItem("purchasedItems"));
  //     if (purchasedItems) {
  //       setPurchasedProducts(purchasedItems);
  //     }
  //   }, []);

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        setFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
