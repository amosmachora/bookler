import React, { createContext, useContext, useRef, useState } from 'react';
import { Airport } from '../Types/Flights';
import { TravellerHotelInfo } from '../Types/Hotel';

export type UserHotelChoices = {
  checkInDate: Date | null;
  checkOutDate: Date | null;
  targetHotelLocation: Airport | null;
  travellerHotelInfo: TravellerHotelInfo;
};

export type HotelDataContextType = {
  userHotelChoices: UserHotelChoices;
  setUserHotelChoices: React.Dispatch<React.SetStateAction<UserHotelChoices>>;
  travelingForWorkCheckBox: React.MutableRefObject<HTMLInputElement | null>;
};

const HotelDataContext = createContext<HotelDataContextType>(
  {} as HotelDataContextType
);

const useHotelData = () => {
  const [userHotelChoices, setUserHotelChoices] = useState<UserHotelChoices>({
    checkInDate: null,
    checkOutDate: null,
    targetHotelLocation: null,
    travellerHotelInfo: {
      Rooms: 1,
      adults: 1,
      kids: 0,
    },
  });

  const travelingForWorkCheckBox = useRef<HTMLInputElement | null>(null);

  return {
    userHotelChoices,
    setUserHotelChoices,
    travelingForWorkCheckBox,
  };
};

export const HotelDataContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const hotelData = useHotelData();
  return (
    <HotelDataContext.Provider value={hotelData}>
      {children}
    </HotelDataContext.Provider>
  );
};

export const useHotelDataContext = () => useContext(HotelDataContext);
