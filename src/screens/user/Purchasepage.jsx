import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { object, string, number, date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { SchemaPurchase } from "./user.schema";
import axios from "axios";
import Feedback from "../../components/Feedback";
import Navbar from "../../components/Navbar";

const Purchasepage = () => {
  const [feedback, setFeedback] = useState({ success: false, message: "" });
  const accesstoken = JSON.parse(localStorage.getItem("access_token"));
  const name = localStorage.getItem("fullName");
  const initial = name ? name.charAt(0) : ""; //Use ternary operator to conditionally assign initial
  const userId = localStorage.getItem("userId");

  const baseUrl = "https://ecommerce-backend-gr3e.onrender.com/api";

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaPurchase),
  });

  const onSubmit = async (data) => {
    console.log(data);
    const url = `${baseUrl}/purchase-products`;

    // eta kei image input testo kei chaina so normally garda ni hunthyo formData use gare bina, but just gardeko
    const formData = new FormData();
    // formData.append("nameOnCard", data.nameOnCard);
    // formData.append("cardNum", data.cardNum);
    // formData.append("expDate", data.expDate);
    // formData.append("securityCode", data.securityCode);
    // formData.append("zipCode", data.zipCode);
    formData.append("customerId", userId);
    formData.append("quantity", data.zipCode);
    formData.append("products", data.zipCode);

    const config = {
      headers: { Authorization: "Bearer " + accesstoken },
      // not authorized to post bhanne error aairathyo, because accesstoken ta string ma liyrathyam loccal storage bata, because stringify garera store garirathyam local storge ma,,,,tara yaha ta json value mai chahincha bearer sanga so mathi access token lai json.parse garera yo problem solve bhayo
    };

    axios
      .post(url, formData, config)
      .then((response) => {
        console.log(response.data);
        setFeedback({
          success: true,
          message: "Product purchased!",
        });
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
      {accesstoken ? (
        <Navbar isLoggedIn={true} startingLetter={initial} />
      ) : (
        <Navbar isLoggedIn={false} startingLetter={""} />
      )}
      <div className="addProducts-form">
        <p className="text-5xl p-5 font-thin text-slate-950 font-serif mb-8">
          Buy Product
        </p>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              labelname={"Name on Card"}
              type={"text"}
              register={register}
              errors={errors}
              name={"nameOnCard"}
            />
          </div>
          <div>
            <Input
              labelname={"Card Number"}
              type={"text"}
              register={register}
              errors={errors}
              name={"cardNum"}
            />
          </div>
          <div>
            <Input
              labelname={"Expiry Date"}
              type={"text"}
              register={register}
              errors={errors}
              name={"expDate"}
            />
          </div>
          <div>
            <Input
              labelname={"Security Code"}
              type={"text"}
              register={register}
              errors={errors}
              name={"securityCode"}
            />
          </div>
          <div>
            <Input
              labelname={"Zip Code"}
              type={"text"}
              register={register}
              errors={errors}
              name={"zipCode"}
            />
          </div>
          <div className="pt-8">
            <Button type={"submit"} value={"Buy"} />
          </div>
        </form>
        <Feedback success={feedback.success} message={feedback.message} />
      </div>
    </>
  );
};

export default Purchasepage;
