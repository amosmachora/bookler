import React from "react";
import { PropertyListType } from "../../Types/PropertyList";

const HotelActiveDataScreen = ({
  propertyList,
  sortBy,
  setSortBy,
  detailsShown,
  setShowInfo,
  showInfo,
}: {
  propertyList: PropertyListType;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
  detailsShown: boolean;
  showInfo: boolean;
}) => {
  return (
    <div className="flex px-5 bg-flightResultsBg py-2 rounded-sm mb-1 items-center justify-between">
      <p className="font-bold">{showInfo ? "Hotels Details" : "Hotels"}</p>
      {!detailsShown && (
        <>
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
                key={sortOption.id}
              >
                {sortOption.name}
              </p>
            ))}
            {propertyList.applied_filters.map((appliedFilter) => (
              <p className="text-xs py-1 mx-1 px-2">{appliedFilter.name}</p>
            ))}
          </div>
          <div className="h-5 w-[1px] bg-gray-300 mx-3" />
        </>
      )}
      <div className="flex items-center">
        {detailsShown && (
          <>
            <p
              className={`${
                showInfo ? "bg-blue-900 text-white" : "text-gray-400"
              } text-xs py-2 px-3 rounded-full mr-3 cursor-pointer transition-all`}
              onClick={() => setShowInfo(true)}
            >
              Info and Price
            </p>
            <p
              className={`${
                showInfo ? "text-gray-400" : "text-white bg-blue-900"
              } text-xs py-2 px-3 rounded-full cursor-pointer transition-all`}
              onClick={() => setShowInfo(false)}
            >
              Guest Ratings
            </p>
          </>
        )}
        <p className="cursor-pointer text-blue-600 font-semibold text-sm ml-2">
          Map View
        </p>
      </div>
    </div>
  );
};

export default HotelActiveDataScreen;
