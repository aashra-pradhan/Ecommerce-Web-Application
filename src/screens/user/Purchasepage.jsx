import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { object, string, number, date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { SchemaPurchase } from "./user.schema";
import axios from "axios";
import Feedback from "../../components/Feedback";
import Navbar from "../../components/Navbar";
import { CartContext } from "../../context/useCartContext";
import { PurchaseContext } from "../../context/usePurchaseContext";
import { FeedbackContext } from "../../context/useFeedbackContext";
import { toast } from "react-toastify";

const Purchasepage = () => {
  const { products, activeProduct, handlePurchase } = useContext(CartContext);
  const { purchasedProducts, setPurchasedProducts } =
    useContext(PurchaseContext);
  const { feedback, setFeedback } = useContext(FeedbackContext);
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

  const onSubmit = async (formData) => {
    console.log(formData);
    const url = `${baseUrl}/purchase-products`;
    // buyingProduct==="One"?const data = {
    //   customerId: userId,
    //   quantity: products.chosenQuantity,
    //   products: products,
    // };
    const data = {
      customerId: userId,
      quantity: 1,
      products: activeProduct,
    };

    const config = {
      headers: { Authorization: "Bearer " + accesstoken },
      // not authorized to post bhanne error aairathyo, because accesstoken ta string ma liyrathyam loccal storage bata, because stringify garera store garirathyam local storge ma,,,,tara yaha ta json value mai chahincha bearer sanga so mathi access token lai json.parse garera yo problem solve bhayo
    };

    axios
      .post(url, data, config)
      .then((response) => {
        console.log(response.data);
        if (response.data.status == 200 || response.data.status == 201) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
        setPurchasedProducts([...purchasedProducts, data.products]);
        //buy api hit bhaye pachi my purchases lai immediately dekhauna, natra login wala api ma mara aairahuncha ni ta purchased products
        handlePurchase(activeProduct[0]);
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
      <div className="flex justify-center mt-8">
        <div className="addProducts-form">
          <p className="text-5xl p-5 font-thin text-slate-950 font-serif mb-8">
            Buy Product
          </p>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
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
            {/* <div>
            <label
              className="block text-xl font-serif text-slate-950"
              htmlFor=""
            >
              Purchase
            </label>
            <select {...register("buyingProduct")} name="buyingProduct">
              <option value="One">Buy only this product </option>
              <option value="All">Buy all products in cart </option>
            </select>
          </div> */}

            <div className="pt-8">
              <Button type={"submit"} value={"Buy"} />
            </div>
          </form>
          {/* <Feedback success={feedback.success} message={feedback.message} /> */}
        </div>
      </div>
    </>
  );
};

export default Purchasepage;
