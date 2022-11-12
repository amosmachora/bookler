import { Airline, Airport, Departures, TravelerInfo } from "./Flights";

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
  airlines: Airline[];
  devMode: boolean;
}

export interface BookingContextType {
  initiateBooking: (flight: Departures) => void;
  travelersInfo: TravelerInfo | null;
  flightPrice: FlightPrices | null;
  booking: boolean;
}

export type FlightPrices = {
  baseFare: number;
  flightSurCharges: number;
};
