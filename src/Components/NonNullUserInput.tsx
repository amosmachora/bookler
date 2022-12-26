import React from "react";
import { Assets } from "../Assets/Assets";

const NonNullUserInput = ({
  defaultValue,
  field,
}: {
  defaultValue: string;
  field: string;
}) => {
  return (
    <div className="border rounded-md bg-flightResultsBg py-4 px-3 mt-5">
      <p className="text-gray-400 capitalize">{field}</p>
      <div className="flex items-center mt-2">
        <input
          type={field === "password" ? "password" : "text"}
          className="w-full border-none h-6 bg-transparent px-2"
          defaultValue={defaultValue}
        />
        <div className="flex">
          <img src={Assets.Edit} alt="Edit" className="ml-3" />
          <p className="text-blue-600 font-semibold text-sm ml-1">Edit</p>
        </div>
      </div>
    </div>
  );
};

export default NonNullUserInput;
