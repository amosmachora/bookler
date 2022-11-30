import React, { useContext } from "react";
import { FlightSearchContext } from "../App";
import { Assets } from "../Assets/Assets";

type FromAirportInputProps = {
  openFromSearchModal: () => void;
};

export function FromAirportInput({
  openFromSearchModal,
}: FromAirportInputProps) {
  const { fromAirport } = useContext(FlightSearchContext);
  return (
    <div className="Option w-[32.8%]" onClick={() => openFromSearchModal()}>
      <div className="flex">
        <img src={Assets.LocationPointer} alt="Location Pointer" />
        <p className="text-gray-400 text-xs ml-1">FROM</p>
      </div>
      <p className="from-location text-base font-bold mb-1">
        {fromAirport.city + ", " + fromAirport.country}
      </p>
      <p className="from-airport text-xs text-gray-400">{fromAirport.name}</p>
    </div>
  );
}