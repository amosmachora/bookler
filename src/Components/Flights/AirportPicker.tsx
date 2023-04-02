import React from 'react';
import { Assets } from '../../Assets/Assets';
import { Airport } from '../../Types/Flights';

export const AirportPicker = ({
  onClick,
  name,
  airport,
}: {
  onClick: () => void;
  name: 'FROM' | 'TO';
  airport: Airport | null;
}) => {
  return (
    <div className="w-1/3 px-4 py-2 bg-gray-100" onClick={() => onClick()}>
      <div className="flex">
        <img src={Assets.LocationPointer} alt="Location Pointer" />
        <p className="text-gray-400 text-xs ml-1">{name}</p>
      </div>
      <p className="from-location text-base font-bold mb-1">
        {airport
          ? airport.city + ', ' + airport.country
          : 'No airport selected'}
      </p>
      <p className="from-airport text-xs text-gray-400">
        {airport ? airport.name : 'No airport selected'}
      </p>
    </div>
  );
};
