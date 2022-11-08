import React, { useState, useContext, useEffect, createContext } from "react";
import DevAirportData from "../../Util/AirportFlightData.json";
import axios from "axios";
import { Assets } from "../../Assets/Assets";
import { Airline, Airport, Departures } from "../../Types/Flights";
import FlightFilter from "./FlightFilter";
import BookButton from "./BookButton";
import { MainContext, SearchContext } from "../../App";
import FoundFlight from "./FoundFlight";
import { BookingContextType } from "../../Types/Contexts";
import FareSummary from "./FareSummary";
import TravelerDetails from "./TravelerDetails";

export const BookingContext = createContext<BookingContextType>({
  initiateBooking() {},
  numberOfAdults: 0,
  flightPrice: 0,
});

const FlightResults = () => {
  const {
    toAirport,
    returnDate,
    departureDate,
    typeOfTrip,
    fromAirport,
    outGoingFlights,
  } = useContext(SearchContext);
  const [foundFlights, setFoundFlights] = useState<Departures[]>();
  const [sortBy, setSortBy] = useState("cheapest");
  const [preferredStopAirport, setPreferredStopAirport] =
    useState<Airport | null>(null);
  const [preferredAirline, setPreferredAirline] = useState<Airline | null>(
    null
  );
  const [booking, setBooking] = useState(false);

  const allUnfilteredFoundFlights = outGoingFlights.filter(
    (outGoingFlight) => outGoingFlight.arrival.airport.icao === toAirport.icao
  );

  useEffect(() => {
    console.log(preferredStopAirport);
  }, [preferredStopAirport]);

  useEffect(() => {
    if (preferredAirline !== null) {
      setFoundFlights(
        foundFlights?.filter(
          (foundFlight) => foundFlight.airline.name === preferredAirline.Name
        )
      );
    } else {
      setFoundFlights(allUnfilteredFoundFlights);
    }
  }, [preferredAirline]);

  useEffect(() => {
    setFoundFlights(allUnfilteredFoundFlights);
  }, []);

  const fetchFlightPrices = (flight: Departures) => {
    const flightPrice = 0;
    return flightPrice;
  };

  const [flightPrice, setFlightPrice] = useState<number>(0);
  const [numberOfAdults, setNumberOfAdults] = useState(0);

  const initiateBooking = (flight: Departures) => {
    setFoundFlights([flight]);
    setBooking(true);
    setFlightPrice(fetchFlightPrices(flight));
  };

  return (
    <BookingContext.Provider
      value={{ initiateBooking, numberOfAdults, flightPrice }}
    >
      <div className="flex sticky top-0">
        <div className="mt-4 w-3/4">
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
          <div className="rounded-lg mt-1 overflow-y-auto h-96 found-flights">
            {foundFlights?.map((foundFlight) => (
              <FoundFlight
                foundFlight={foundFlight}
                sortBy={sortBy}
                key={foundFlight.number}
              />
            ))}
            <TravelerDetails />
          </div>
        </div>
        {booking ? (
          <FareSummary />
        ) : (
          <FlightFilter
            setPreferredStopAirport={setPreferredStopAirport}
            preferredStopAirport={preferredStopAirport}
            setPreferredAirline={setPreferredAirline}
          />
        )}
      </div>
    </BookingContext.Provider>
  );
};

export default FlightResults;
