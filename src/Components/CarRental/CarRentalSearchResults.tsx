import React, { useContext, useEffect, useState } from "react";
import GraySeparator from "../GraySeparator";
import CarRentalSearchParameters from "./CarRentalSearchParameters";
import DevCarRentals from "../../Util/CarRentals.json";
import {
  CarRentalSearchResultsType,
  VehicleInformation,
} from "../../Types/CarRentals";
import { fetchCarRentals } from "../../Fetchers/FetchCarRentals";
import { CarRentalSearchContext, MainContext } from "../../App";
import Vehicle from "./Vehicle";
import CarRentalsFilter from "./CarRentalsFilter";
import CarDetails from "./CarDetails";

const CarRentalSearchResults = () => {
  const [carRentalData, setCarRentalData] =
    useState<CarRentalSearchResultsType>(DevCarRentals);
  const { devMode } = useContext(MainContext);
  const { dropOffDate, dropOffTime, pickUpDate, pickUpTime } = useContext(
    CarRentalSearchContext
  );
  const [suggestedVehicles, setSuggestedVehicles] = useState<
    VehicleInformation[]
  >(getArrayOfObjects(carRentalData.vehicleRates));

  const allUnfilteredVehicles: VehicleInformation[] = getArrayOfObjects(
    carRentalData.vehicleRates
  );

  //TODO Remember to fix locations.
  useEffect(() => {
    if (!devMode) {
      fetchCarRentals(
        "JFK",
        getConcatenatedDate(dropOffDate, dropOffTime),
        getConcatenatedDate(pickUpDate, pickUpTime),
        "JFK"
      ).then((res) => setCarRentalData(res));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[], devMode]);

  const [stage, setStage] = useState<string>("Results");
  const [activeVehicle, setActiveVehicle] = useState<VehicleInformation | null>(
    null
  );

  return (
    <>
      <CarRentalSearchParameters />
      {stage === "Results" && (
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
                <Vehicle
                  vehicle={vehicle}
                  setStage={setStage}
                  setActiveVehicle={setActiveVehicle}
                  key={vehicle.id}
                />
              ))}
            </div>
          </div>
          <CarRentalsFilter
            allUnfilteredVehicles={allUnfilteredVehicles}
            setSuggestedVehicles={setSuggestedVehicles}
            categories={getArrayOfObjects(carRentalData.vehicleCategories)}
          />
        </div>
      )}
      {stage === "Details" && (
        <CarDetails
          activeVehicle={activeVehicle}
          carRentalData={carRentalData}
          setStage={setStage}
        />
      )}
    </>
  );
};

export default CarRentalSearchResults;

const getConcatenatedDate = (Date: Date | null, Time: string): string => {
  return `${
    Date?.getFullYear() +
    "-" +
    (Date!.getMonth() + 1) +
    "-" +
    Date?.getDate() +
    " " +
    Time +
    ":00"
  }`;
};

export const getArrayOfObjects = (vehicles: any): any[] => {
  const keys = Object.keys(vehicles);
  let myArray: any[] = [];
  keys.forEach((key) => myArray.push(vehicles[key]));
  return myArray;
};
