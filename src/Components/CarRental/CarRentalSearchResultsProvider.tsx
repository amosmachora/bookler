import React, { createContext, useContext, useEffect, useState } from "react";
import CarRentalSearchParameters from "./CarRentalSearchParameters";
import DevCarRentals from "../../Util/CarRentals.json";
import {
  CarRentalSearchResultsType,
  PartnerLocation,
  VehicleInformation,
} from "../../Types/CarRentals";
import { fetchCarRentals } from "../../Fetchers/FetchCarRentals";
import { CarRentalSearchContext } from "./CarRentalProvider";
import { MainContext } from "../Contexts/MainAppProvider";
import { Outlet } from "react-router";

export const CarRentalSearchResultsContext = createContext<{
  activeVehicle: VehicleInformation | null;
  carRentalData: CarRentalSearchResultsType;
  suggestedVehicles: VehicleInformation[];
  allUnfilteredVehicles: VehicleInformation[];
  setActiveVehicle: React.Dispatch<
    React.SetStateAction<VehicleInformation | null>
  >;
  setSuggestedVehicles: React.Dispatch<
    React.SetStateAction<VehicleInformation[]>
  >;
}>(null as any);

const CarRentalSearchResultsProvider = () => {
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

  const { setMenuWide } = useContext(MainContext);

  useEffect(() => {
    setMenuWide(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const [activeVehicle, setActiveVehicle] = useState<VehicleInformation | null>(
    null
  );

  return (
    <CarRentalSearchResultsContext.Provider
      value={{
        activeVehicle,
        carRentalData,
        allUnfilteredVehicles,
        setActiveVehicle,
        setSuggestedVehicles,
        suggestedVehicles,
      }}
    >
      <CarRentalSearchParameters />
      <Outlet />
      {/* {stage === "Booking review" && (
        <CarRentalReview
          selectedVehicle={activeVehicle}
          carRentalData={carRentalData}
        />
      )} */}
    </CarRentalSearchResultsContext.Provider>
  );
};

export default CarRentalSearchResultsProvider;

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

export const getPartnerLocation = (
  partnerLocations: {
    [key: string]: PartnerLocation;
  },
  partnerCode: string | undefined
): PartnerLocation => {
  const partnerLocationsArray: PartnerLocation[] =
    getArrayOfObjects(partnerLocations);

  return partnerLocationsArray.find(
    (location) => location.partnerCode === partnerCode
  )!;
};
