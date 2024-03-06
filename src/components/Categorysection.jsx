import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

const Categorysection = ({ categoryId, title }) => {
  // const [categoryid, setCategoryId] = useState("");
  const [productDetail, setProductDetail] = useState([]);
  const accesstoken = JSON.parse(localStorage.getItem("access_token"));
  const userId = localStorage.getItem("userId");

  const baseUrl = "https://ecommerce-backend-gr3e.onrender.com/api";

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/products?categoryId=${categoryId}`
      );

      const filteredData = response.data.data.filter(
        (data) => data.userId != userId
      );

      setProductDetail(filteredData);
      console.log(response.data.data, "provv");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [categoryId]);

  return (
    <>
      {productDetail.length ? (
        <>
          <h1 className="category-title">{title}</h1>
          <div className="container mx-auto my-12">
            <div className="grid grid-cols-4  gap-8">
              {productDetail.map(
                (pro) =>
                  userId !== pro.userId && (
                    <Card
                      title={pro.name}
                      link={`product/detail/${pro.userId}/${pro._id}`}
                      image={pro.productImages[0]?.url}
                      shortDescription={pro.shortDescription}
                      price={pro.price}
                    />
                  )
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Categorysection;
