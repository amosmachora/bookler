import React, { useState, useContext, useEffect, createContext } from "react";
import {
  Airline,
  Airport,
  Departures,
  TravelerInfo,
} from "../../Types/Flights";
import FlightFilter from "./FlightFilter";
import FoundFlight from "./FoundFlight";
import { BookingContextType, FlightPrices } from "../../Types/Contexts";
import FareSummary from "./FareSummary";
import GoButton from "./GoButton";
import PaymentOptions from "./PaymentOptions";
import FlightSearchParameters from "./FlightSearchParameters";
import { Outlet } from "react-router";
import { FlightSearchContext } from "./FlightsProvider";
import { MainContext } from "../Contexts/MainAppProvider";

export const BookingContext = createContext<BookingContextType>({
  initiateBooking() {},
  travelersInfo: null,
  flightPrice: { flightSurCharges: 0, baseFare: 0 },
  booking: false,
  setTravelersInfo: () => {},
});

const FlightResults = () => {
  const { toAirport, outGoingFlights } = useContext(FlightSearchContext);
  const [foundFlights, setFoundFlights] = useState<Departures[]>();
  const [sortBy, setSortBy] = useState("cheapest");
  const [preferredStopAirport, setPreferredStopAirport] =
    useState<Airport | null>(null);
  const [preferredAirline, setPreferredAirline] = useState<Airline | null>(
    null
  );
  const [booking, setBooking] = useState(false);

  const allUnfilteredFoundFlights = outGoingFlights.filter(
    (outGoingFlight) => outGoingFlight.arrival.airport.icao === toAirport!.icao
  );

  const { setMenuWide } = useContext(MainContext);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferredAirline]);

  useEffect(() => {
    setFoundFlights(allUnfilteredFoundFlights);
    setMenuWide(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFlightPrices = (flight: Departures): FlightPrices => {
    const baseFare = 20;
    const flightSurCharges = 10;
    return { baseFare, flightSurCharges };
  };

  const [flightPrice, setFlightPrice] = useState<FlightPrices | null>(null);

  const initiateBooking = (flight: Departures) => {
    setFoundFlights([flight]);
    setBooking(true);
    setFlightPrice(fetchFlightPrices(flight));
  };
  const [showPayments, setShowPayments] = useState(false);
  const [travelersInfo, setTravelersInfo] = useState<TravelerInfo | null>(null);

  return (
    <BookingContext.Provider
      value={{
        initiateBooking,
        travelersInfo,
        flightPrice,
        booking,
        setTravelersInfo,
      }}
    >
      <FlightSearchParameters />
      {showPayments ? (
        <PaymentOptions
          setShowPayments={setShowPayments}
          allUnfilteredFoundFlights={allUnfilteredFoundFlights}
          setFoundFlights={setFoundFlights}
          setBooking={setBooking}
        />
      ) : (
        <>
          <div className="flex sticky top-0 justify-between">
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
                <Outlet />
              </div>
            </div>
            {booking ? (
              <div className="w-1/5 mr-6">
                <FareSummary />
                <GoButton setShowPayments={setShowPayments} />
              </div>
            ) : (
              <FlightFilter
                setPreferredStopAirport={setPreferredStopAirport}
                preferredStopAirport={preferredStopAirport}
                setPreferredAirline={setPreferredAirline}
              />
            )}
          </div>
        </>
      )}
    </BookingContext.Provider>
  );
};

export default FlightResults;
