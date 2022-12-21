import { Airline, Airport, Country, Departures, TravelerInfo } from "./Flights";
import { TravellerHotelInfo } from "./Hotel";

export interface FlightSearchParametersContext {
  toAirport: Airport;
  returnDate: Date | null | undefined;
  departureDate: Date | null | undefined;
  typeOfTrip: string;
  fromAirport: Airport;
  outGoingFlights: Departures[];
}

export interface MainContextValue {
  isLoading: boolean;
  airports: Airport[];
  airlines: Airline[];
  devMode: boolean;
  searchAirports: Airport[];
  setSearchAirports: React.Dispatch<React.SetStateAction<Airport[]>>;
  countryList: Country[];
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
