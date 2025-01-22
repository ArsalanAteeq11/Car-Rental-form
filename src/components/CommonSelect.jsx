import React from "react";

const CommonSelect = ({ name, label, data, errors, handleChange }) => {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-1 ">
        <select
          className="border border-gray-300 rounded w-full p-2  "
          onChange={(e) => handleChange(name, e.target.value)}
        >
          <option value="">Select {label}</option>
          {data?.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
        {errors?.[`${name}`] && (
          <p className="text-md text-red-500">{errors?.[`${name}`]}</p>
        )}
      </div>
    </div>
  );
};

export default CommonSelect;
