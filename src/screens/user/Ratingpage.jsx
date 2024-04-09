import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { CartContext } from "../../context/useCartContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Feedback from "../../components/Feedback";
import { FeedbackContext } from "../../context/useFeedbackContext";
import { toast } from "react-toastify";

const Ratingpage = () => {
  const { feedback, setFeedback } = useContext(FeedbackContext);
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    quantity: 0,
    description: "",
  });
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const accesstoken = JSON.parse(localStorage.getItem("access_token"));
  const name = localStorage.getItem("fullName");
  const initial = name ? name.charAt(0) : "";
  const user1Id = localStorage.getItem("userId");

  const { products, addToCart, setActiveProduct } = useContext(CartContext);
  let params = useParams();

  const baseUrl = "https://ecommerce-backend-gr3e.onrender.com/api";

  const getProduct = async () => {
    const url = `${baseUrl}/product/details/${params.userId}/${params.productId}`;
    try {
      const response = await axios.get(url);
      setProductInfo(response.data.data);
      console.log(productInfo);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const postRating = async () => {
    const url = `${baseUrl}/rate-product`;
    const config = {
      headers: { Authorization: "Bearer " + accesstoken },
      // not authorized to post bhanne error aairathyo, because accesstoken ta string ma liyrathyam loccal storage bata, because stringify garera store garirathyam local storge ma,,,,tara yaha ta json value mai chahincha bearer sanga so mathi access token lai json.parse garera yo problem solve bhayo
    };
    const data = {
      userId: productInfo.userId,
      productId: params.productId,
      rating: rating,
      review: review,
      customerId: user1Id,
    };
    axios
      .put(url, data, config)
      .then((response) => {
        console.log(response.data);
        if (response.data.status == 200 || response.data.status == 201) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }

        setFeedback({
          success: true,
          message: "Successfully reviewed product!",
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
      {accesstoken ? (
        <Navbar isLoggedIn={true} startingLetter={initial} />
      ) : (
        <Navbar isLoggedIn={false} startingLetter={""} />
      )}
      <div className="productcontainer">
        <div className="productbox">
          {productInfo?.productImages?.length > 0 && (
            <div className="flex items-center last-min w-[800px]	">
              <img
                className="prod-image h-[600px] w-[500px]"
                // src={productInfo?.productImages[0]?.url}
                src={`https://source.unsplash.com/500x600/?${productInfo?.name}`}
                alt="productImage"
              />
            </div>
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
              <p className="prod-title">Quantity purchased</p>

              <p className="prod-bhitra">
                1 ==(used static value 1 here since aile quantity:1 matra kinna
                miliracha api ma)
              </p>
            </div>
            <div className="prod-box">
              <p className="prod-title">Description</p>

              <p className="prod-bhitra">{productInfo?.description}</p>
            </div>
            <div className="prod-box">
              <p className="prod-title">Review</p>
              <textarea
                type="text"
                name="review"
                placeholder="Write your review here ..."
                className="review-input p-2"
                value={review}
                onChange={(e) => {
                  setReview(e.target.value);
                }}
              />
            </div>

            <div className="prod-box">
              <p className="prod-title">Choose your rating out of 5</p>
              <input
                type="number"
                className="rating-input p-1"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => {
                  setRating(e.target.value);
                }}
              />
            </div>
            <button
              type="button"
              className="h-20 w-40 rounded border-slate-900 rounded-lg bg-green-100 hover:cursor-pointer text-lg font-medium flex items-center justify-center mt-5"
              onClick={() => {
                postRating();
              }}
            >
              Submit
            </button>
            {/* <Feedback success={feedback.success} message={feedback.message} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Ratingpage;
