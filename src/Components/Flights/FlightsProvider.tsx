import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchAirportFlightData } from "../../Fetchers/FetchAirportFlightData";
import { useUpdateLogger } from "../../Hooks/useUpdateLogger";
import { FlightSearchParametersContext } from "../../Types/Contexts";
import { Airport, Departures } from "../../Types/Flights";
import { MainContext } from "../Contexts/MainAppProvider";
import LoadingScreen from "../LoadingScreen";

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
    setDepartureDate: () => {},
    setFromAirport: () => {},
    setReturnDate: () => {},
    setToAirport: () => {},
    setTypeOfTrip: () => {},
  }
);

const FlightsProvider = ({ children }: { children: React.ReactNode }) => {
  const { devMode } = useContext(MainContext);
  const [toAirport, setToAirport] = useState<Airport | null>(null);
  const [typeOfTrip, setTypeOfTrip] = useState("one-way");
  const [fromAirport, setFromAirport] = useState<Airport | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [outGoingFlights, setOutGoingFlights] = useState<Departures[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!devMode && fromAirport) {
      setIsLoading(true);
      fetchAirportFlightData(fromAirport).then((res) =>
        setOutGoingFlights(res)
      );
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromAirport]);

  useUpdateLogger(fromAirport, "fromAirport");

  useUpdateLogger(outGoingFlights, "outGoingFlights");

  return (
    <FlightSearchContext.Provider
      value={{
        typeOfTrip,
        fromAirport,
        toAirport,
        departureDate,
        returnDate,
        outGoingFlights,
        setToAirport,
        setFromAirport,
        setTypeOfTrip,
        setDepartureDate,
        setReturnDate,
      }}
    >
      {isLoading && <LoadingScreen />}
      {children}
    </FlightSearchContext.Provider>
  );
};

export default FlightsProvider;
