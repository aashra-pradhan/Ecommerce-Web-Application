import React from "react";

const Button = ({ type, value }) => {
  return (
    <>
      <button
        type={type}
        className="rounded w-full border-slate-900 rounded-lg bg-green-100 mt-2 hover:cursor-pointer"
      >
        {value}
      </button>
    </>
  );
};

export default Button;
