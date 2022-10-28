import React, { useState, useContext, useEffect } from "react";
import DevAirportData from "../../Util/AirportFlightData.json";
import axios from "axios";
import Airlines from "../../Util/Airlines.json";
import { Assets } from "../../Assets/Assets";
import { Airport, Departures } from "../../Types/Flights";
import FlightFilter from "./FlightFilter";
import BookButton from "./BookButton";
import { MainContext, SearchContext } from "../../App";

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
  /**
   * TODO Fix hard-coded shit time and calculate the time of flight.
   */

  return (
    <div className="flex">
      <div className="mt-5 w-3/4">
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
              className="flex rounded-lg overflow-hidden"
              key={foundFlight.number}
            >
              <div className="bg-white px-2 py-3 w-[79%] mb-[2px]">
                <div className="flex items-center text-[11px]">
                  <p>{sortBy}</p>
                  <div className="h-[14px] w-[1px] mx-3 my-auto bg-gray-100" />
                  <p>
                    Rating:{" "}
                    <span className="text-goldRating font-bold">4.5</span>
                  </p>
                </div>
                <div className="h-[1px] bg-gray-200" />
                <div className="flex items-center p-5">
                  <img
                    src={getLogo(foundFlight.airline.name)}
                    alt="Airline Logo"
                    className="h-14 w-14 rounded-full shadow-xl mr-3"
                  />
                  <p className="mr-4 text-sm font-bold w-20">
                    {foundFlight.airline.name}
                  </p>
                  <div className="flex flex-col items-end">
                    <p className="font-bold text-lg">
                      {getActualTime(foundFlight.departure.scheduledTimeUtc)}
                    </p>
                    <p className="text-sm text-gray-400">{fromAirport.icao}</p>
                  </div>
                  <div className="w-24 mx-5 border-b h-[1px] border-dashed border-black relative">
                    <div className="w-3 h-3 rounded-full bg-white border-2 border-black center-absolutely" />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="font-bold text-lg">00:00</p>
                    <p className="mr-2 text-sm text-gray-400">
                      {toAirport.icao}
                    </p>
                  </div>
                  <p className="font-bold mx-6">00H 00M</p>
                  <p className="text-black bg-gray-300 rounded-full text-xs p-2 cursor-pointer">
                    View Details
                  </p>
                </div>
              </div>
              <div className="flex bg-flightPrices flex-grow p-2">
                <div>
                  <p className="text-red-600 text-sm font-semibold mt-7">
                    00% OFF
                  </p>
                  <p className="text-xs text-gray-400">Save $00</p>
                </div>
                <div className="flex flex-col items-end mt-2">
                  <p className="text-[32px] w-min font-semi mb-1">
                    000
                    <span className="text-gray-400 text-xs font-normal">
                      USD
                    </span>
                  </p>
                  <BookButton foundFlight={foundFlight} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FlightFilter />
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

function getActualTime(scheduledTimeUtc: string | undefined): React.ReactNode {
  return scheduledTimeUtc?.substring(
    scheduledTimeUtc.length - 6,
    scheduledTimeUtc.length - 1
  );
}
