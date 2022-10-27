import React, { useContext } from "react";
import { MainContext } from "../../App";

const FlightFilter = () => {
  const { airports } = useContext(MainContext);
  console.log(airports);
  return (
    <div className="mt-5 w-1/4 ml-5 mr-16 rounded-lg overflow-hidden">
      <p className="font-bold text-lg p-3 bg-flightResultsBg">Filters</p>
      <div className="p-5">
        <p>Price</p>
        <input
          type="range"
          name="price-range"
          id="price-range"
          className="cursor-pointer w-full"
        />
        <p>Stop</p>
        <select
          name="stop-airport-selector"
          id="stop-airport-selector"
          className="pl-7 py-2 border rounded-md cursor-pointer w-full outline-none"
        >
          <span className="text-gray-300 text-xs">Via </span>
          {airports.map((airport) => (
            <option value={airport.city}>
              {airport.city + "," + airport.country}
            </option>
          ))}
        </select>
        <p>Airlines</p>
        <select name="airline-selector" id="airline-selector">
          {/**
           * TODO Fix airlines list
           */}
        </select>
      </div>
    </div>
  );
};

export default FlightFilter;
