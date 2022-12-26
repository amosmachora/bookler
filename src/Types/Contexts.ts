import { SetStateAction } from "react";
import { Airline, Airport, Country, Departures, TravelerInfo } from "./Flights";
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
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAirports: React.Dispatch<React.SetStateAction<Airport[]>>;
  setAirlines: React.Dispatch<React.SetStateAction<Airline[]>>;
  setDevMode: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuWide: React.Dispatch<React.SetStateAction<boolean>>;
  setCountryList: React.Dispatch<React.SetStateAction<Country[]>>;
  isLoading: boolean;
  airports: Airport[];
  airlines: Airline[];
  devMode: boolean;
  countryList: Country[];
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

export interface CarRentalSearch {
  pickUpDate: Date | null;
  setPickUpDate: React.Dispatch<React.SetStateAction<Date | null>>;
  dropOffDate: Date | null;
  setDropOffDate: React.Dispatch<React.SetStateAction<Date | null>>;
  pickUpTime: string;
  setPickUpTime: React.Dispatch<React.SetStateAction<string>>;
  dropOffTime: string;
  setDropOffTime: React.Dispatch<React.SetStateAction<string>>;
  dropCarAtDifferentLocation: boolean;
  setDropCarAtDifferentLocation: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Authenticator {
  profilePicture: string | null;
  userName: string | null;
  accountType: string | null;
  birthday: string | null;
  gender: string | null;
  address: string | null;
  login: LoginDetails;
}

export type LoginDetails = {
  emailAddress: string | null;
  mobileNumber: string | null;
  password: string | null;
};
