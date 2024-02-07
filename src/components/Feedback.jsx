import React from "react";

const Feedback = ({ success, message }) => {
  return (
    <div className="m-2">
      {success ? (
        <h2 className="text-black bg-lime-600">{message}</h2>
      ) : (
        <h2 className="text-black bg-red-600">{message}</h2>
      )}
    </div>
  );
};
export default Feedback;
