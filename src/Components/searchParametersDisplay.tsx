import React from "react";
import { searchParameters } from "../App";

type searchParametersDisplayProps = {
  searchParameters: searchParameters | undefined;
};

const getFormattedDate = (date: Date | null | undefined) => {
  const string = date?.getDate();
  console.log(string);

  return date?.toDateString().substring(0, date.toDateString().length - 4);
};

const searchParametersDisplay = ({
  searchParameters,
}: searchParametersDisplayProps) => {
  return (
    <div className="flex items-center justify-between bg-white mt-10 py-4 px-12 rounded-lg">
      <div>
        <p className="text-gray-400 text-xs font-medium ml-3">TYPE</p>
        <p className="bg-gray-100 px-3 py-1 font-medium rounded-full">
          {searchParameters?.typeOfTrip}
        </p>
      </div>
      <div>
        <p className="text-gray-400 text-xs font-medium ml-3">FROM</p>
        <p className="bg-gray-100 px-3 py-1 font-medium rounded-full">
          {searchParameters?.fromAirport.city +
            ", " +
            searchParameters?.fromAirport.country}
        </p>
      </div>
      <div>
        <p className="text-gray-400 text-xs font-medium ml-3">TO</p>
        <p className="bg-gray-100 px-3 py-1 font-medium rounded-full">
          {searchParameters?.toAirport.city +
            ", " +
            searchParameters?.toAirport.country}
        </p>
      </div>
      <div>
        <p className="text-gray-400 text-xs font-medium ml-3">
          DEPARTURE - RETURN
        </p>
        <p className="bg-gray-100 px-3 py-1 font-medium rounded-full">
          {getFormattedDate(searchParameters?.departureDate) +
            " - " +
            getFormattedDate(searchParameters?.returnDate)}
        </p>
      </div>
      <p className="bg-red-600 text-white text-xs rounded-full px-5 py-3">
        SEARCH FLIGHT
      </p>
    </div>
  );
};

export default searchParametersDisplay;
