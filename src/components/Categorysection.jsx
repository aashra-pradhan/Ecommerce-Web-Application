import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import apiRequest from "../api/api_call";

const Categorysection = ({ categoryId, title }) => {
  // const [categoryid, setCategoryId] = useState("");
  const [productDetail, setProductDetail] = useState([]);
  const accesstoken = JSON.parse(localStorage.getItem("access_token"));
  const userId = localStorage.getItem("userId");

  const apiDetails = {
    urlEndpoint: `/products?categoryId=${categoryId}`,
    requestMethod: "GET",
    authentication: false,
  };

  // console.log(data, "sss");
  async function apiGet() {
    let getProducts = await apiRequest(apiDetails, null, null);
    //yo api_hit ma ki ta response aaucha ki ta error aaucha
    console.log(getProducts, "ttttt");
    //esari bhanda ni localstorage ma userDetails bhanera object nai banaidera yi details haru tyo object ko bhitra rakhdeko ramro practise
    //ani harek page ma aile hamile localstorage bata get gardai yiniharulai access gariracham ni
    //aba pachi context api(vimp concept) sikepachi, tyo details context api ma store garera pplication bhari use garna sakcham

    if (getProducts.status == 200) {
      const filteredData = getProducts.data.data.filter(
        (data) => data.userId != userId
      );

      setProductDetail(filteredData);
    }
  }

  useEffect(() => {
    apiGet();
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
