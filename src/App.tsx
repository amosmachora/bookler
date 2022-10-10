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

export type searchParameters = {
  fromAirport: Airport;
  toAirport: Airport;
  departureDate: Date | null | undefined;
  returnDate: Date | null | undefined;
  typeOfTrip: string;
};

function App() {
  const [activeChoice, setActiveChoice] = useState("flights");
  const [overlay, setOverlay] = useState(false);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [menuWide, setMenuWide] = useState(true);
  const [searchParameters, setSearchParameters] = useState<searchParameters>();

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
                  setSearchParameters={setSearchParameters}
                />
              ) : null}
            </MainContext.Provider>
          ) : (
            <SearchParametersDisplay searchParameters={searchParameters} />
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
