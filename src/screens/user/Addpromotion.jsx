import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import Feedback from "../../components/Feedback";

const Addpromotion = () => {
  const [feedback, setFeedback] = useState({ success: false, message: "" });

  const baseUrl = "https://ecommerce-backend-gr3e.onrender.com/api";
  const accesstoken = JSON.parse(localStorage.getItem("access_token"));

  //   const userId = localStorage.getItem("userId");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // defaultValues: {productData ? productData : initialData},
    // resolver: yupResolver(SchemaAddProducts),
  });

  const onSubmit = async (data) => {
    console.log(data);
    const url = `${baseUrl}/create-promotion`;
    const formData = new FormData();
    formData.append("bannerName", data.bannerName);
    formData.append("validTill", data.validTill);

    // A file <input> element
    const images = document.getElementsByName("bannerImage")[0]; // Get the first element in the collection
    formData.append("bannerImage", images.files[0]);

    // "Bearer token" header object, axios bata pathau, to add product , for authorization

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
          message: "Successfully banner added!",
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
      <div className="addProducts-form">
        <p className="text-5xl p-5 font-thin text-slate-950 font-serif mb-8">
          Add Promo Banner
        </p>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              labelname={"Banner Name"}
              type={"text"}
              register={register}
              errors={errors}
              name={"bannerName"}
            />
          </div>
          <div>
            <Input
              labelname={"Banner Image"}
              type={"file"}
              register={register}
              errors={errors}
              name={"bannerImage"}
            />
          </div>
          <div>
            <Input
              labelname={"Valid till"}
              type={"date"}
              register={register}
              errors={errors}
              name={"validTill"}
            />
          </div>
          <div className="pt-8">
            <Button type={"submit"} value={"Add Banner"} />
          </div>
        </form>
        <Feedback success={feedback.success} message={feedback.message} />
      </div>
    </>
  );
};

export default Addpromotion;
