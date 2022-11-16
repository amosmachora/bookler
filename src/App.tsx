import React, { useState, useEffect, createContext } from "react";
import { Assets } from "./Assets/Assets";
import BackGround from "./Components/BackGround/BackGround";
import BecomeAPartner from "./Components/BecomeAPartner";
import FlightResults from "./Components/FlightResults/FlightResults";
import Menu from "./Components/Menu/Menu";
import Options from "./Components/Options";
import Overlay from "./Components/Overlay";
import ProfileInfo from "./Components/ProfileInfo";
import Reach from "./Components/Reach/Reach";
import SearchForm from "./Components/SearchForm";
import DevAirports from "./Util/Airports.json";
import DevAirportFlightData from "./Util/AirportFlightData.json";
import { Airline, Airport, Arrival, Departures } from "./Types/Flights";
import { fetchAirportFlightData } from "./Fetchers/FetchAirportFlightData";
import { fetchAirports } from "./Fetchers/FetchAirports";
import {
  HotelSearch,
  MainContextValue,
  SearchParameters,
} from "./Types/Contexts";
import Airlines from "./Util/Airlines.json";
import { fetchAirlines } from "./Fetchers/FetchAirlines";
import HotelSearchForm from "./Pages/HotelSearchForm";
import SearchParametersDisplay from "./Components/SearchParameters";
import HotelSearchResults from "./Pages/HotelSearchResults";

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
  airlines: [],
  devMode: false,
});

export const HotelSearchContext = createContext<HotelSearch>(null as any);

function App() {
  const [activeChoice, setActiveChoice] = useState("flights");
  const [overlay, setOverlay] = useState(false);
  const [airports, setAirports] = useState<Airport[]>(DevAirports.rows);
  const [isLoading, setIsLoading] = useState(false);
  const [menuWide, setMenuWide] = useState(true);
  const [typeOfTrip, setTypeOfTrip] = useState("one-way");
  const [fromAirport, setFromAirport] = useState<Airport>(airports[0]);
  const [toAirport, setToAirport] = useState<Airport>(airports[0]);
  const [departureDate, setDepartureDate] = useState<Date | null>();
  const [returnDate, setReturnDate] = useState<Date | null>();
  const [devMode, setDevMode] = useState(true);
  const [searchAirports, setSearchAirports] = useState<Airport[]>([]);
  const [searchType, setSearchType] = useState("from");
  const [outGoingFlights, setOutGoingFlights] = useState<Departures[]>(
    DevAirportFlightData.departures
  );
  const [incomingFlights, setIncomingFlights] = useState<Arrival[]>(
    DevAirportFlightData.arrivals
  );
  const [airlines, setAirlines] = useState<Airline[]>(Airlines.rows);
  const [destinationsInTargetLocation, setDestinationsInTargetLocation] =
    useState({});
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  console.log(checkInDate);
  console.log(checkOutDate);

  useEffect(() => {
    const fetchFromApi = async () => {
      await fetchAirports().then((res) => setAirports(res));
      setAirlines(fetchAirlines());
    };

    if (!devMode) {
      setIsLoading(true);
      fetchFromApi();
      setIsLoading(false);
    }
  }, [[], devMode]);

  useEffect(() => {
    if (!devMode) {
      const outGoingFlights = fetchAirportFlightData(fromAirport);
      if (outGoingFlights.length === 0) {
        setDevMode(true);
      } else {
        setOutGoingFlights(outGoingFlights);
      }
    }
  }, [fromAirport, devMode]);

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

  const renderTab = (): JSX.Element | undefined => {
    if (activeChoice === "flights") {
      return (
        <SearchForm
          setOverlay={setOverlay}
          setMenuWide={setMenuWide}
          menuWide={menuWide}
          toAirport={toAirport}
          setToAirport={setToAirport}
          fromAirport={fromAirport}
          setFromAirport={setFromAirport}
          typeOfTrip={typeOfTrip}
          setTypeOfTrip={setTypeOfTrip}
          setDepartureDate={setDepartureDate}
          setReturnDate={setReturnDate}
          searchAirports={searchAirports}
          setSearchAirports={setSearchAirports}
          setSearchType={setSearchType}
          searchType={searchType}
          outGoingFlights={outGoingFlights}
        />
      );
    } else if (activeChoice === "hotel") {
      return (
        <HotelSearchForm toAirport={toAirport} setMenuWide={setMenuWide} />
      );
    }
  };

  const renderResults = (): JSX.Element | undefined => {
    if (activeChoice === "flights") {
      return (
        <SearchContext.Provider
          value={{
            typeOfTrip,
            fromAirport,
            departureDate,
            returnDate,
            toAirport,
            devMode,
            outGoingFlights,
          }}
        >
          <SearchParametersDisplay />
          <FlightResults />
        </SearchContext.Provider>
      );
    } else if (activeChoice === "hotel") {
      return <HotelSearchResults toAirport={toAirport} />;
    }
  };

  return (
    <MainContext.Provider
      value={{
        isLoading,
        airports,
        airlines,
        devMode,
      }}
    >
      <div className="App w-full">
        {overlay && <Overlay setOverlay={setOverlay} />}
        {isLoading && (
          <>
            <Overlay setOverlay={setOverlay} />
            <Reach />
          </>
        )}
        <BackGround menuWide={menuWide} />
        <div className="flex relative">
          <Menu menuWide={menuWide} setMenuWide={setMenuWide} />
          <div
            className={`h-min ${
              menuWide
                ? "top-1/4 left-1/4 w-2/3 fixed"
                : "top-[34px] left-[12%] w-[87%] absolute"
            } transition-all`}
          >
            <div className="flex justify-between">
              <Options
                activeChoice={activeChoice}
                setActiveChoice={setActiveChoice}
                menuWide={menuWide}
              />
              {menuWide && (
                <img src={Assets.Plane} alt="Plane" className="w-40 h-14" />
              )}
            </div>
            <HotelSearchContext.Provider
              value={{
                checkInDate,
                checkOutDate,
                setCheckInDate,
                setCheckOutDate,
              }}
            >
              {menuWide ? renderTab() : renderResults()}
            </HotelSearchContext.Provider>
          </div>
        </div>
        <div className="flex absolute right-14 top-[34px]">
          <BecomeAPartner />
          <ProfileInfo
            profilePicture={Assets.ProfilePicture}
            userName="Mansurul Haque"
          />
        </div>
      </div>
    </MainContext.Provider>
  );
}

export default App;
