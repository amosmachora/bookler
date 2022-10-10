import React, {
  SetStateAction,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { Airport, MainContext, searchParameters } from "../App";
import { Assets } from "../Assets/Assets";
import AirportSearch from "./SearchModals/AirportSearch";
import axios from "axios";

type SearchFormProps = {
  setOverlay: (c: boolean) => void;
  setMenuWide: React.Dispatch<SetStateAction<boolean>>;
  menuWide: boolean;
  setSearchParameters: React.Dispatch<
    SetStateAction<searchParameters | undefined>
  >;
};

const SearchForm = ({
  setOverlay,
  setMenuWide,
  menuWide,
  setSearchParameters,
}: SearchFormProps) => {
  const { airports } = useContext(MainContext);
  const [typeOfTrip, setTypeOfTrip] = useState("one-way");
  const [airportSearchModal, setAirportSearchModal] = useState(false);
  const [fromAirport, setFromAirport] = useState<Airport>(airports[0]);
  const [toAirport, setToAirport] = useState<Airport>(airports[0]);
  const [searchType, setSearchType] = useState("");
  const departureDateInput = useRef<HTMLInputElement | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>();
  const [returnDate, setReturnDate] = useState<Date | null>();
  const returnDateInput = useRef<HTMLInputElement | null>(null);

  /**
   * A function to randomly decide a default airport.
   * @Returns A random airport.
   */
  function getRandomAirport() {
    const min = 0;
    const max = airports.length;
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    const randomAirport = airports[randomNumber];
    return randomAirport;
  }

  useEffect(() => {
    setFromAirport(getRandomAirport());
    setToAirport(getRandomAirport());
  }, [airports.length]);

  const fetchAirportFlightData = (airport: Airport) => {
    console.log("Searching data for " + airport.name);
    const options = {
      method: "GET",
      url: `https://aerodatabox.p.rapidapi.com/flights/airports/icao/${airport.icao}/2022-10-07T20:00/2022-10-08T08:00`,
      params: {
        withLeg: "true",
        withCancelled: "true",
        withCodeshared: "true",
        withCargo: "true",
        withPrivate: "true",
        withLocation: "false",
      },
      headers: {
        "X-RapidAPI-Key": "c890ab4a16msh7c633ea6110821ap1e3f64jsn0ed6b1319c46",
        "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    if (airports.length > 0) {
      fetchAirportFlightData(fromAirport);
    }
  }, [fromAirport]);

  /**
   * A function to open or close the search modals.
   * @param name name of the modal.
   * @param state boolean value to indicate whether to open or close modal
   */
  const handleSearchModal = (name: string, state: boolean) => {
    const modalState = state;
    setOverlay(modalState);
    if (name === "from") {
      setAirportSearchModal(modalState);
      setSearchType(name);
    } else if (name === "to") {
      setAirportSearchModal(modalState);
      setSearchType(name);
    }
  };

  /**
   * Start the flight search
   */
  const searchFlight = (e: React.FormEvent) => {
    e.preventDefault();
    setMenuWide((prev) => !prev);
    setSearchParameters({
      fromAirport,
      toAirport,
      departureDate,
      returnDate,
      typeOfTrip,
    });
  };

  const getDay = (date: Date | null | undefined) => {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    if (date == null || date == undefined) {
      return "Sunday";
    }
    return weekdays[date.getDay()];
  };

  return (
    <div className={`bg-white p-10 rounded-2xl ${menuWide ? "mt-5" : "mt-10"}`}>
      <form action="">
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
          <div
            className="Option w-[32.8%]"
            onClick={() => handleSearchModal("from", true)}
          >
            <div className="flex">
              <img src={Assets.LocationPointer} alt="Location Pointer" />
              <p className="text-gray-400 text-xs ml-1">FROM</p>
            </div>
            <p className="from-location text-base font-bold mb-1">
              {fromAirport === undefined
                ? "Dhaka, Bangladesh"
                : fromAirport.city + ", " + fromAirport.country}
            </p>
            <p className="from-airport text-xs text-gray-400">
              {fromAirport === undefined
                ? "Usmani airport, Sylhet"
                : fromAirport.name}
            </p>
          </div>
          <div
            className="Option w-[32.8%]"
            onClick={() => handleSearchModal("to", true)}
          >
            <div className="flex">
              <img src={Assets.LocationPointer} alt="Location Pointer" />
              <p className="text-gray-400 text-xs ml-1">TO</p>
            </div>
            <p className="from-location text-base font-bold mb-1">
              {toAirport === undefined
                ? "Delhi, India"
                : toAirport.city + ", " + toAirport.country}
            </p>
            <p className="from-airport text-xs text-gray-400">
              {toAirport === undefined
                ? "Shuvas chandra bosu airport"
                : toAirport.name}
            </p>
          </div>
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
          <div className="w-[14%] bg-gray-100 border py-2 px-4 rounded-lg cursor-pointer">
            <div className="flex justify-between">
              <div className="flex">
                <img src={Assets.Calendar} alt="Calendar" />
                <p className="text-xs ml-1 text-gray-400">Return</p>
              </div>
              <img src={Assets.DropDownGray} alt="Drop down" />
            </div>
            <p className="font-bold text-base mb-1">More</p>
            <div>...</div>
          </div>
          <input
            type="submit"
            value="SEARCH FLIGHT"
            className="bg-red-600 text-white rounded-lg w-[22.4%] cursor-pointer"
            onClick={(e) => searchFlight(e)}
          />
        </div>
      </form>
      {airportSearchModal && (
        <AirportSearch
          handleSearchModal={handleSearchModal}
          typeOfSearch={searchType}
          setToAirport={setToAirport}
          setFromAirport={setFromAirport}
        />
      )}
    </div>
  );
};

export default SearchForm;
