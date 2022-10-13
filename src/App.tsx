import React, { useState, useEffect, createContext } from "react";
import "./App.css";
import { Assets } from "./Assets/Assets";
import BackGround from "./Components/BackGround/BackGround";
import BecomeAPartner from "./Components/BecomeAPartner";
import Menu from "./Components/Menu/Menu";
import Options from "./Components/Options";
import Overlay from "./Components/Overlay";
import ProfileInfo from "./Components/ProfileInfo";
import Reach from "./Components/Reach/Reach";
import SearchForm from "./Components/SearchForm";
import SearchParametersDisplay from "./Components/searchParametersDisplay";
import AirPortData from "./Util/AirportFlightData.json";

type timezone = {
  abbr: string;
  abbrName: string;
  isDst: boolean;
  name: string;
  offset: number;
  offsetHours: string;
};

export type Airport = {
  alt: number;
  city: string;
  country: string;
  countryId: number;
  iata: string;
  icao: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  size: number;
  timezone: timezone;
};

interface MainContextValue {
  isLoading: boolean;
  airports: Airport[];
}

export const MainContext = createContext<MainContextValue>({
  isLoading: false,
  airports: [],
});

type aircraft = {
  reg?: string | undefined;
  modeS?: string | undefined;
  model: string;
};

type airline = {
  name: string;
};

type airportMin = {
  iata?: string | undefined;
  icao?: string | undefined;
  name: string;
};

type arrival = {
  actualTimeLocal?: string | undefined;
  actualTimeUtc?: string | undefined;
  baggageBelt?: string;
  gate?: string | undefined;
  quality: Array<string>;
  runwayTimeLocal?: string | undefined;
  scheduledTimeLocal?: string;
  scheduledTimeUtc?: string;
  terminal?: string | undefined;
};

type departure = {
  airport: airportMin;
  quality: Array<string>;
  actualTimeLocal?: string;
  actualTimeUtc?: string;
  gate?: string | undefined;
  scheduledTimeLocal?: string;
  scheduledTimeUtc?: string;
  terminal?: string;
};

type Arrival = {
  aircraft: aircraft;
  airline: airline;
  arrival: arrival;
  codeshareStatus: string;
  departure: departure;
  isCargo: boolean;
  number: string;
  status: string;
};

type Departures = {
  //TODO Complete creating departures.
};

function App() {
  const [activeChoice, setActiveChoice] = useState("flights");
  const [overlay, setOverlay] = useState(false);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [menuWide, setMenuWide] = useState(true);
  const [typeOfTrip, setTypeOfTrip] = useState("one-way");
  const [fromAirport, setFromAirport] = useState<Airport>(airports[0]);
  const [toAirport, setToAirport] = useState<Airport>(airports[0]);
  const [departureDate, setDepartureDate] = useState<Date | null>();
  const [returnDate, setReturnDate] = useState<Date | null>();
  const [airportArrivals, setAirportArrivals] = useState<Arrival[]>(
    AirPortData.arrivals
  );
  const [airportDepartures, setAirportDepartures] = useState(
    AirPortData.departures
  );

  console.log(airportArrivals);
  console.log(airportDepartures);

  const GlobalState = {
    isLoading,
    airports,
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "c890ab4a16msh7c633ea6110821ap1e3f64jsn0ed6b1319c46",
        "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
      },
    };
    setIsLoading(true);
    fetch("https://flight-radar1.p.rapidapi.com/airports/list", options)
      .then((response) => response.json())
      .then((response) => {
        setAirports(response.rows);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

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
            <MainContext.Provider value={GlobalState}>
              {activeChoice === "flights" ? (
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
                />
              ) : null}
            </MainContext.Provider>
          ) : (
            <SearchParametersDisplay
              fromAirport={fromAirport}
              toAirport={toAirport}
              returnDate={returnDate}
              departureDate={departureDate}
              typeOfTrip={typeOfTrip}
            />
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
  );
}

export default App;
