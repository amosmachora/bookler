import React, { createContext, useContext, useState } from 'react';
import {
  CarRentalData,
  PartnerLocation,
  VehicleInformation,
} from '../../Types/CarRentals';
import { useUpdateLogger } from '../../Hooks/useUpdateLogger';

const CarRentalSearchResultsContext = createContext<{
  activeVehicle: VehicleInformation | null;
  carRentalData: CarRentalData | null;
  suggestedVehicles: VehicleInformation[] | null;
  allUnfilteredVehicles: VehicleInformation[] | null;
  dropsCarAtDifferentLocation: boolean;
  setActiveVehicle: React.Dispatch<
    React.SetStateAction<VehicleInformation | null>
  >;
  setSuggestedVehicles: React.Dispatch<
    React.SetStateAction<VehicleInformation[] | null>
  >;
  setDropsCarAtDifferentLocation: React.Dispatch<React.SetStateAction<boolean>>;
  setCarRentalData: React.Dispatch<React.SetStateAction<CarRentalData | null>>;
}>(null as any);

export const CarRentalSearchResultsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [carRentalData, setCarRentalData] = useState<CarRentalData | null>(
    null
  );
  const [suggestedVehicles, setSuggestedVehicles] = useState<
    VehicleInformation[] | null
  >(null);
  const [dropsCarAtDifferentLocation, setDropsCarAtDifferentLocation] =
    useState(false);
  const [activeVehicle, setActiveVehicle] = useState<VehicleInformation | null>(
    null
  );

  const allUnfilteredVehicles: VehicleInformation[] | null = getArrayOfObjects(
    carRentalData?.vehicleRates
  );

  useUpdateLogger(carRentalData, 'CarRentalData');

  return (
    <CarRentalSearchResultsContext.Provider
      value={{
        activeVehicle,
        suggestedVehicles,
        carRentalData,
        allUnfilteredVehicles,
        dropsCarAtDifferentLocation,
        setActiveVehicle,
        setSuggestedVehicles,
        setDropsCarAtDifferentLocation,
        setCarRentalData,
      }}
    >
      {children}
    </CarRentalSearchResultsContext.Provider>
  );
};

export const useCarRentalSearchResults = () =>
  useContext(CarRentalSearchResultsContext);

export const getArrayOfObjects = (vehicles: any): any => {
  if (!vehicles) {
    return null;
  }
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
