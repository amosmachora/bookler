import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { MainContext } from "../../App";
import { fetchAirportFlightData } from "../../Fetchers/FetchAirportFlightData";
import { FlightSearchParametersContext } from "../../Types/Contexts";
import { Airport, Departures } from "../../Types/Flights";
import DevAirportFlightData from "../../Util/AirportFlightData.json";

export const FlightSearchContext = createContext<FlightSearchParametersContext>(
  {
    toAirport: {
      alt: 0,
      city: "",
      country: "",
      countryId: 0,
      iata: "",
      icao: "",
      id: 0,
      lat: 0,
      lon: 0,
      name: "",
      size: 0,
      timezone: null,
    },
    returnDate: null,
    departureDate: null,
    typeOfTrip: "",
    fromAirport: {
      alt: 0,
      city: "",
      country: "",
      countryId: 0,
      iata: "",
      icao: "",
      id: 0,
      lat: 0,
      lon: 0,
      name: "",
      size: 0,
      timezone: null,
    },
    outGoingFlights: [],
    searchAirports: [],
    setSearchAirports: () => {},
    searchType: "from",
    setDepartureDate: () => {},
    setFromAirport: () => {},
    setReturnDate: () => {},
    setSearchType: () => {},
    setToAirport: () => {},
    setTypeOfTrip: () => {},
  }
);

const Flights = () => {
  const { airports, devMode, setDevMode } = useContext(MainContext);
  const [toAirport, setToAirport] = useState<Airport>(airports[0]);
  const [typeOfTrip, setTypeOfTrip] = useState("one-way");
  const [fromAirport, setFromAirport] = useState<Airport>(airports[0]);
  const [departureDate, setDepartureDate] = useState<Date | null>();
  const [returnDate, setReturnDate] = useState<Date | null>();
  const [searchType, setSearchType] = useState("from");
  const [outGoingFlights, setOutGoingFlights] = useState<Departures[]>(
    DevAirportFlightData.departures
  );
  const [searchAirports, setSearchAirports] = useState<Airport[]>(airports);

  useEffect(() => {
    if (!devMode) {
      const outGoingFlights = fetchAirportFlightData(fromAirport);
      if (outGoingFlights.length === 0) {
        setDevMode(true);
      } else {
        setOutGoingFlights(outGoingFlights);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromAirport, devMode]);

  /**
   * A function to randomly decide a default airport.
   * @Returns A random airport object.
   */
  function getRandomAirport(): Airport {
    const min = 0;
    const max = airports.length;
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    const randomAirport = airports[randomNumber];
    return randomAirport;
  }

  useEffect(() => {
    setFromAirport(getRandomAirport());
    setToAirport(getRandomAirport());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airports.length]);

  return (
    <FlightSearchContext.Provider
      value={{
        typeOfTrip,
        fromAirport,
        departureDate,
        returnDate,
        toAirport,
        outGoingFlights,
        searchAirports,
        setSearchAirports,
        setToAirport,
        setFromAirport,
        setTypeOfTrip,
        setDepartureDate,
        setReturnDate,
        setSearchType,
        searchType,
      }}
    >
      <Outlet />
    </FlightSearchContext.Provider>
  );
};

export default Flights;
