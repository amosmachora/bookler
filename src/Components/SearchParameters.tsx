import React from "react";
import { useContext } from "react";
import { SearchContext } from "../App";

const getFormattedDate = (date: Date | null | undefined) => {
  return date?.toDateString().substring(0, date.toDateString().length - 4);
};

/**
 * @returns Display for chosen flight search parameters
 */
const SearchParametersDisplay = () => {
  const { typeOfTrip, fromAirport, departureDate, returnDate, toAirport } =
    useContext(SearchContext);

  return (
    <div className="flex items-center justify-between bg-white mt-10 py-4 px-12 rounded-lg mr-6">
      <div>
        <p className="text-gray-400 text-xs font-medium ml-3">TYPE</p>
        <p className="bg-gray-100 px-3 py-1 font-medium rounded-full">
          {typeOfTrip}
        </p>
      </div>
      <div>
        <p className="text-gray-400 text-xs font-medium ml-3">FROM</p>
        <p className="bg-gray-100 px-3 py-1 font-medium rounded-full">
          {fromAirport.city + ", " + fromAirport.country}
        </p>
      </div>
      <div>
        <p className="text-gray-400 text-xs font-medium ml-3">TO</p>
        <p className="bg-gray-100 px-3 py-1 font-medium rounded-full">
          {toAirport.city + ", " + toAirport.country}
        </p>
      </div>
      <div>
        <p className="text-gray-400 text-xs font-medium ml-3">
          DEPARTURE - RETURN
        </p>
        <p className="bg-gray-100 px-3 py-1 font-medium rounded-full">
          {getFormattedDate(departureDate) +
            " - " +
            getFormattedDate(returnDate)}
        </p>
      </div>
      <RedSearchButton text="Search FlIGhT" />
    </div>
  );
};

export default SearchParametersDisplay;

type RedSearchButtonProps = {
  text: string;
};

export function RedSearchButton({ text }: RedSearchButtonProps) {
  return (
    <p className="bg-red-600 text-white text-xs rounded-full px-5 py-3 uppercase cursor-pointer">
      {text}
    </p>
  );
}
