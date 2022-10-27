import { Airport, Departures } from "./Flights";

export interface SearchParameters {
  toAirport: Airport;
  returnDate: Date | null | undefined;
  departureDate: Date | null | undefined;
  typeOfTrip: string;
  fromAirport: Airport;
  devMode: boolean;
  outGoingFlights: Departures[];
}

export interface MainContextValue {
  isLoading: boolean;
  airports: Airport[];
}
