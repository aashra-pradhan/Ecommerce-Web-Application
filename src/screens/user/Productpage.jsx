import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/useCartContext";

const Productpage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productInfo, setProductInfo] = useState({});
  const [quantityCount, setQuantityCount] = useState(1);
  const accesstoken = localStorage.getItem("access_token");
  const name = localStorage.getItem("fullName");
  const initial = name ? name.charAt(0) : "";
  const userId = localStorage.getItem("userId");

  const { products, addToCart } = useContext(CartContext);
  let params = useParams();

  const baseUrl = "https://ecommerce-backend-gr3e.onrender.com/api";
  const url = `${baseUrl}/product/details/${params.userId}/${params.productId}`;

  const getProduct = async () => {
    try {
      const response = await axios.get(url);
      setProductInfo(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const updatedProductInfo = {
    ...productInfo,
    chosenQuantity: quantityCount,
    totalPrice: quantityCount * productInfo.price,
  };

  return (
    <>
      {accesstoken ? (
        <Navbar isLoggedIn={true} startingLetter={initial} />
      ) : (
        <Navbar isLoggedIn={false} startingLetter={""} />
      )}
      <div className="productcontainer">
        <div className="productbox">
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
                disabled={quantityCount <= 1}
                onClick={() => {
                  setQuantityCount((prevCount) => prevCount - 1);
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
                  const value = parseInt(e.target.value);
                  setQuantityCount(value <= productInfo?.quantity ? value : 1);
                }}
              />
              <button
                className="rounded w-full border-slate-900 rounded-lg bg-green-100 mt-2 hover:cursor-pointer counter-button"
                disabled={quantityCount >= productInfo?.quantity}
                onClick={() => {
                  setQuantityCount((prevCount) => prevCount + 1);
                }}
              >
                +
              </button>
            </div>

            <div className="button-box">
              <button
                type="submit"
                className="buy-button rounded border-slate-900 rounded-lg bg-green-100 mt-2 hover:cursor-pointer"
                onClick={() => {
                  addToCart(updatedProductInfo);
                }}
              >
                Add to Cart
              </button>
              <button
                type="submit"
                className="buy-button rounded border-slate-900 rounded-lg bg-green-100 mt-2 hover:cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                Buy now
              </button>
              <button
                type="button"
                className="buy-button rounded border-slate-900 rounded-lg bg-green-100 mt-2 hover:cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                Chat with us
              </button>

              {isModalOpen && (
                <>
                  <div
                    data-te-modal-init
                    className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                    id="rightBottomModal"
                    tabIndex="-1"
                    aria-labelledby="rightBottomModalLabel"
                    aria-hidden="true"
                  >
                    <div
                      data-te-modal-dialog-ref
                      className="pointer-events-none absolute bottom-7 right-7 h-auto w-full translate-x-[100%] opacity-0 transition-all duration-300 ease-in-out max-[576px]:right-auto min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
                    >
                      <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                        <div className="flex flex-shrink-0 items-center justify-between rounded-t-md bg-primary-600 p-4 dark:border-b dark:border-neutral-500 dark:bg-transparent">
                          <h5
                            className="text-xl font-medium leading-normal text-white"
                            id="rightBottomModalLabel"
                          >
                            Modal title
                          </h5>
                          <button
                            type="button"
                            className="box-content rounded-none border-none text-white hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                            data-te-modal-dismiss
                            aria-label="Close"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-6 w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                        <div
                          className="relative grid flex-auto grid-cols-2 p-4"
                          data-te-modal-body-ref
                        >
                          <div>
                            <div
                              className="relative w-full overflow-hidden bg-cover bg-no-repeat"
                              data-te-ripple-init
                              data-te-ripple-color="light"
                            >
                              <img
                                src="https://tecdn.b-cdn.net/img/new/standard/city/041.webp"
                                className="w-full"
                              />
                              <div
                                className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed"
                                style={{
                                  backgroundColor: "rgba(251, 251, 251, 0.15)",
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="pl-6">
                            <p className="mb-4 font-bold">
                              Doloremque vero ex debitis veritatis?
                            </p>
                            <p className="mb-8">
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Quod itaque voluptate nesciunt
                              laborum incidunt. Officia, quam consectetur. Earum
                              eligendi aliquam illum alias.
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                          <button
                            type="button"
                            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                          >
                            Read more
                          </button>
                          <button
                            type="button"
                            className="ml-1 inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                            data-te-modal-dismiss
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            onClick={() => setIsModalOpen(false)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Productpage;
