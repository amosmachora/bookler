import React, { createContext, useState } from "react";
import { CarRentalSearch } from "../../Types/Contexts";
import CarRentalSearchResults from "./CarRentalSearchResults";

export const CarRentalSearchContext = createContext<CarRentalSearch>(
  null as any
);

const CarRentalProvider = () => {
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
      <CarRentalSearchResults />
    </CarRentalSearchContext.Provider>
  );
};

export default CarRentalProvider;
