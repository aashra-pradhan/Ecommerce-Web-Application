import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import apiRequest from "../../api/api_call";
import Card from "../../components/Card";

const SearchResults = () => {
  const [productDeets, setProductDeets] = useState([]);
  const locate = useLocation();
  let params = useParams();
  const accesstoken = localStorage.getItem("access_token");
  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("fullName");
  const initial = name ? name.charAt(0) : "";
  //Use ternary operator to conditionally assign initial

  console.log(locate, "locate");
  const apiDetails = {
    urlEndpoint: `/products/${locate.search}`,
    requestMethod: "GET",
    authentication: false,
  };

  async function apiGet() {
    let getProducts = await apiRequest(apiDetails, null, null);

    console.log(getProducts, "qwerty");

    if (getProducts.status == 200) {
      const filteredData = getProducts.data.data.filter(
        (data) => data.userId != userId
      );

      setProductDeets(filteredData);
      console.log(productDeets, "hf");
    }
  }
  useEffect(() => {
    apiGet();
  }, []);
  return (
    <>
      {accesstoken ? (
        <Navbar isLoggedIn={true} startingLetter={initial} />
      ) : (
        <Navbar isLoggedIn={false} startingLetter={""} />
      )}
      <div className="container mx-10 mt-14">
        <div className="grid grid-cols-4  gap-8">
          {productDeets.map(
            (pro) =>
              userId !== pro.userId && (
                <Card
                  title={pro.name}
                  link={`/product/detail/${pro.userId}/${pro._id}`}
                  image={pro.productImages[0]?.url}
                  shortDescription={pro.shortDescription}
                  price={pro.price}
                />
              )
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
