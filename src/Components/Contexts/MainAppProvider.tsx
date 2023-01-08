import React, { createContext, useEffect, useState } from "react";
import { MainContextValue } from "../../Types/Contexts";
import { Airline, Airport, Country } from "../../Types/Flights";
// import { fetchCountryList } from "../../Fetchers/FetchCountryList";
import { fetchAirports } from "../../Fetchers/FetchAirports";
import { fetchAirlines } from "../../Fetchers/FetchAirlines";
import LoadingScreen from "../LoadingScreen";
import { useUpdateLogger } from "../../Hooks/useUpdateLogger";

export const MainContext = createContext<MainContextValue>({
  isLoading: false,
  airports: [],
  airlines: [],
  devMode: true,
  countryList: [],
  setDevMode: () => {},
  setMenuWide: () => {},
  setIsLoading: () => {},
  setAirports: () => {},
  setAirlines: () => {},
  setCountryList: () => {},
  menuWide: true,
});

const MainAppProvider = ({ children }: { children: React.ReactNode }) => {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [menuWide, setMenuWide] = useState(true);
  const [devMode, setDevMode] = useState(false);
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [countryList, setCountryList] = useState<Country[]>([]);

  //TODO country api is not working. fix it
  useEffect(() => {
    const initializeApplication = async () => {
      await fetchAirports().then((res) => setAirports(res));
      // await fetchCountryList().then((res) => setCountryList(res));
      await fetchAirlines().then((res) => setAirlines(res));
    };
    if (!devMode) {
      setIsLoading(true);
      initializeApplication();
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUpdateLogger(airports, "airports");

  useUpdateLogger(isLoading, "isLoading");

  return (
    <MainContext.Provider
      value={{
        setIsLoading,
        isLoading,
        setAirports,
        airports,
        setAirlines,
        airlines,
        setCountryList,
        countryList,
        devMode,
        setDevMode,
        setMenuWide,
        menuWide,
      }}
    >
      {isLoading && <LoadingScreen />}
      {children}
    </MainContext.Provider>
  );
};

export default MainAppProvider;
