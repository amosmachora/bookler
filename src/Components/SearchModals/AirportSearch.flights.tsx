import React, { useState } from 'react';
import { Assets } from '../../Assets/Assets';
import { useFlightDataContext } from '../../Hooks/useFlightData';
import { useGlobalData } from '../../Hooks/useGlobalData';
import { Airport } from '../../Types/Flights';
import { getCapitalizedString } from '../../Util/Helpers';
import './AirportSearch.css';

export type AirportSearchConfig = {
  mainText: string;
  inputPlaceHolder: string;
  searching: 'destination-airport' | 'origin-airport';
};

export const AirportSearch = ({
  config,
  closeFunction,
}: {
  config: AirportSearchConfig;
  closeFunction: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { airports } = useGlobalData();

  const { outGoingFlights, setUserFlightChoices } = useFlightDataContext();

  const getDefaultAirportList = (): Airport[] | (() => Airport[]) => {
    if (config.searching === 'destination-airport') {
      return airports.filter((airport) =>
        outGoingFlights
          .map((flight) => flight.arrival.airport.icao)
          .includes(airport.icao)
      );
    }
    return airports;
  };

  const [localAirportList, setLocalAirportList] = useState<Airport[]>(
    getDefaultAirportList()
  );

  const searchAirport = (e: React.KeyboardEvent) => {
    const searchValue = (e.target as HTMLInputElement).value.toLowerCase();
    if (e.key === 'Enter') {
      setLocalAirportList(
        airports.filter(
          (airport) =>
            airport.name.toLowerCase().includes(searchValue) ||
            airport.country.toLowerCase().includes(searchValue) ||
            airport.city.toLowerCase().includes(searchValue)
        )
      );
    }
  };

  const checkIfEmpty = (e: React.FormEvent) => {
    if ((e.target as HTMLInputElement).value.length === 0) {
      setLocalAirportList(airports);
    }
  };

  const handleSettingUserChoicesObject = (airport: Airport) => {
    setUserFlightChoices((prev) => {
      const newUserFlightChoicesObject = {
        ...prev,
        toAirport:
          config.searching === 'destination-airport' ? airport : prev.toAirport,
        fromAirport:
          config.searching === 'origin-airport' ? airport : prev.fromAirport,
      };
      console.log(newUserFlightChoicesObject);
      return newUserFlightChoicesObject;
    });
    closeFunction(false);
  };

  return (
    <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-6 z-40 w-1/3 bg-white shadow-xl rounded-2xl">
      <div className="flex justify-between">
        <p className="font-medium text-2xl">
          {getCapitalizedString(config.mainText)}
        </p>
        <img
          src={Assets.Close}
          alt="Close"
          className="cursor-pointer"
          onClick={() => closeFunction(false)}
        />
      </div>
      <p className="text-center text-gray-500 text-base mt-8 mb-6">
        {config.inputPlaceHolder}
      </p>
      <input
        type="text"
        name="From"
        className="w-full border rounded-xl h-11 p-4 text-sm focus:border-blue-500 outline-none focus:border-2"
        placeholder="Start your flight search"
        onKeyDown={(e) => searchAirport(e)}
        onChange={(e) => checkIfEmpty(e)}
      />

      <div className="airports-list mt-8 search-results-airports h-28 overflow-y-scroll scroll">
        {localAirportList.map((airport) => (
          <div
            key={airport.id}
            className="flex justify-between cursor-pointer"
            onClick={() => handleSettingUserChoicesObject(airport)}
          >
            <p className="font-bold text-sm ho">{airport.country}</p>
            <p className="text-xs">{airport.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
