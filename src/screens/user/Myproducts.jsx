import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card";
import apiRequest from "../../api/api_call";
const Myproducts = () => {
  const [myProducts, setMyProducts] = useState([]);
  const accesstoken = JSON.parse(localStorage.getItem("access_token"));

  const userId = localStorage.getItem("userId");
  const baseUrl = "https://ecommerce-backend-gr3e.onrender.com/api";

  const apiDetails = {
    urlEndpoint: `/user-products/${userId}`,
    requestMethod: "GET",
    authentication: true,
  };

  async function apiGet() {
    let getProducts = await apiRequest(apiDetails, null, null);
    setMyProducts(getProducts.data.data);
  }

  useEffect(() => {
    apiGet();
  }, []);

  return (
    <>
      {myProducts.length > 0 ? (
        <div className="container flex justify-center">
          <div className="grid grid-cols-4 gap-8">
            {myProducts.map((item) => (
              <Card
                key={item._id}
                link={`/product/detail/${item.userId}/${item._id}`}
                image={item.productImages[0]?.url}
                title={item.name}
                shortDescription={item.shortDescription}
                price={item.price}
              />
            ))}
          </div>
        </div>
      ) : (
        <h1>No products sold</h1>
      )}
    </>
  );
};

export default Myproducts;
