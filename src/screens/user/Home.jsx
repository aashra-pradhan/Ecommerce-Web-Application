import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Card from "../../components/Card";
import axios from "axios";

const Home = () => {
  const [productInfo, setProductInfo] = useState([]);
  const accesstoken = localStorage.getItem("access_token");
  const name = localStorage.getItem("fullName");
  const initial = name ? name.charAt(0) : ""; //Use ternary operator to conditionally assign initial
  const userId = localStorage.getItem("userId");

  const baseUrl = "https://ecommerce-backend-gr3e.onrender.com/api";

  const getProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}/products`);

      setProductInfo(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {accesstoken ? (
        <Navbar isLoggedIn={true} startingLetter={initial} />
      ) : (
        <Navbar isLoggedIn={false} startingLetter={""} />
      )}
      <div className="container mx-auto my-12">
        <div className="grid grid-cols-4  gap-8">
          {productInfo?.map((item) => {
            // esari { } bhitra map garda (i.e., when mapping inside return statement, jsx) jaile return rakhnuparcha hai anij display garaune ho, tyo return bhitra lekhne ho
            return (
              <>
                {userId !== item.userId ? (
                  <Card
                    // route deko ani card lai yei route le wrap garecham uta
                    link={`product/detail/${item.userId}/${item._id}`}
                    // link="/product"
                    image={item.productImages[0]?.url}
                    // optional chaining, productimages aako cha bahne chai ur leu,,,sable pic nahalna ni sakcha ni
                    title={item.name}
                    shortDescription={item.shortDescription}
                    price={item.price}
                  />
                ) : null}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
