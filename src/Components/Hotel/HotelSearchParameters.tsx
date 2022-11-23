import React, { useContext } from "react";
import { HotelSearchContext } from "../../App";
import { Airport } from "../../Types/Flights";
import { RedSearchButton } from "../RedSearchButton";
import CheckInCheckOutDatePicker from "./CheckInCheckOutDatePicker";

type HotelSearchParametersProps = {
  toAirport: Airport;
};
const HotelSearchParameters = ({ toAirport }: HotelSearchParametersProps) => {
  const {
    setCheckInDate,
    checkInDate,
    setCheckOutDate,
    checkOutDate,
    travellerHotelInfo,
  } = useContext(HotelSearchContext);
  return (
    <div className="flex justify-between items-center bg-white py-4 px-5 mt-10 rounded-b-lg text-sm mb-5">
      <div>
        <p className="text-xs text-gray-300 ml-2">WHERE</p>
        <p className="bg-gray-100 py-2 px-6 rounded-full mt-1">
          {toAirport.city + ", " + toAirport.country}
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-300 ml-2">CHECK-IN</p>
        <CheckInCheckOutDatePicker
          setDateFunction={setCheckInDate}
          date={checkInDate}
        />
      </div>
      <div>
        <p className="text-xs text-gray-300 ml-2">CHECK-OUT</p>
        <CheckInCheckOutDatePicker
          date={checkOutDate}
          setDateFunction={setCheckOutDate}
        />
      </div>
      <div>
        <p className="text-xs text-gray-300 ml-2">Rooms & Guests</p>
        <p className="flex bg-gray-100 py-2 px-6 rounded-full mt-1">
          {travellerHotelInfo.Rooms} Room, {travellerHotelInfo.adults} Adults{" "}
          {travellerHotelInfo.kids} Kids
        </p>
      </div>
      <RedSearchButton text="Search Hotels" />
    </div>
  );
};

export default HotelSearchParameters;
