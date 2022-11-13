import React, { useState } from "react";
import { MainContext } from "../App";
import { Assets } from "../Assets/Assets";
import { FromAirportInput, getDay, MoreButton } from "../Components/SearchForm";
import { Airport } from "../Types/Flights";

type HotelSearchFormProps = {
  fromAirport: Airport;
};

const HotelSearchForm = ({ fromAirport }: HotelSearchFormProps) => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);

  const openSearchModal = () => {
    console.log("Hi");
  };

  const searchHotel = () => {
    console.log("Yoh");
  };

  return (
    <div className="bg-white rounded-lg py-8 px-9 mt-5">
      <div className="flex justify-between [&>*]:bg-gray-100 [&>*]:px-4 [&>*]:py-2 [&>*]:cursor-pointer [&>*]:rounded-lg mb-4">
        <FromAirportInput
          fromAirport={fromAirport}
          openFromSearchModal={openSearchModal}
        />
        <div className="rounded-md bg-gray-100 w-[32%]">
          <div className="flex">
            <img src={Assets.LocationPointer} alt="Location" />
            <p className="text-gray-300 ml-1 text-sm">Check In- out</p>
          </div>
          <input
            className="font-bold mb-1 bg-gray-100"
            type="date"
            onChange={(e) => setCheckInDate(e.target.valueAsDate)}
          />
          <p className="text-xs text-gray-400">{getDay(checkInDate)}</p>
        </div>
        <div className="rounded-md bg-gray-100 w-[32%]">
          <div className="flex">
            <img src={Assets.LocationPointer} alt="Location" />
            <p className="text-gray-300 ml-1 text-sm">TO</p>
          </div>
          <p className="font-bold mb-2">3 adult - 1 children - 2 room</p>
          <p className="text-xs text-gray-400">Person</p>
        </div>
      </div>
      <div className="flex justify-between relative">
        <MoreButton />
        <div className="flex h-max absolute bottom-0 left-1/4">
          <input type="checkbox" className="h-6 w-6 mr-2 cursor-pointer" />
          <p>I`m traveling for work</p>
        </div>
        <input
          type="submit"
          value="SEARCH HOTELS"
          className="bg-red-600 text-white rounded-lg w-[22.4%] cursor-pointer"
          onClick={() => searchHotel()}
        />
      </div>
    </div>
  );
};

export default HotelSearchForm;
