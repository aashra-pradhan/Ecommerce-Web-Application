import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/useCartContext";

const Productpage = () => {
  const [productInfo, setProductInfo] = useState({});
  const [quantityCount, setQuantityCount] = useState(1);
  const accesstoken = localStorage.getItem("access_token");
  const name = localStorage.getItem("fullName");
  const initial = name ? name.charAt(0) : ""; //Use ternary operator to conditionally assign initial
  const userId = localStorage.getItem("userId");

  const { products, setProducts, addToCart } = useContext(CartContext);

  let params = useParams();
  // debugger;
  console.log(params, "params");
  //params hook le chai route ko parameters ko value return garcha ni the form of object, clg(console.log) garer herda huncha result
  const baseUrl = "https://ecommerce-backend-gr3e.onrender.com/api";

  const url = `${baseUrl}/product/details/${params.userId}/${params.productId}`;
  // aba yo chai api ko url hai,,, route has nothing to do with api, hamile j naam ni use garna sakcham route ko lagi, but api chai
  //thyakkai backend le j diyeko cha, tei sanga match hunuparcha
  //also we did that dynamic route thing with params so that hamile card ko madhyam bata tyo userid nd productid route ma
  //pathaidiyera route bata userid ra productid lina sakcham
  //because tyo kura chahiyo ni yo key chahine wala api hit garna(userid and productid)
  //ani jun product id cha tyo particular product ko matra details aaucha
  const getProduct = () => {
    try {
      axios
        .get(url)
        .then((response) => setProductInfo(response.data.data, "data"))
        .catch((err) => console.log(err, "rr"));
      // setProductInfo(response.data.data);
      console.log(productInfo, "ooo");
    } catch (error) {
      console.error(error, "eeror");
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  console.log(products, "productInfo");
  return (
    <>
      {accesstoken ? (
        <Navbar isLoggedIn={true} startingLetter={initial} />
      ) : (
        <Navbar isLoggedIn={false} startingLetter={""} />
      )}
      <div className="productcontainer">
        <div className="productbox">
          {/* productInfo fetch hunu agadi nai image render bhairathyo so kei ni dekhirako thiyena
          code ko logic ma error haina ki browser kai kei extension haru le garda yo problem arise bhayeko huna sakcha,
          so hamile eta k garyam to solve that is, yedi productImages wala array ma kei aayecha, tesko length 0 bhanda thulo 
          cha bhane matrai image lai render garau, this way aba productInffo fetch bhaisakesi matra img render garcha */}
          {productInfo?.productImages?.length > 0 && (
            <img
              className="prod-image"
              src={productInfo?.productImages[0]?.url}
              alt="productImage"
            />
          )}

          <div className="prodinfo">
            <div className="prod-box">
              <p className="prod-title">Product name</p>
              <p className="prod-bhitra">{productInfo?.name}</p>
            </div>
            <div className="prod-box">
              <p className="prod-title">Price</p>
              <p className="prod-bhitra">{productInfo?.price}</p>
            </div>
            <div className="prod-box">
              <p className="prod-title">Quantity available</p>
              <p className="prod-bhitra">{productInfo?.quantity}</p>
            </div>
            <div className="prod-box">
              <p className="prod-title">Description</p>
              <p className="prod-bhitra">{productInfo?.description}</p>
            </div>

            <div className="quantity-box">
              <p className="prod-title">Quantity</p>
              <button
                className="rounded w-full border-slate-900 rounded-lg bg-green-100 mt-2 hover:cursor-pointer counter-button"
                disabled={quantityCount <= 1 ? true : false}
                onClick={() => {
                  setQuantityCount(+quantityCount - 1);
                }}
              >
                -
              </button>

              <input
                className="quantity-input"
                type="number"
                min="1"
                max={productInfo?.quantity}
                value={quantityCount}
                onChange={(e) => {
                  {
                    e.target.value <= productInfo?.quantity
                      ? setQuantityCount(e.target.value || 1)
                      : // || --> e.target.value 0 bhaye chai setQualityCount 1 haldincha natra chai e.target.value nai rakhcha
                        null;
                  }
                }}
              />
              <button
                className="rounded w-full border-slate-900 rounded-lg bg-green-100 mt-2 hover:cursor-pointer counter-button"
                disabled={quantityCount < productInfo?.quantity ? false : true}
                onClick={() => {
                  setQuantityCount(+quantityCount + 1);
                  // quantityCount lai string manirathyo, agadi + rakhder aba numbber mancha, tesaile agi 3+1=31 manirathyo
                }}
              >
                +
              </button>

              {/* <select
                {...register("quantity", { value: "647325e5ac7ba75355db8097" })}
                name="quantity"
              >
                <option key={productInfo.userId} value="1">
                  {category.categoryName}
                </option>
              </select> */}
            </div>

            <div
              className=" button-box"
              onClick={() => {
                // const updatedProductInfo = {
                //   ...productInfo,
                //   chosenQuantity: quantityCount,
                //   totalPrice: quantityCount * productInfo.price,
                // };
                // let updatedArray = [];
                // updatedArray.concat(products);
                // updatedArray.push(productInfo);
                // console.log(updatedArray, "array");
                // setProducts(updatedArray);
                // console.log(updatedProductInfo, "ppp");
                // alert("done");
                addToCart(productInfo);
              }}
            >
              <button
                type="submit"
                className="buy-button rounded  border-slate-900 rounded-lg bg-green-100 mt-2 hover:cursor-pointer
                "
              >
                Add to Cart
              </button>
              <NavLink to="/product/purchase">
                <button
                  type="submit"
                  className="buy-button rounded border-slate-900 rounded-lg bg-green-100 mt-2 hover:cursor-pointer"
                >
                  Buy now
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Productpage;
