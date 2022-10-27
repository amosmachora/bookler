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
import SearchParametersDisplay from "./Components/searchParametersDisplay";
import DevAirports from "./Util/Airports.json";
import DevAirportFlightData from "./Util/AirportFlightData.json";
import { Airport, Arrival, Departures } from "./Types/Flights";
import { fetchAirportFlightData } from "./Fetchers/FetchAirportFlightData";
import { fetchAirports } from "./Fetchers/FetchAirports";
import { MainContextValue, SearchParameters } from "./Types/Contexts";

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

  useEffect(() => {
    const fetchAirport = async () => {
      await fetchAirports().then((res) => setAirports(res));
    };

    if (!devMode) {
      setIsLoading(true);
      fetchAirport();
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

  return (
    <MainContext.Provider
      value={{
        isLoading,
        airports,
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
            className={`h-min absolute ${
              menuWide
                ? "top-1/4 left-1/4 w-2/3"
                : "top-[34px] left-[12%] w-[87%]"
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
            {menuWide ? (
              activeChoice === "flights" ? (
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
              ) : null
            ) : (
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
            )}
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
