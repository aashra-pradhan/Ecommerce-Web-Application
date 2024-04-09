import { useForm } from "react-hook-form";
import { object, string, number, date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { SchemaSignUp } from "./user.schema";
import axios from "axios";
import Feedback from "../../components/Feedback";
import { useState } from "react";
import { FeedbackContext } from "../../context/useFeedbackContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { feedback, setFeedback } = useContext(FeedbackContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    onBlur,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaSignUp),
  });
  {
    /* To use Yup, you first need to install it with
       npm: npm install yup
Once Yup is installed, you can start creating your validation schema. 
A validation schema is an object that defines the rules for validating the data in your form. */
  }

  const baseUrl = "https://ecommerce-backend-gr3e.onrender.com/api";
  console.log(feedback);

  const onSubmit = (formData) => {
    console.log(formData);
    const url = `${baseUrl}/auth/signup-user`;
    const data = {
      fullName: formData.fullName,
      email: formData.email,
      mobileNum: formData.mobileNum,
      password: formData.password,
    };
    console.log(formData, "sss");
    // yaha kina async await use garna milena, ani .then ra .catch nai garnuparyo because error gatch garena yo case ma
    // try catch ma, cause try garyo await wala part, bhayen, catch nai garena, dai haru explained, bujha, yaad gara
    axios
      .post(url, data)
      .then((response) => {
        console.log(response.data);
        setFeedback({
          success: true,
          message:
            "You have successfully registered your account! Now you can login and start using the app.",
        });
        navigate("/login");
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
      <div className="flex items-center justify-center mt-10">
        <div className="bg-orange-400	h-[650px] w-[800px] rounded-lg p-5">
          <p className="text-5xl p-5 font-thin text-slate-950 font-serif mb-8">
            Signup form
          </p>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* on form submission, react hook form ko euta built in method handleSubmit call garincha, ani tesle in turm onSubmit bhanne hamile banako funtion call gardincha, ani tyatai data bhanne object aaucha from the input fields after being registered. */}
            {/* ani also yo e.preventdefault haru garirakhnuparena on submission cause yo sabai reacthookform ko useForm le nai milaidincha, validation haru yup le milaidincha */}
            <div>
              <Input
                labelname={"Fullname"}
                type={"text"}
                register={register}
                errors={errors}
                onBlur={onBlur}
                name={"fullName"}
              />
            </div>
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
            <div>
              <Input
                labelname={"Contactno"}
                type={"text"}
                register={register}
                errors={errors}
                onBlur={onBlur}
                name={"mobileNum"}
              />
            </div>

            <div>
              <input type="checkbox" className="mt-8" />
              <label
                className="inline text-thin font-serif text-slate-950"
                htmlFor=""
              >
                I agree to all the privacy terms and conditions
              </label>
            </div>

            <div>
              <Button type={"submit"} value={"Submit"} />
            </div>
          </form>

          <Feedback success={feedback.success} message={feedback.message} />
        </div>
      </div>
    </>
  );
}

export default SignUp;
