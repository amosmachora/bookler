import { useRef, useState } from "react";
import { Airport } from "../../Types/Flights";
import { TravellerHotelInfo } from "../../Types/Hotel";

export const useUserHotelData = () => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [targetHotelLocation, setTargetHotelLocation] =
    useState<Airport | null>(null);
  const [travellerHotelInfo, setTravellerHotelInfo] =
    useState<TravellerHotelInfo>({
      Rooms: 1,
      adults: 1,
      kids: 0,
    });
  const travelingForWorkCheckBox = useRef<HTMLInputElement | null>(null);

  return {
    checkInDate,
    checkOutDate,
    setCheckInDate,
    setCheckOutDate,
    targetHotelLocation,
    setTargetHotelLocation,
    travellerHotelInfo,
    setTravellerHotelInfo,
    travelingForWorkCheckBox,
  };
};
