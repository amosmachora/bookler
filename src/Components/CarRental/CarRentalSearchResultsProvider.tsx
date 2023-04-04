import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  CarRentalData,
  PartnerLocation,
  VehicleInformation,
} from '../../Types/CarRentals';
import { fetchCarRentals } from '../../Fetchers/FetchCarRentals';
import { useCarRentalDataContext } from '../../Hooks/useCarRentalData';
import { useUpdateLogger } from '../../Hooks/useUpdateLogger';

const CarRentalSearchResultsContext = createContext<{
  activeVehicle: VehicleInformation | null;
  carRentalData: CarRentalData | null;
  suggestedVehicles: VehicleInformation[] | null;
  allUnfilteredVehicles: VehicleInformation[] | null;
  setActiveVehicle: React.Dispatch<
    React.SetStateAction<VehicleInformation | null>
  >;
  setSuggestedVehicles: React.Dispatch<
    React.SetStateAction<VehicleInformation[] | null>
  >;
}>(null as any);

export const CarRentalSearchResultsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [carRentalData, setCarRentalData] = useState<CarRentalData | null>(
    null
  );
  const { userCarRentalChoices } = useCarRentalDataContext();
  const { dropOffDate, dropOffTime, pickUpDate, pickUpTime } =
    userCarRentalChoices!;
  const [suggestedVehicles, setSuggestedVehicles] = useState<
    VehicleInformation[] | null
  >(getArrayOfObjects(carRentalData?.vehicleRates));

  const allUnfilteredVehicles: VehicleInformation[] | null = getArrayOfObjects(
    carRentalData?.vehicleRates
  );

  useUpdateLogger(carRentalData, 'CarRentalData');

  //TODO Remember to fix locations.
  useEffect(() => {
    fetchCarRentals(
      'JFK',
      getConcatenatedDate(dropOffDate, dropOffTime!),
      getConcatenatedDate(pickUpDate, pickUpTime!),
      'JFK'
    ).then((res) => {
      setCarRentalData(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [activeVehicle, setActiveVehicle] = useState<VehicleInformation | null>(
    null
  );

  return (
    <CarRentalSearchResultsContext.Provider
      value={{
        activeVehicle,
        suggestedVehicles,
        carRentalData,
        allUnfilteredVehicles,
        setActiveVehicle,
        setSuggestedVehicles,
      }}
    >
      {children}
    </CarRentalSearchResultsContext.Provider>
  );
};

export const useCarRentalSearchResults = () =>
  useContext(CarRentalSearchResultsContext);

const getConcatenatedDate = (date: Date | null, Time: string): string => {
  if (!date) {
    return '';
  }
  return `${
    date!.getFullYear() +
    '-' +
    (date!.getMonth() + 1) +
    '-' +
    date!.getDate() +
    ' ' +
    Time +
    ':00'
  }`;
};

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
