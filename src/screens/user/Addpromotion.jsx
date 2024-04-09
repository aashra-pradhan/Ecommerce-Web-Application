import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";
import Feedback from "../../components/Feedback";
import { FeedbackContext } from "../../context/useFeedbackContext";
import { useContext } from "react";
import apiRequest from "../../api/api_call";
import { ToastContainer, toast } from "react-toastify";

const Addpromotion = () => {
  const { feedback, setFeedback } = useContext(FeedbackContext);

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
    console.log(data, "daa");
    // const url = `${baseUrl}/create-promotion`;
    const formData = new FormData();
    formData.append("bannerName", data.bannerName);
    formData.append("validTill", data.validTill);

    // A file <input> element
    for (let i = 0; i < data.bannerImage.length; i++) {
      formData.append("bannerImage", data.bannerImage[i]);
    }

    // "Bearer token" header object, axios bata pathau, to add product , for authorization

    // const config = {
    //   headers: { Authorization: "Bearer " + accesstoken },
    //   // not authorized to post bhanne error aairathyo, because accesstoken ta string ma liyrathyam loccal storage bata, because stringify garera store garirathyam local storge ma,,,,tara yaha ta json value mai chahincha bearer sanga so mathi access token lai json.parse garera yo problem solve bhayo
    // };
    const apiDetails = {
      urlEndpoint: "/create-promotion",
      requestMethod: "POST",
      reqBodyType: "FORM-DATA",
      authentication: true,
    };

    const reqData = formData;
    // console.log(data, "sss");

    let data1 = await apiRequest(apiDetails, reqData, null);
    //yo api_hit ma ki ta response aaucha ki ta error aaucha

    //esari bhanda ni localstorage ma userDetails bhanera object nai banaidera yi details haru tyo object ko bhitra rakhdeko ramro practise
    //ani harek page ma aile hamile localstorage bata get gardai yiniharulai access gariracham ni
    //aba pachi context api(vimp concept) sikepachi, tyo details context api ma store garera pplication bhari use garna sakcham

    console.log(data1, "check12");

    if (data1.data.status == 200 || data1.data.status == 201) {
      toast.success(data1.data.message);
    } else {
      toast.error(data1.data.message);
    }
  };

  //   axios
  //     .post(url, formData, config)
  //     .then((response) => {
  //       console.log(response.data);
  //       setFeedback({
  //         success: true,
  //         message: "Successfully banner added!",
  //       });
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //       console.log("Error is recognized!");
  //       if (error.response) {
  //         setFeedback({ success: false, message: error.response.data.message });
  //       } else {
  //         setFeedback({
  //           success: false,
  //           message: "Network error!Try again in some time.",
  //         });
  //       }
  //     });
  // };

  return (
    <>
      <div className="addPromo-form">
        <p className="text-5xl p-5 font-thin text-slate-950 font-serif mb-8">
          Add Promo Banner
        </p>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
          // enctype="multipart/form-data"
        >
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
        {/* <Feedback success={feedback.success} message={feedback.message} /> */}
      </div>
    </>
  );
};

export default Addpromotion;
