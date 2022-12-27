import { useContext } from "react";
import { Assets } from "../../Assets/Assets";
import { FlightSearchContext } from "./FlightsProvider";

export function ToAirportInput({
  openSearchModal,
}: {
  openSearchModal: () => void;
}) {
  const { toAirport } = useContext(FlightSearchContext);
  return (
    <div className="Option w-[32.8%]" onClick={() => openSearchModal()}>
      <div className="flex">
        <img src={Assets.LocationPointer} alt="Location Pointer" />
        <p className="text-gray-400 text-xs ml-1">TO</p>
      </div>
      <p className="from-location text-base font-bold mb-1">
        {toAirport === null
          ? "No airport selected"
          : toAirport.city + ", " + toAirport.country}
      </p>
      <p className="from-airport text-xs text-gray-400">
        {toAirport === null ? "No airport selected" : toAirport.name}
      </p>
    </div>
  );
}
