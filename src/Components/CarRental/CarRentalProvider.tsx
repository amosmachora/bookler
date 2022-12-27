import React, { createContext, useState } from "react";
import { CarRentalSearch } from "../../Types/Contexts";
import { Airport } from "../../Types/Flights";

export const CarRentalSearchContext = createContext<CarRentalSearch>(
  null as any
);

const CarRentalProvider = ({ children }: { children: React.ReactNode }) => {
  const [pickUpDate, setPickUpDate] = useState<Date | null>(null);
  const [dropOffDate, setDropOffDate] = useState<Date | null>(null);
  const [pickUpTime, setPickUpTime] = useState<string | null>(null);
  const [dropOffTime, setDropOffTime] = useState<string | null>(null);
  const [dropCarAtDifferentLocation, setDropCarAtDifferentLocation] =
    useState<boolean>(false);
  const [pickUpLocation, setPickUpLocation] = useState<Airport | null>(null);
  const [dropOffLocation, setDropOffLocation] = useState<Airport | null>(null);

  return (
    <CarRentalSearchContext.Provider
      value={{
        pickUpLocation,
        dropOffLocation,
        pickUpDate,
        dropOffDate,
        pickUpTime,
        dropOffTime,
        dropCarAtDifferentLocation,
        setDropOffLocation,
        setPickUpLocation,
        setPickUpDate,
        setDropOffDate,
        setPickUpTime,
        setDropOffTime,
        setDropCarAtDifferentLocation,
      }}
    >
      {children}
    </CarRentalSearchContext.Provider>
  );
};

export default CarRentalProvider;
