import React from "react";

const Fallback = () => {
  return (
    <>
      <div className="flex justify-center items-center h-full w-full p-20">
        {/* <h1 className="text-gray-500 text-lg">Hold on! Loading content!</h1> */}

        <div class="loader"></div>
      </div>
    </>
  );
};

export default Fallback;
