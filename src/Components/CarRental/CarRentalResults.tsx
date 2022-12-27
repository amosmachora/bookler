import React, { useContext } from "react";
import GraySeparator from "../GraySeparator";
import { CarRentalSearchResultsContext } from "./CarRentalSearchResultsProvider";
import CarRentalsFilter from "./CarRentalsFilter";
import Vehicle from "./Vehicle";

const CarRentalResults = () => {
  const { suggestedVehicles } = useContext(CarRentalSearchResultsContext);
  return (
    <div className="mt-4 flex justify-between h-[60vh]">
      <div className="w-3/4 h-full">
        <div className="flex px-5 bg-flightResultsBg py-2 rounded-sm mb-1 items-center justify-between">
          <div className="flex items-center">
            <p className="text-xl font-bold">Taxi</p>
            <GraySeparator />
            <p className="text-xs font-semibold">
              Total{" "}
              <span className="text-sky-500">
                {suggestedVehicles.length} Results
              </span>
            </p>
          </div>
          <div className="flex text-xs">
            <p className="rounded-full py-1 mx-3 px-3 cursor-pointer transition-all bg-blue-900 text-white">
              Cheapest
            </p>
            <p className="rounded-full py-1 mx-3 px-3 cursor-pointer transition-all bg-blue-900 text-white">
              Best
            </p>
            <p className="rounded-full py-1 mx-3 px-3 cursor-pointer transition-all bg-blue-900 text-white">
              Quickest
            </p>
          </div>
        </div>
        <div className="overflow-y-scroll h-full">
          {suggestedVehicles.map((vehicle) => (
            <Vehicle vehicle={vehicle} key={vehicle.id} />
          ))}
        </div>
      </div>
      <CarRentalsFilter />
    </div>
  );
};

export default CarRentalResults;
