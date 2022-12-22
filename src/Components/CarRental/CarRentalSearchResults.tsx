import React, { useContext, useEffect, useState } from "react";
import GraySeparator from "../GraySeparator";
import CarRentalSearchParameters from "./CarRentalSearchParameters";
import DevCarRentals from "../../Util/CarRentals.json";
import {
  CarRentalSearchResultsType,
  VehicleInformation,
  VehicleRates,
} from "../../Types/CarRentals";
import { fetchCarRentals } from "../../Fetchers/FetchCarRentals";
import { CarRentalSearchContext, MainContext } from "../../App";
import Vehicle from "./Vehicle";

const CarRentalSearchResults = () => {
  const [carRentalData, setCarRentalData] =
    useState<CarRentalSearchResultsType>(DevCarRentals);
  const { devMode } = useContext(MainContext);
  const { dropOffDate, dropOffTime, pickUpDate, pickUpTime } = useContext(
    CarRentalSearchContext
  );
  const SuggestedVehicles: VehicleInformation[] = getArrayOfCarObjects(
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

  return (
    <>
      <CarRentalSearchParameters />
      <div className="mt-4">
        <div className="flex px-5 bg-flightResultsBg py-2 rounded-sm mb-1 items-center justify-between">
          <div className="flex items-center">
            <p className="text-xl font-bold">Taxi</p>
            <GraySeparator />
            <p className="text-xs font-semibold">
              Total <span className="text-sky-500">126 Results</span>
            </p>
          </div>
          <div className="flex text-xs">
            <p className="rounded-full py-1 mx-1 px-2 cursor-pointer transition-all bg-blue-900 text-white">
              Cheapest
            </p>
            <p className="rounded-full py-1 mx-1 px-2 cursor-pointer transition-all bg-blue-900 text-white">
              Best
            </p>
            <p className="rounded-full py-1 mx-1 px-2 cursor-pointer transition-all bg-blue-900 text-white">
              Quickest
            </p>
          </div>
        </div>
        {SuggestedVehicles.map((vehicle) => (
          <Vehicle vehicle={vehicle} />
        ))}
      </div>
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

const getArrayOfCarObjects = (vehicles: VehicleRates): VehicleInformation[] => {
  const keys = Object.keys(vehicles);
  let myArray: VehicleInformation[] = [];
  keys.forEach((key) => myArray.push(vehicles[key]));
  return myArray;
};
