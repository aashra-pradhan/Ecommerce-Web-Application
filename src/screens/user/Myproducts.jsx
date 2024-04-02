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
      <div className="container mx-auto my-12">
        <div className="grid grid-cols-4  gap-8">
          {myProducts.map((item) => {
            // esari { } bhitra map garda (i.e., when mapping inside return statement, jsx) jaile return rakhnuparcha hai anij display garaune ho, tyo return bhitra lekhne ho
            return (
              <>
                <Card
                  // route deko ani card lai yei route le wrap garecham uta
                  link={`/product/detail/${item.userId}/${item._id}`}
                  // link="/product"
                  image={item.productImages[0]?.url}
                  // optional chaining, productimages aako cha bahne chai ur leu,,,sable pic nahalna ni sakcha ni
                  title={item.name}
                  shortDescription={item.shortDescription}
                  price={item.price}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Myproducts;
