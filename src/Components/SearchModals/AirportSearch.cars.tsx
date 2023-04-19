import React, { useState } from 'react';
import { Assets } from '../../Assets/Assets';
import { useCarRentalDataContext } from '../../Hooks/useCarRentalData';
import { useGlobalData } from '../../Hooks/useGlobalData';
import { Airport } from '../../Types/Flights';
import { getCapitalizedString } from '../../Util/Helpers';
import { ModalConfig } from '../CarRental/CarRentalSearchForm';
import './AirportSearch.css';

export const CarRentalSearch = ({ config }: { config: ModalConfig }) => {
  const { airports } = useGlobalData();
  const { setUserCarRentalChoices } = useCarRentalDataContext();
  const [localAirportList, setLocalAirportList] = useState<Airport[]>(airports);

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
          onClick={() => config.closeFunction(false)}
        />
      </div>
      <p className="text-center text-gray-500 text-base mt-8 mb-6">
        {config.name}
      </p>
      <input
        type="text"
        name="From"
        className="w-full border rounded-xl h-11 p-4 text-sm focus:border-blue-500 outline-none focus:border-2"
        placeholder={config.inputPlaceHolder}
        onKeyDown={(e) => searchAirport(e)}
        onChange={(e) => checkIfEmpty(e)}
      />

      <div className="airports-list mt-8 search-results-airports h-28 overflow-y-scroll scroll">
        {localAirportList.map((airport) => (
          <div
            key={airport.id}
            className="flex justify-between cursor-pointer"
            onClick={() => {
              setUserCarRentalChoices((prev) => {
                if (config.type === 'pick-up') {
                  return {
                    dropOffDate: prev!.dropOffDate,
                    pickUpDate: prev!.pickUpDate,
                    dropOffLocation: prev!.dropOffLocation,
                    dropOffTime: prev!.dropOffTime,
                    pickUpTime: prev!.pickUpTime,
                    pickUpLocation: airport,
                  };
                }
                return {
                  dropOffDate: prev!.dropOffDate,
                  dropOffLocation: airport,
                  dropOffTime: prev!.dropOffTime,
                  pickUpDate: prev!.pickUpDate,
                  pickUpTime: prev!.pickUpTime,
                  pickUpLocation: prev!.pickUpLocation,
                };
              });
              config.closeFunction(false);
            }}
          >
            <p className="font-bold text-sm ho">{airport.country}</p>
            <p className="text-xs">{airport.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
