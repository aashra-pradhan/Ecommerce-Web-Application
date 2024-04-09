import React from "react";
import { useContext } from "react";
import { PurchaseContext } from "../../context/usePurchaseContext";
import Card from "../../components/Card";
const Mypurchases = () => {
  const { purchasedProducts } = useContext(PurchaseContext);
  console.log(purchasedProducts, "ppp");

  return (
    <>
      {purchasedProducts.length > 0 ? (
        <div className="container flex justify-center">
          <div className="grid grid-cols-4  gap-8">
            {purchasedProducts?.map((pro) => {
              return (
                <Card
                  title={pro?.name}
                  link={`/ratingpage/${pro?.userId}/${pro?._id}`}
                  // image={pro?.productImages[0]?.url}
                  // image={`https://source.unsplash.com/250x180/?${pro?.name}`}
                  shortDescription={pro?.shortDescription}
                  price={pro?.price}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <h1>No products purchased</h1>
      )}
    </>
  );
};

export default Mypurchases;
