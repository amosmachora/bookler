import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Assets } from "../../Assets/Assets";
import { MainContext } from "../Contexts/MainAppProvider";
import { DatePicker } from "../DatePicker";
import TimePicker from "../TimePicker";
import { CarRentalSearchContext } from "./CarRentalProvider";

const CarRentalSearchForm = () => {
  const {
    dropCarAtDifferentLocation,
    pickUpDate,
    setPickUpDate,
    dropOffDate,
    setDropOffDate,
    setPickUpTime,
    setDropOffTime,
    setDropCarAtDifferentLocation,
  } = useContext(CarRentalSearchContext);

  const { setMenuWide } = useContext(MainContext);

  useEffect(() => {
    setMenuWide(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white flex flex-wrap justify-between items-center rounded-lg py-8 px-9 mt-5 gap-y-4 transition-all">
      <div className="bg-gray-100 rounded-md w-[32%] px-4 py-2 cursor-pointer">
        <div className="flex">
          <img src={Assets.LocationPointer} alt="Location pointer" />
          <p className="text-gray-300 text-sm ml-1">Pick up location</p>
        </div>
        <p className="text-black font-bold">London , United Kingdom</p>
        <p className="text-xs text-gray-400">London</p>
      </div>
      {dropCarAtDifferentLocation && (
        <div className="bg-gray-100 rounded-md w-[32%] px-4 py-2 cursor-pointer">
          <div className="flex">
            <img src={Assets.LocationPointer} alt="Location pointer" />
            <p className="text-gray-300 text-sm ml-1">Drop off location</p>
          </div>
          <p className="text-black font-bold">London , United Kingdom</p>
          <p className="text-xs text-gray-400">London</p>
        </div>
      )}
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
      <Link
        className="bg-red-600 text-white rounded-lg cursor-pointer w-1/4 h-16 text-center flex items-center justify-center"
        to="car-rental-results"
      >
        Search
      </Link>
      <div className="flex items-center text-white bg-blue-600 px-3 py-1 rounded-md text-sm">
        <input
          type="checkbox"
          className="mr-2 h-5 w-5 rounded-xl"
          onChange={(e) => setDropCarAtDifferentLocation(e.target.checked)}
        />
        <p>Drop car off at different location</p>
      </div>
    </div>
  );
};

export default CarRentalSearchForm;
