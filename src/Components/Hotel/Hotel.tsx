import React, { createContext, useRef, useState } from "react";
import { HotelSearch } from "../../Types/Contexts";
import { Airport } from "../../Types/Flights";
import { TravellerHotelInfo } from "../../Types/Hotel";
import HotelSearchForm from "./HotelSearchForm";

export const HotelSearchContext = createContext<HotelSearch>(null as any);
const Hotel = () => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [targetHotelLocation, setTargetHotelLocation] =
    useState<Airport | null>(null);
  const [travellerHotelInfo, setTravellerHotelInfo] =
    useState<TravellerHotelInfo>({
      Rooms: 1,
      adults: 0,
      kids: 0,
    });
  const travelingForWorkCheckBox = useRef<HTMLInputElement | null>(null);

  return (
    <HotelSearchContext.Provider
      value={{
        checkInDate,
        checkOutDate,
        setCheckInDate,
        setCheckOutDate,
        targetHotelLocation,
        setTargetHotelLocation,
        travellerHotelInfo,
        setTravellerHotelInfo,
      }}
    >
      <HotelSearchForm travelingForWorkCheckBox={travelingForWorkCheckBox} />
    </HotelSearchContext.Provider>
  );
};

export default Hotel;
