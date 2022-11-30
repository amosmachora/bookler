import React from "react";
import { PropertyListType } from "../../Types/PropertyList";

const HotelActiveDataScreen = ({
  propertyList,
  sortBy,
  setSortBy,
}: {
  propertyList: PropertyListType;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex px-5 bg-flightResultsBg py-1 rounded-md mb-1 items-center">
      <p className="font-bold">Hotels</p>
      <div className="h-5 w-[1px] bg-gray-300 mx-3" />
      <p className="text-sm font-semibold">
        Total{" "}
        <span className="text-sky-500 font-normal">
          {propertyList.result.length} results
        </span>
      </p>
      <div className="flex items-center flex-wrap text-xs text-gray-400 w-max">
        {propertyList.sort.map((sortOption) => (
          <p
            className={`rounded-full py-1 mx-1 px-2 cursor-pointer transition-all ${
              sortOption.id === sortBy ? "bg-blue-900 text-white" : ""
            }`}
            onClick={() => setSortBy(sortOption.id)}
          >
            {sortOption.name}
          </p>
        ))}
        {propertyList.applied_filters.map((appliedFilter) => (
          <p className="text-xs py-1 mx-1 px-2">{appliedFilter.name}</p>
        ))}
      </div>
      <div className="h-5 w-[1px] bg-gray-300 mx-3" />
      <p className="cursor-pointer text-blue-600 font-semibold text-sm">
        Map View
      </p>
    </div>
  );
};

export default HotelActiveDataScreen;
