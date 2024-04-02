import { useForm } from "react-hook-form";
import "./App.css";
import SignUp from "./screens/user/SignUp";
import Login from "./screens/user/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Public from "./routes/Public"; // Import Public component
import Private from "./routes/Private"; // Import Private component
import Home from "./screens/user/Home";
import { useState, React } from "react";
import { CartProvider } from "./context/useCartContext";
import { PurchaseProvider } from "./context/usePurchaseContext";
import { FeedbackProvider } from "./context/useFeedbackContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
function App() {
  const accesstoken = JSON.parse(localStorage.getItem("access_token"));
  const refreshToken = JSON.parse(localStorage.getItem("refresh_token"));
  const email = localStorage.getItem("email");
  const baseUrl = "https://ecommerce-backend-gr3e.onrender.com/api";
  console.log(accesstoken, "access");
  // Creating a parent component that wraps child components with a Provider

  //eu
  const handleRefreshToken = async () => {
    const resbody = {
      email: email,
      refresh_token: refreshToken,
    };
    const res = await axios.post(`${baseUrl}/auth/refresh-token`, resbody);
    console.log(res.data.data.access_token, "heeeee");

    return res.data.data.access_token; // Return the new access token
    // When using async/await within an interceptor, you need to ensure that the interceptor returns a Promise.
  };

  // axios interceptor for refresh token refetch
  axios.interceptors.response.use(
    (res) => res,
    async (error) => {
      console.log(error.response.status, "errorkk");
      // debugger;
      if (error.response.status === 401) {
        const newToken = await handleRefreshToken();
        console.log(error.config, "config");
        console.log(newToken, "newwwwwwwww");
        localStorage.setItem("access_token", JSON.stringify(newToken));
        return axios({ ...error.config, newToken });
      }
      return Promise.reject(error);
    }
  );
  return (
    <>
      <PurchaseProvider>
        <CartProvider>
          <FeedbackProvider>
            {!accesstoken ? <Public /> : <Private />}
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            {/* ToastContainer: This container wraps our toast pop-ups. Without it, the toast pop-ups won’t be displayed. */}
          </FeedbackProvider>
        </CartProvider>
      </PurchaseProvider>
    </>
  );
}

export default App;
// Creating a parent component that wraps child components with a Provider
