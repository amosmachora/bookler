import React from "react";
import { Assets } from "../../Assets/Assets";
import { useUserFlightData } from "./useUserFlightData";

export function FromAirportInput({
  openSearchModal,
}: {
  openSearchModal: () => void;
}) {
  const { fromAirport } = useUserFlightData();
  return (
    <div className="Option w-[32.8%]" onClick={() => openSearchModal()}>
      <div className="flex">
        <img src={Assets.LocationPointer} alt="Location Pointer" />
        <p className="text-gray-400 text-xs ml-1">FROM</p>
      </div>
      <p className="from-location text-base font-bold mb-1">
        {fromAirport === null
          ? "No airport selected"
          : fromAirport.city + ", " + fromAirport.country}
      </p>
      <p className="from-airport text-xs text-gray-400">
        {fromAirport === null ? "No airport selected" : fromAirport.name}
      </p>
    </div>
  );
}
