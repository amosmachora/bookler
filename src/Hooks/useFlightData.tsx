import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchAirportFlightData } from '../Fetchers/FetchAirportFlightData';
import { useGlobalData } from './useGlobalData';
import { useUpdateLogger } from './useUpdateLogger';
import { Airport, Departures } from '../Types/Flights';

export type TypeOfTrip = 'one-way' | 'round-trip' | 'multi-city';

export type UserFlightChoices = {
  toAirport: Airport | null;
  fromAirport: Airport | null;
  typeOfTrip: TypeOfTrip;
  departureDate: Date | null;
  returnDate: Date | null;
};

export type FlightDataContextType = {
  userFlightChoices: UserFlightChoices;
  outGoingFlights: Departures[];
  setUserFlightChoices: React.Dispatch<React.SetStateAction<UserFlightChoices>>;
};

const FlightDataContext = createContext<FlightDataContextType>(
  {} as FlightDataContextType
);

const useFlightData = () => {
  const [userFlightChoices, setUserFlightChoices] = useState<UserFlightChoices>(
    {
      departureDate: null,
      fromAirport: null,
      returnDate: null,
      toAirport: null,
      typeOfTrip: 'one-way',
    }
  );
  const [outGoingFlights, setOutGoingFlights] = useState<Departures[]>([]);
  const { setIsLoading } = useGlobalData();

  useEffect(() => {
    if (userFlightChoices?.fromAirport) {
      setIsLoading(true);
      fetchAirportFlightData(userFlightChoices.fromAirport)
        .then((res) => {
          setOutGoingFlights(res);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFlightChoices?.fromAirport]);

  useUpdateLogger(userFlightChoices, 'userFlightChoices');

  useUpdateLogger(outGoingFlights, 'outGoingFlights');

  return {
    userFlightChoices,
    outGoingFlights,
    setUserFlightChoices,
  };
};

export const FlightDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const flightData = useFlightData();
  return (
    <FlightDataContext.Provider value={flightData}>
      {children}
    </FlightDataContext.Provider>
  );
};

export const useFlightDataContext = () => useContext(FlightDataContext);
