import React from "react";

const Input = ({ labelname, errors, register, onBlur, type, name }) => {
  return (
    <>
      <label className="block text-xl font-serif text-slate-950" htmlFor="">
        {labelname}
      </label>

      <input
        {...register(name)}
        type={type}
        onBlur={onBlur}
        className="text-xl font-serif text-slate-950 rounded-lg p-1 w-[300px]"
      />
      <p>{errors[name]?.message}</p>
    </>
  );
};

export default Input;
