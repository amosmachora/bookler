import React, { useState } from "react";
import { Assets } from "../../Assets/Assets";
import { Airport } from "../../Types/Flights";
import { getCapitalizedString } from "../../Util/Helpers";
import "./AirportSearch.css";

const AirportSearch = ({
  closeModalFunction,
  searchAirports,
  searchFormText,
  setFunction,
}: {
  searchAirports: Airport[];
  closeModalFunction: React.Dispatch<React.SetStateAction<boolean>>;
  searchFormText: string;
  setFunction: React.Dispatch<React.SetStateAction<Airport | null>>;
}) => {
  const [localAirportList, setLocalAirportList] =
    useState<Airport[]>(searchAirports);

  const searchAirport = (e: React.KeyboardEvent) => {
    const searchValue = (e.target as HTMLInputElement).value.toLowerCase();

    if (e.key === "Enter") {
      const filteredAirports = localAirportList.filter(
        (airport) =>
          airport.name.toLowerCase().includes(searchValue) ||
          airport.country.toLowerCase().includes(searchValue) ||
          airport.city.toLowerCase().includes(searchValue)
      );
      setLocalAirportList(filteredAirports);
    }
  };

  const checkIfEmpty = (e: React.FormEvent) => {
    if ((e.target as HTMLInputElement).value.length === 0) {
      setLocalAirportList(searchAirports);
    }
  };

  return (
    <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-6 z-40 w-1/3 bg-white shadow-xl rounded-2xl">
      <div className="flex justify-between">
        <p className="font-medium text-2xl">
          {getCapitalizedString(searchFormText)}
        </p>
        <img
          src={Assets.Close}
          alt="Close"
          className="cursor-pointer"
          onClick={() => closeModalFunction(false)}
        />
      </div>
      <p className="text-center text-gray-500 text-base mt-8 mb-6">
        Search your desired take off location
      </p>
      <input
        type="text"
        name="From"
        className="w-full border rounded-xl h-11 p-4 text-sm focus:border-blue-500 outline-none focus:border-2"
        placeholder="Start your flight search"
        onKeyDown={(e) => searchAirport(e)}
        onChange={(e) => checkIfEmpty(e)}
      />

      <div className="airports-list mt-8 search-results-airports h-28 overflow-y-scroll scroll">
        {localAirportList.map((airport) => (
          <div
            key={airport.id}
            className="flex justify-between cursor-pointer"
            onClick={() => {
              setFunction(airport);
              closeModalFunction(false);
            }}
          >
            <p className="font-bold text-sm ho">{airport.country}</p>
            <p className="text-xs">{airport.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirportSearch;
