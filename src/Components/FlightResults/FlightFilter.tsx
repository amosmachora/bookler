import React, { useContext, useRef, useState } from "react";
import { MainContext, SearchContext } from "../../App";
import { Airline, Airport } from "../../Types/Flights";

const FlightFilter = () => {
  const { airports, airlines } = useContext(MainContext);
  const { toAirport } = useContext(SearchContext);
  const [selectedAirport, setSelectedAirport] = useState<Airport>(toAirport);
  const [selectedAirline, setSelectedAirline] = useState<Airline>();

  const getStopSelectCities = (): Airport[] => {
    /**
     * TODO get unique airports.
     */
    return airports;
  };

  const handleAirlinePreferenceSelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedAirline(
      airlines.filter((airline) => airline.Name === e.target.value)[0]
    );
  };

  const handleStopAirportSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAirport(
      airports.filter((airport) => airport.city === e.target.value)[0]
    );
  };

  return (
    <div className="mt-5 w-1/4 ml-5 mr-16 rounded-lg overflow-hidden">
      <p className="font-bold text-lg p-3 bg-flightResultsBg">Filters</p>
      <div className="p-5 bg-white">
        <p className="text-sm font-semibold mb-4">Price</p>
        <input
          type="range"
          name="price-range"
          id="price-range"
          className="cursor-pointer w-full"
        />
        <p className="text-sm font-semibold mb-4 mt-7">Stop</p>
        <select
          name="stop-airport-selector"
          id="stop-airport-selector"
          className="pl-7 py-2 border rounded-md cursor-pointer w-full outline-none font-semibold"
          defaultValue={toAirport.city}
          onChange={(e) => handleStopAirportSelect(e)}
        >
          <span className="text-gray-300 text-xs">Via </span>
          <option value={toAirport.city}>NO STOP</option>
          {getStopSelectCities().map((airport) => (
            <option value={airport.city}>
              {airport.city + ", " + airport.country}
            </option>
          ))}
        </select>
        <p className="text-sm font-semibold mb-4 mt-7">Airlines</p>
        <select
          name="airline-selector"
          id="airline-selector"
          className="w-full rounded-md pl-7 py-2 outline-none font-semibold border"
          defaultValue="no filter"
          onChange={(e) => handleAirlinePreferenceSelect(e)}
        >
          <option value="No preference">NO PREFERENCE</option>
          {airlines.map((airline) => (
            <option value={airline.Name}>{airline.Name}</option>
          ))}
        </select>
        <p className="text-sm font-semibold mb-4 mt-7">Airport</p>
        {airports
          .filter((airport) => airport.city === selectedAirport?.city)
          .map((airport) => (
            <div className="flex items-center mb-1">
              <input
                type="checkbox"
                id={airport.name}
                value={airport.name}
                name={airport.name}
              />
              <label
                htmlFor={airport.name}
                className="text-xs text-gray-400 ml-1"
              >
                {airport.name}
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FlightFilter;
