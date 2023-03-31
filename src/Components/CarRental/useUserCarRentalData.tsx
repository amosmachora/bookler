import { useState } from "react";
import { Airport } from "../../Types/Flights";

export const useUserCarRentalData = () => {
  const [pickUpDate, setPickUpDate] = useState<Date | null>(null);
  const [dropOffDate, setDropOffDate] = useState<Date | null>(null);
  const [pickUpTime, setPickUpTime] = useState<string | null>(null);
  const [dropOffTime, setDropOffTime] = useState<string | null>(null);
  const [dropCarAtDifferentLocation, setDropCarAtDifferentLocation] =
    useState<boolean>(false);
  const [pickUpLocation, setPickUpLocation] = useState<Airport | null>(null);
  const [dropOffLocation, setDropOffLocation] = useState<Airport | null>(null);

  return {
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
  };
};
