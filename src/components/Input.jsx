import React from "react";

const Input = ({ labelname, errors, register, onBlur, type, name, value }) => {
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
        value={value}
      />
      <p>{errors[name]?.message}</p>
      {/* schema kei abide by bhayena bhane yo error msg aaucha thyakka below the input field */}
    </>
  );
};

export default Input;
