import React, { useContext, useState } from "react";
import { HotelSearchContext, MainContext } from "../App";
import { Assets } from "../Assets/Assets";
import { ToAirportInput, getDay, MoreButton } from "../Components/SearchForm";
import { Airport } from "../Types/Flights";

type HotelSearchFormProps = {
  toAirport: Airport;
  setMenuWide: React.Dispatch<React.SetStateAction<boolean>>;
};

const HotelSearchForm = ({ toAirport, setMenuWide }: HotelSearchFormProps) => {
  const { setCheckInDate, checkInDate, setCheckOutDate, checkOutDate } =
    useContext(HotelSearchContext);

  const openSearchModal = () => {
    console.log("Hi");
  };

  const searchHotel = () => {
    setMenuWide(false);
  };

  return (
    <div className="bg-white rounded-lg py-8 px-9 mt-5">
      <div className="flex justify-between [&>*]:bg-gray-100 [&>*]:px-4 [&>*]:py-2 [&>*]:cursor-pointer [&>*]:rounded-lg mb-4">
        <ToAirportInput
          openToSearchModal={openSearchModal}
          toAirport={toAirport}
        />
        <CheckInOrOutInput
          setDate={setCheckInDate}
          date={checkInDate}
          name="Check In"
        />
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
        <CheckInOrOutInput
          setDate={setCheckOutDate}
          date={checkOutDate}
          name="Check out"
        />
        <div className="flex h-max mt-auto">
          <input type="checkbox" className="h-5 w-5 mr-2 cursor-pointer" />
          <p>I`m traveling for work</p>
        </div>
        <MoreButton />
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

type CheckInOrOutInputProps = {
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  date: Date | null;
  name: string;
};

function CheckInOrOutInput({ setDate, date, name }: CheckInOrOutInputProps) {
  return (
    <div className="rounded-md bg-gray-100 w-[32%] px-4 py-2">
      <div className="flex">
        <img src={Assets.Calendar} alt="Location" />
        <p className="text-gray-300 ml-1 text-sm">{name}</p>
      </div>
      <input
        className="font-bold mb-1 bg-gray-100"
        type="date"
        onChange={(e) => setDate(e.target.valueAsDate)}
      />
      <p className="text-xs text-gray-400">{getDay(date)}</p>
    </div>
  );
}
