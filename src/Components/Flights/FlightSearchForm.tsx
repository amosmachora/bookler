import React, { SetStateAction, useContext, useState, useRef } from "react";
import { MainContext } from "../../App";
import { Assets } from "../../Assets/Assets";
import { MoreButton } from "../MoreButton";
import { Airport } from "../../Types/Flights";
import { getDay } from "../../Util/Helpers";
import { FlightSearchContext } from "./Flights";
import { FromAirportInput } from "./FromAirportInput";
import { ToAirportInput } from "./ToAirportInput";
import AirportSearch from "../SearchModals/AirportSearch";
import { Link } from "react-router-dom";

type SearchFormProps = {
  setTypeOfTrip: React.Dispatch<SetStateAction<string>>;
  setDepartureDate: React.Dispatch<SetStateAction<Date | null | undefined>>;
  setReturnDate: React.Dispatch<SetStateAction<Date | null | undefined>>;
  setSearchType: React.Dispatch<SetStateAction<string>>;
  searchType: string;
  setFromAirport: React.Dispatch<React.SetStateAction<Airport>>;
  setToAirport: React.Dispatch<React.SetStateAction<Airport>>;
};

const FlightSearchForm = ({
  setFromAirport,
  setToAirport,
  setTypeOfTrip,
  setDepartureDate,
  setReturnDate,
  setSearchType,
  searchType,
}: SearchFormProps) => {
  const { typeOfTrip, outGoingFlights } = useContext(FlightSearchContext);
  const { menuWide, setMenuWide } = useContext(MainContext);

  const [airportSearchModal, setAirportSearchModal] = useState(false);
  const departureDateInput = useRef<HTMLInputElement | null>(null);
  const returnDateInput = useRef<HTMLInputElement | null>(null);
  const { airports } = useContext(MainContext);
  const { setSearchAirports } = useContext(FlightSearchContext);

  const openFromSearchModal = () => {
    setSearchType("from");
    setAirportSearchModal(true);
    setSearchAirports(airports);
  };

  const openToSearchModal = () => {
    setSearchType("to");
    setAirportSearchModal(true);
    setSearchAirports(
      airports.filter((airport) =>
        outGoingFlights
          .map((flight) => flight.arrival.airport.icao)
          .includes(airport.icao)
      )
    );
  };

  return (
    <div className={`bg-white p-10 rounded-2xl ${menuWide ? "mt-5" : "mt-10"}`}>
      <form>
        <div className="type-of-trip flex [&>*]:rounded-full [&>*]:text-sm [&>*]:py-2 [&>*]:px-6 [&>*]:mr-8 [&>*]:cursor-pointer">
          <p
            className={`${typeOfTrip === "one-way" ? "bg-gray-100" : ""}`}
            onClick={() => setTypeOfTrip("one-way")}
          >
            One way
          </p>
          <p
            className={`${typeOfTrip === "round-trip" ? "bg-gray-100" : ""}`}
            onClick={() => setTypeOfTrip("round-trip")}
          >
            Round Trip
          </p>
          <p
            className={`${typeOfTrip === "multi-city" ? "bg-gray-100" : ""}`}
            onClick={() => setTypeOfTrip("multi-city")}
          >
            Multi City
          </p>
        </div>
        <div className="flex mt-5 [&>*]:bg-gray-100 [&>*]:rounded-lg [&>*]:cursor-pointer [&>*]:border [&>*]:px-4 [&>*]:py-2 justify-between">
          <FromAirportInput openFromSearchModal={openFromSearchModal} />
          <ToAirportInput openToSearchModal={openToSearchModal} />
          <div className="Option w-1/4">
            <div className="flex">
              <img src={Assets.Class} alt="Location Pointer" />
              <p className="text-gray-400 text-xs ml-1">CLASS</p>
            </div>
            <p className="from-location text-base font-bold mb-1">3 Persons</p>
            <div className="from-airport text-xs text-gray-400 w-full flex justify-between">
              <p>Business</p>
              <img src={Assets.DropDownGray} alt="Drop down" />
            </div>
          </div>
        </div>
        <div className="flex mt-5 justify-between">
          <div
            className="w-[25%] bg-gray-100 border py-2 px-4 rounded-lg cursor-pointer"
            onClick={() => {
              departureDateInput.current?.focus();
            }}
          >
            <div className="flex justify-between">
              <div className="flex">
                <img src={Assets.Calendar} alt="Calendar" />
                <p className="text-xs ml-1 text-gray-400">Departure</p>
              </div>
              <img src={Assets.DropDownGray} alt="Drop down" />
            </div>
            <input
              type="date"
              name="date-time-selector-1"
              id="date-time-selector-1"
              className="bg-gray-100 w-full font-bold outline-none"
              ref={departureDateInput}
              onChange={(e) => setDepartureDate(e.target.valueAsDate)}
            />
            <p className="text-xs text-gray-400">
              {getDay(departureDateInput.current?.valueAsDate)}
            </p>
          </div>
          <div
            className="w-[25%] bg-gray-100 border py-2 px-4 rounded-lg cursor-pointer"
            onClick={() => returnDateInput.current?.focus()}
          >
            <div className="flex justify-between">
              <div className="flex">
                <img src={Assets.Calendar} alt="Calendar" />
                <p className="text-xs ml-1 text-gray-400">Return</p>
              </div>
              <img src={Assets.DropDownGray} alt="Drop down" />
            </div>
            <input
              type="date"
              className="font-bold bg-gray-100 w-full"
              name="date-time-selector-2"
              id="date-time-selector-2"
              ref={returnDateInput}
              onChange={(e) => setReturnDate(e.target.valueAsDate)}
            />
            <p className="text-xs text-gray-400">
              {getDay(returnDateInput.current?.valueAsDate)}
            </p>
          </div>
          <MoreButton />
          <Link
            to="flight-results"
            className="bg-red-600 text-white rounded-lg w-[22.4%] cursor-pointer"
            onClick={() => setMenuWide((prev) => !prev)}
          >
            <p>SEARCH FLIGHT</p>
          </Link>
        </div>
      </form>
      {airportSearchModal && (
        <AirportSearch
          closeModalFunction={setAirportSearchModal}
          typeOfSearch={searchType}
          setToAirport={setToAirport}
          setFromAirport={setFromAirport}
        />
      )}
    </div>
  );
};

export default FlightSearchForm;
