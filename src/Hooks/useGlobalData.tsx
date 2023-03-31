import React, { useEffect, useState } from "react";
import { Airline, Airport, Country } from "../Types/Flights";
import { fetchCountries } from "../Fetchers/FetchCountries";
import { fetchAirports } from "../Fetchers/FetchAirports";
import { fetchAirlines } from "../Fetchers/FetchAirlines";
import { useUpdateLogger } from "./useUpdateLogger";
import { useLocalStorage } from "./useLocalStorage";

export interface GlobalData {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuWide: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  airports: Airport[];
  airlines: Airline[];
  countries: Country[];
  menuWide: boolean;
}

export const useGlobalData = (): GlobalData => {
  const [airports, setAirports] = useLocalStorage<Airport[]>([], "airports");
  const [isLoading, setIsLoading] = useState(false);
  const [menuWide, setMenuWide] = useState(true);
  const [airlines, setAirlines] = useLocalStorage<Airline[]>([], "airlines");
  const [countries, setCountries] = useLocalStorage<Country[]>([], "countries");

  useEffect(() => {
    const initializeApplication = async () => {
      setIsLoading(true);
      const lastFetched = localStorage.getItem("lastFetched");
      const oneWeek = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds
      if (!lastFetched || Date.now() - Number(lastFetched) > oneWeek) {
        await fetchAirports().then((airports) => setAirports(airports));
        await fetchAirlines().then((airlines) => setAirlines(airlines));
        await fetchCountries().then((countries) => setCountries(countries));
        localStorage.setItem("lastFetched", String(Date.now()));
      }
      setIsLoading(false);
    };
    initializeApplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUpdateLogger(airports, "airports");

  useUpdateLogger(isLoading, "isLoading");

  return {
    setIsLoading,
    setMenuWide,
    isLoading,
    airports,
    airlines,
    countries,
    menuWide,
  };
};
