import React, { createContext, useState } from "react";
import { MainContextValue } from "../../Types/Contexts";
import { Airline, Airport, Country } from "../../Types/Flights";
import DevAirports from "../../Util/Airports.json";
import Airlines from "../../Util/Airlines.json";

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
  const [airports, setAirports] = useState<Airport[]>(DevAirports.rows);
  const [isLoading, setIsLoading] = useState(false);
  const [menuWide, setMenuWide] = useState(true);
  const [devMode, setDevMode] = useState(true);
  const [airlines, setAirlines] = useState<Airline[]>(Airlines.rows);
  useState<Airport | null>(null);
  const [countryList, setCountryList] = useState<Country[]>([]);

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
      {children}
    </MainContext.Provider>
  );
};

export default MainAppProvider;
