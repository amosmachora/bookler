import React, { useState, useRef } from "react";
import { Assets } from "../../Assets/Assets";
import { DatePicker } from "../DatePicker";
import TimePicker from "../TimePicker";

const CarRentalSearchForm = () => {
  const [pickUpDate, setPickUpDate] = useState<Date | null>(null);
  const [dropOffDate, setDropOffDate] = useState<Date | null>(null);
  const [pickUpTime, setPickUpTime] = useState<string>("");
  const [dropOffTime, setDropOffTime] = useState<string>("");

  const differentLocationCheckBox = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white flex flex-wrap justify-between rounded-lg py-8 px-9 mt-5 gap-y-4">
      <div className="bg-gray-100 rounded-md w-[32%] px-4 py-2 cursor-pointer">
        <div className="flex">
          <img src={Assets.LocationPointer} alt="Location pointer" />
          <p className="text-gray-300 text-sm ml-1">Pick up location</p>
        </div>
        <p className="text-black font-bold">London , United Kingdom</p>
        <p className="text-xs text-gray-400">London</p>
      </div>
      <DatePicker
        date={pickUpDate}
        name="Pick-up date"
        setDate={setPickUpDate}
      />
      <DatePicker
        date={dropOffDate}
        name="Drop-off Date"
        setDate={setDropOffDate}
      />
      <TimePicker name="Pick-up time" setTime={setPickUpTime} />
      <TimePicker name="Drop-off time" setTime={setDropOffTime} />
      <button className="bg-red-600 text-white rounded-lg cursor-pointer w-1/4">
        Search
      </button>
      <div className="flex items-center text-white bg-blue-600 px-3 py-1 rounded-md text-sm">
        <input
          type="checkbox"
          className="mr-2 h-5 w-5 rounded-xl"
          ref={differentLocationCheckBox}
        />
        <p>Drop car off at different location</p>
      </div>
    </div>
  );
};

export default CarRentalSearchForm;
