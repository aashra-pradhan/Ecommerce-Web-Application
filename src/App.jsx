import { useForm } from "react-hook-form";
import "./App.css";
import SignUp from "./screens/user/SignUp";
import Login from "./screens/user/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Public from "./routes/Public"; // Import Public component
import Private from "./routes/Private"; // Import Private component
import Privpage from "./screens/user/Privpage";
import Home from "./screens/user/Home";

function App() {
  const accesstoken = localStorage.getItem("access_token");
  console.log(accesstoken, "access");

  return <>{!accesstoken ? <Public /> : <Private />}</>;
}

export default App;
