import { createContext, useContext, useState } from 'react';
import { Airport } from '../Types/Flights';

export type UserCarRentalChoices = {
  pickUpDate: Date | null;
  dropOffDate: Date | null;
  pickUpTime: string | null;
  dropOffTime: string | null;
  pickUpLocation: Airport | null;
  dropOffLocation: Airport | null;
};

type CarRentalDataContextType = {
  dropCarAtDifferentLocation: boolean;
  setDropCarAtDifferentLocation: React.Dispatch<React.SetStateAction<boolean>>;
  userCarRentalChoices: UserCarRentalChoices;
  setUserCarRentalChoices: React.Dispatch<
    React.SetStateAction<UserCarRentalChoices>
  >;
};

const CarRentalData = createContext<CarRentalDataContextType>(
  {} as CarRentalDataContextType
);

const useCarRentalData = () => {
  const [userCarRentalChoices, setUserCarRentalChoices] =
    useState<UserCarRentalChoices>({
      pickUpDate: null,
      dropOffDate: null,
      pickUpTime: null,
      dropOffTime: null,
      pickUpLocation: null,
      dropOffLocation: null,
    });
  const [dropCarAtDifferentLocation, setDropCarAtDifferentLocation] =
    useState(false);

  return {
    dropCarAtDifferentLocation,
    setDropCarAtDifferentLocation,
    userCarRentalChoices,
    setUserCarRentalChoices,
  };
};

export const CarRentalDataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const data = useCarRentalData();
  return (
    <CarRentalData.Provider value={data}>{children}</CarRentalData.Provider>
  );
};

export const useCarRentalDataContext = () => useContext(CarRentalData);
