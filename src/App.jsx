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

function App() {
  const accesstoken = localStorage.getItem("access_token");
  console.log(accesstoken, "access");
  // Creating a parent component that wraps child components with a Provider

  return (
    <>
      <PurchaseProvider>
        <CartProvider>{!accesstoken ? <Public /> : <Private />}</CartProvider>
      </PurchaseProvider>
    </>
  );
}

export default App;
// Creating a parent component that wraps child components with a Provider
