import { useForm } from "react-hook-form";
import { object, string, number, date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { SchemaLogin } from "./user.schema";
import axios from "axios";
import Feedback from "../../components/Feedback";
import { useState } from "react";

function Login() {
  const [feedback, setFeedback] = useState({ success: false, message: "" });
  const {
    register,
    handleSubmit,
    onBlur,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaLogin),
  });

  const baseUrl = "https://ecommerce-backend-gr3e.onrender.com/api";
  console.log(feedback.message);

  const onSubmit = (formData) => {
    console.log(formData);
    const url = `${baseUrl}/auth/login`;
    const data = {
      email: formData.email,
      password: formData.password,
    };
    console.log(formData, "sss");
    axios
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setFeedback({
          success: true,
          message: "Successfully logged in!",
        });
        localStorage.setItem("email", data.email);
        localStorage.setItem(
          "access_token",
          JSON.stringify(response.data.data.data.access_token)
        );
        console.log(response.data.data.data.access_token, "ggg");

        // let localdata = localStorage.getItem("email");
      })
      .catch(function (error) {
        console.error(error);
        console.log("Error is recognized!");
        if (error.response) {
          setFeedback({ success: false, message: error.response.data.message });
        } else {
          setFeedback({
            success: false,
            message: "Network error!Try again in some time.",
          });
        }
      });
  };

  return (
    <>
      <div className="bg-orange-400	h-[650px] w-[800px] rounded-lg border-4 border-black">
        <p className="text-5xl p-5 font-thin text-slate-950 font-serif mb-8">
          Login form
        </p>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          {/* on form submission, react hook form ko euta built in method handleSubmit call garincha, ani tesle in turm onSubmit bhanne hamile banako funtion call gardincha, ani tyatai data bhanne object aaucha from the input fields after being registered. */}
          {/* ani also yo e.preventdefault haru garirakhnuparena on submission cause yo sabai reacthookform ko useForm le nai milaidincha, validation haru yup le milaidincha */}

          <div>
            <Input
              labelname={"Email"}
              type={"text"}
              register={register}
              errors={errors}
              onBlur={onBlur}
              name={"email"}
            />
          </div>
          <div>
            <Input
              labelname={"Password"}
              type={"password"}
              register={register}
              errors={errors}
              onBlur={onBlur}
              name={"password"}
            />
          </div>

          <div className="pt-8">
            <Button type={"submit"} value={"Login"} />
          </div>
        </form>

        <Feedback success={feedback.success} message={feedback.message} />
      </div>
    </>
  );
}

export default Login;
