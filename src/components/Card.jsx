import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

const Card = ({ link, image, title, shortDescription, price }) => {
  return (
    <>
      <Link to={link}>
        <div className=" relative product-card block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 h-[320px] w-[250px]">
          <img
            className="rounded-t-lg h-[180px] w-full object-contain"
            src={`https://source.unsplash.com/250x180/?${title}`}
            //     ? image: //  { image
            // }
            alt=""
          />
          {/* h-[180px] w-full(width:100%) object-contain -----esto gareko to make the card size fixed, jatrai pic size aayye ni*/}

          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              {title}
            </h5>
            <h4>Rs.{price}</h4>
            {/* <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              {shortDescription}
            </p> */}
            {/* <Button type="submit" value="Add to cart" />
            <Button type="submit" value="Buy now" /> */}
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
