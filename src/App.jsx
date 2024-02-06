import { useForm } from "react-hook-form";
import "./App.css";
import SignUp from "./screens/user/SignUp";

function App() {
  const { register, handleSubmit } = useForm();

  return (
    <>
      <SignUp />
      {/* To use Yup, you first need to install it with
       npm: npm install yup
Once Yup is installed, you can start creating your validation schema. 
A validation schema is an object that defines the rules for validating the data in your form. */}
    </>
  );
}

export default App;
