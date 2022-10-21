import { createContext } from "react";
import { Airport, Departures } from "./Flights";

interface SearchParameters {
  toAirport: Airport;
  returnDate: Date | null | undefined;
  departureDate: Date | null | undefined;
  typeOfTrip: string;
  fromAirport: Airport;
  devMode: boolean;
  outGoingFlights: Departures[];
}

interface MainContextValue {
  isLoading: boolean;
  airports: Airport[];
}

export const SearchContext = createContext<SearchParameters>({
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
  devMode: false,
  outGoingFlights: [],
});

export const MainContext = createContext<MainContextValue>({
  isLoading: false,
  airports: [],
});
