import React, { createContext, useState } from "react";
import { CarRentalSearch } from "../../Types/Contexts";

export const CarRentalSearchContext = createContext<CarRentalSearch>(
  null as any
);

const CarRentalProvider = ({ children }: { children: React.ReactNode }) => {
  const [pickUpDate, setPickUpDate] = useState<Date | null>(null);
  const [dropOffDate, setDropOffDate] = useState<Date | null>(null);
  const [pickUpTime, setPickUpTime] = useState<string>("");
  const [dropOffTime, setDropOffTime] = useState<string>("");
  const [dropCarAtDifferentLocation, setDropCarAtDifferentLocation] =
    useState<boolean>(false);

  return (
    <CarRentalSearchContext.Provider
      value={{
        pickUpDate,
        setPickUpDate,
        dropOffDate,
        setDropOffDate,
        pickUpTime,
        setPickUpTime,
        dropOffTime,
        setDropOffTime,
        dropCarAtDifferentLocation,
        setDropCarAtDifferentLocation,
      }}
    >
      {children}
    </CarRentalSearchContext.Provider>
  );
};

export default CarRentalProvider;
