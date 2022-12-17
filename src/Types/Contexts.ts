import { SetStateAction } from "react";
import { Airline, Airport, Departures, TravelerInfo } from "./Flights";
import { TravellerHotelInfo } from "./Hotel";

export interface FlightSearchParametersContext extends SearchFormProps {
  toAirport: Airport;
  returnDate: Date | null | undefined;
  departureDate: Date | null | undefined;
  typeOfTrip: string;
  fromAirport: Airport;
  outGoingFlights: Departures[];
  searchAirports: Airport[];
  setSearchAirports: React.Dispatch<React.SetStateAction<Airport[]>>;
}

type SearchFormProps = {
  setTypeOfTrip: React.Dispatch<SetStateAction<string>>;
  setDepartureDate: React.Dispatch<SetStateAction<Date | null | undefined>>;
  setReturnDate: React.Dispatch<SetStateAction<Date | null | undefined>>;
  setSearchType: React.Dispatch<SetStateAction<string>>;
  searchType: string;
  setFromAirport: React.Dispatch<React.SetStateAction<Airport>>;
  setToAirport: React.Dispatch<React.SetStateAction<Airport>>;
};

export interface MainContextValue {
  isLoading: boolean;
  airports: Airport[];
  airlines: Airline[];
  devMode: boolean;
  countriesList: object;
  setDevMode: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuWide: React.Dispatch<React.SetStateAction<boolean>>;
  menuWide: boolean;
}

export interface BookingContextType {
  initiateBooking: (flight: Departures) => void;
  travelersInfo: TravelerInfo | null;
  flightPrice: FlightPrices | null;
  booking: boolean;
  setTravelersInfo: React.Dispatch<React.SetStateAction<TravelerInfo | null>>;
}

export type FlightPrices = {
  baseFare: number;
  flightSurCharges: number;
};

export interface HotelSearch {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  setCheckInDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setCheckOutDate: React.Dispatch<React.SetStateAction<Date | null>>;
  targetHotelLocation: Airport | null;
  setTargetHotelLocation: React.Dispatch<React.SetStateAction<Airport | null>>;
  travellerHotelInfo: TravellerHotelInfo;
  setTravellerHotelInfo: React.Dispatch<
    React.SetStateAction<TravellerHotelInfo>
  >;
}
