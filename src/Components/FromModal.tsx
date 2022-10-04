import React, { useContext, useEffect, useState } from "react";
import { Airport, MainContext } from "../App";
import { Assets } from "../Assets/Assets";
// import axios from "axios";

const FromModal = () => {
  const { airports } = useContext(MainContext);
  const [airportListLocal, setAirportListLocal] = useState<Airport[]>(airports);
  const [searchValue, setSearchValue] = useState("");
  console.log(airports);

  useEffect(() => {
    const filteredAirports = airportListLocal.filter(
      (airport) =>
        airport.name.toLowerCase().includes(searchValue) ||
        airport.country.toLowerCase().includes(searchValue) ||
        airport.city.toLowerCase().includes(searchValue)
    );
    setAirportListLocal(filteredAirports);
  }, [searchValue]);

  return (
    <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-6 z-40 w-1/3 bg-white shadow-xl rounded-2xl">
      <div className="flex justify-between">
        <p className="font-medium text-2xl">From</p>
        <img src={Assets.Close} alt="Close" className="cursor-pointer" />
      </div>
      <p className="text-center text-gray-500 text-base mt-8 mb-6">
        Search your desired take off location
      </p>
      <input
        type="text"
        name="From"
        className="w-full border rounded-xl h-11 p-4 text-sm focus:border-blue-500 outline-none focus:border-2"
        placeholder="Start your flight search"
        onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
      />

      <div className="mt-8 search-results-airports h-28 overflow-y-scroll">
        {airportListLocal.map((airport) => (
          <div className="flex justify-between">
            <p>{airport.country}</p>
            <p>{airport.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FromModal;
