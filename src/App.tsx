import React, { useState, useEffect, createContext } from "react";
import { Assets } from "./Assets/Assets";
import BackGround from "./Components/BackGround/BackGround";
import BecomeAPartner from "./Components/BecomeAPartner";
import Menu from "./Components/Menu/Menu";
import Options from "./Components/Options";
import Overlay from "./Components/Overlay";
import ProfileInfo from "./Components/ProfileInfo";
import Reach from "./Components/Reach/Reach";
import DevAirports from "./Util/Airports.json";
import { Airline, Airport } from "./Types/Flights";
import { fetchAirports } from "./Fetchers/FetchAirports";
import { MainContextValue } from "./Types/Contexts";
import Airlines from "./Util/Airlines.json";
import { fetchAirlines } from "./Fetchers/FetchAirlines";
import {
  CountriesWithStateAndCities,
  fetchCountries,
} from "./Fetchers/FetchCountries";
import { Outlet } from "react-router";

export const MainContext = createContext<MainContextValue>({
  isLoading: false,
  airports: [],
  airlines: [],
  devMode: false,
  countriesList: {},
  setDevMode: () => {},
  setMenuWide: () => {},
  menuWide: false,
});

function App() {
  const [overlay, setOverlay] = useState(false);
  const [airports, setAirports] = useState<Airport[]>(DevAirports.rows);
  const [isLoading, setIsLoading] = useState(false);
  const [menuWide, setMenuWide] = useState(true);
  const [devMode, setDevMode] = useState(true);
  const [airlines, setAirlines] = useState<Airline[]>(Airlines.rows);
  const [countriesList, setCountriesList] = useState<
    CountriesWithStateAndCities[]
  >([]);

  useEffect(() => {
    const initializeApplication = async () => {
      await fetchAirports().then((res) => setAirports(res));
      await fetchCountries().then((res) => setCountriesList(res));
      setAirlines(fetchAirlines());
    };
    if (!devMode) {
      setIsLoading(true);
      initializeApplication();
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[], devMode]);

  return (
    <MainContext.Provider
      value={{
        isLoading,
        airports,
        airlines,
        devMode,
        countriesList,
        setDevMode,
        setMenuWide,
        menuWide,
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
              <Options menuWide={menuWide} />
              {menuWide && (
                <img src={Assets.Plane} alt="Plane" className="w-40 h-14" />
              )}
            </div>
            <Outlet />
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
