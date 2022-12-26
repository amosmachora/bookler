import React from "react";
import { Assets } from "../Assets/Assets";
import { getCapitalizedString } from "../Util/Helpers";

const NullUserFieldInput = ({ field }: { field: string }) => {
  return (
    <div
      className="border rounded-md bg-flightResultsBg py-3 px-3 mt-3 flex justify-between items-center"
      key={field}
    >
      <input
        type="text"
        className="w-full border-none h-6 bg-transparent px-2"
        placeholder={getCapitalizedString(field)}
      />
      <div className="flex">
        <img src={Assets.Plus} alt="plus" className="ml-2" />
        <p className="text-blue-600 font-semibold text-sm ml-1">Add</p>
      </div>
    </div>
  );
};

export default NullUserFieldInput;
