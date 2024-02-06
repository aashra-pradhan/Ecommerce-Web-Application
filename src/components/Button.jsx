import React from "react";

const Button = ({ type, value }) => {
  return (
    <>
      <button
        type={type}
        className="rounded w-full border-slate-900 rounded-lg bg-white hover:cursor-pointer"
      >
        {value}
      </button>
    </>
  );
};

export default Button;
