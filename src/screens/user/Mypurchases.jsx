import React from "react";
import { useContext } from "react";
import { PurchaseContext } from "../../context/usePurchaseContext";
import Card from "../../components/Card";
const Mypurchases = () => {
  const { purchasedProducts } = useContext(PurchaseContext);
  console.log(purchasedProducts, "ppp");

  return (
    <>
      <div className="container mx-auto my-12">
        <div className="grid grid-cols-4  gap-8">
          {purchasedProducts?.map((pro) => {
            return (
              <Card
                title={pro?.name}
                link={`/ratingpage/${pro?.userId}/${pro?._id}`}
                image={pro?.productImages[0]?.url}
                shortDescription={pro?.shortDescription}
                price={pro?.price}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Mypurchases;
