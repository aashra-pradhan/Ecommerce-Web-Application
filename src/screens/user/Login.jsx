import { useForm } from "react-hook-form";
import { object, string, number, date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { SchemaLogin } from "./user.schema";
import axios from "axios";
import Feedback from "../../components/Feedback";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PurchaseContext } from "../../context/usePurchaseContext";
import apiRequest from "../../api/api_call";
import { toast } from "react-toastify";

//default export ho ni ta so {} ma halnupardaina, named export bhako bhaye chai halnuparthyo {} ma
function Login() {
  // const [feedback, setFeedback] = useState({ success: false, message: "" });
  const { purchasedProducts, setPurchasedProducts } =
    useContext(PurchaseContext);

  const {
    register,
    handleSubmit,
    onBlur,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaLogin),
  });

  // const baseUrl = "https://ecommerce-backend-gr3e.onrender.com/api";
  // console.log(feedback.message);

  const navigate = useNavigate();
  const apiDetails = {
    urlEndpoint: "/auth/login",
    requestMethod: "POST",
    authentication: false,
  };

  const onSubmit = async (formData) => {
    // const url = `${baseUrl}/auth/login`;
    const reqData = {
      email: formData.email,
      password: formData.password,
    };
    // console.log(data, "sss");

    let data1 = await apiRequest(apiDetails, reqData, null);
    //yo api_hit ma ki ta response aaucha ki ta error aaucha

    //esari bhanda ni localstorage ma userDetails bhanera object nai banaidera yi details haru tyo object ko bhitra rakhdeko ramro practise
    //ani harek page ma aile hamile localstorage bata get gardai yiniharulai access gariracham ni
    //aba pachi context api(vimp concept) sikepachi, tyo details context api ma store garera application bhari use garna sakcham

    if (data1.status === 200 || data1.status === 201) {
      toast.success(data1.data.message);
      localStorage.setItem("email", data1.data.data.data.email);
      localStorage.setItem("fullName", data1.data.data.data.fullName);
      localStorage.setItem("userId", data1.data.data.data._id);
      localStorage.setItem(
        "access_token",
        JSON.stringify(data1.data.data.data.access_token)
      );
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(data1.data.data.data.refresh_token)
      );

      localStorage.setItem(
        "purchasedItems",
        JSON.stringify(data1.data.data.data.purchasedProducts)
      );

      navigate("/"); //home bhanekai / ho, so home ma redirect gardincha ani navigate(0) le reload garaidincha so aba private home page dekhcha not public home page
      navigate(0);
    }

    // khasma navigate ya redirect bhanne kura j use garne tarika ni tei ho kam hune ni tei ho, kei differences chai hola but aile ko lai tei ho bujha

    let localdata = localStorage.getItem("email");
  };

  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <div className="bg-orange-400	h-[650px] w-[800px] rounded-lg p-5">
          <p className="text-5xl p-5 font-thin text-slate-950 font-serif mb-8">
            Login form
          </p>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
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

          {/* <Feedback success={feedback.success} message={feedback.message} /> */}
        </div>
      </div>
      {/* {api_hit.data.status === 200
        ? toast.success("Login success!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            // transition: Bounce,
          })
        : null} */}
    </>
  );
}

export default Login;
