import React, { useState, useContext, useEffect } from "react";
import DevAirportData from "../Util/AirportFlightData.json";
import axios from "axios";
import Airlines from "../Util/Airlines.json";
import { Assets } from "../Assets/Assets";
import { SearchContext } from "../Types/Contexts";
import { Airport, Departures } from "../Types/Flights";

const FlightResults = () => {
  const {
    toAirport,
    returnDate,
    departureDate,
    typeOfTrip,
    fromAirport,
    devMode,
    outGoingFlights,
  } = useContext(SearchContext);
  const [foundFlights, setFoundFlights] = useState<Departures[]>();
  const [sortBy, setSortBy] = useState("cheapest");

  useEffect(() => {
    setFoundFlights(
      outGoingFlights.filter(
        (outGoingFlight) =>
          outGoingFlight.arrival.airport.icao === toAirport.icao
      )
    );
  }, []);

  return (
    <div className="mt-5">
      <div className="flex justify-between px-5 py-3 items-center rounded-lg bg-flightResultsBg">
        <div className="flex items-center">
          <p className="font-bold inline text-xl">Flights</p>
          <div className="h-[14px] w-[1px] mx-3 my-auto bg-gray-400" />
          <p className="text-sm">
            Total{" "}
            <span className="text-blue-400">
              {foundFlights?.length} results
            </span>
          </p>
        </div>
        <div className="flex text-xs items-center">
          <p
            className={`${
              sortBy === "cheapest"
                ? "bg-blueBgMainSm text-white px-3 py-2 rounded-full transition-all"
                : ""
            } cursor-pointer`}
            onClick={() => setSortBy("cheapest")}
          >
            Cheapest
          </p>
          <p
            className={`${
              sortBy === "best"
                ? "bg-blueBgMainSm text-white px-3 py-2 rounded-full transition-all"
                : ""
            } mx-8 cursor-pointer`}
            onClick={() => setSortBy("best")}
          >
            Best
          </p>
          <p
            className={`${
              sortBy === "quickest"
                ? "bg-blueBgMainSm text-white px-3 py-2 rounded-full transition-all"
                : ""
            } cursor-pointer`}
            onClick={() => setSortBy("quickest")}
          >
            Quickest
          </p>
        </div>
      </div>
      <div className="rounded-lg mt-1">
        {foundFlights?.map((foundFlight) => (
          <div
            className="flex justify-between rounded-lg overflow-hidden"
            key={foundFlight.number}
          >
            <div className="bg-white px-2 py-3 w-5/6 mb-[2px]">
              <div className="flex items-center text-[11px]">
                <p>{sortBy}</p>
                <div className="h-[14px] w-[1px] mx-3 my-auto bg-gray-100" />
                <p>
                  Rating: <span className="text-goldRating font-bold">4.5</span>
                </p>
              </div>
              <div className="h-[1px] bg-gray-200" />
              <div className="flex items-center p-5">
                <img
                  src={getLogo(foundFlight.airline.name)}
                  alt="Airline Logo"
                  className="h-14 w-14 rounded-full shadow-xl mr-3"
                />
                <p>{foundFlight.airline.name}</p>
                <p>{fromAirport.icao}</p>
              </div>
            </div>
            <div>Prices</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightResults;

const getLogo = (airlineName: string): string => {
  const airline: any = Airlines.rows.filter(
    (airline) => airline.Name === airlineName
  );
  if (airline[0] === undefined) {
    return Assets.PlaneFlying;
  }
  return `https://content.airhex.com/content/logos/airlines_${airline[0].Code}_100_100_s.png`;
};
