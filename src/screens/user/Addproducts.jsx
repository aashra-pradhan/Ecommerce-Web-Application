import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { object, string, number, date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { SchemaAddProducts } from "./user.schema";
import axios from "axios";
import Feedback from "../../components/Feedback";

const Addproducts = () => {
  const [feedback, setFeedback] = useState({ success: false, message: "" });
  const [categories, setCategories] = useState([]);

  const baseUrl = "https://ecommerce-backend-gr3e.onrender.com/api";
  const accesstoken = JSON.parse(localStorage.getItem("access_token"));

  const userId = localStorage.getItem("userId");

  const getCategory = async () => {
    try {
      const response = await axios.get(`${baseUrl}/categories`);
      setCategories(response.data.data);
      // setSelectedCategory(response.data.data[0]._id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    watch,

    formState: { errors },
  } = useForm({
    // defaultValues: {productData ? productData : initialData},
    resolver: yupResolver(SchemaAddProducts),
  });

  const onSubmit = async (data) => {
    console.log(data);
    const url = `${baseUrl}/add-product`;
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("name", data.name);
    formData.append("quantity", data.quantity);
    formData.append("category", data.category);
    formData.append("price", data.price);

    // A file <input> element
    const images = document.getElementsByName("images")[0]; // Get the first element in the collection
    formData.append("productImages", images.files[0]);

    //image pathaunuparyo bhane esari formData.append batai pathaunuparcha aba, simply object banayera mildaina okk, ani last ma tyo
    //fomData bhanne kura lai nai pathaidine
    //eta formData is not a variable hai, it is a concept bro

    formData.append("description", data.description);
    formData.append("shortDescription", data.shortDescription);
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
          message: "Successfully product added!",
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
          Add Products
        </p>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              labelname={"Product Name"}
              type={"text"}
              register={register}
              errors={errors}
              name={"name"}
            />
          </div>
          <div>
            <Input
              labelname={"Quantity"}
              type={"text"}
              register={register}
              errors={errors}
              name={"quantity"}
            />
          </div>
          <div>
            <label
              className="block text-xl font-serif text-slate-950"
              htmlFor=""
            >
              Category
            </label>
            <select
              {...register("category", { value: "647325e5ac7ba75355db8097" })}
              name="category"
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Input
              labelname={"Price"}
              type={"text"}
              register={register}
              errors={errors}
              name={"price"}
            />
          </div>
          <div>
            <Input
              labelname={"Product Images"}
              type={"file"}
              register={register}
              errors={errors}
              name={"images"}
            />
          </div>
          <div>
            <Input
              labelname={"Description"}
              type={"text"}
              register={register}
              errors={errors}
              name={"description"}
            />
          </div>
          <div>
            <Input
              labelname={"Short Description"}
              type={"text"}
              register={register}
              errors={errors}
              name={"shortDescription"}
            />
          </div>
          <div className="pt-8">
            <Button type={"submit"} value={"Add Product"} />
          </div>
        </form>
        <Feedback success={feedback.success} message={feedback.message} />
      </div>
    </>
  );
};

export default Addproducts;

// //
// name;
// quantity;
// price;

// get by id

const initialData = {
  name: "hello",
  quantity: "",
  price: "",
};
