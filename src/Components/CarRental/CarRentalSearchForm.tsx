import React, { useContext, useEffect, useState } from "react";
import { Assets } from "../../Assets/Assets";
import { isLinkClickable } from "../../Util/Helpers";
import { MainContext } from "../Contexts/MainAppProvider";
import { DatePicker } from "../DatePicker";
import OffPageLink from "../OffPageLink";
import AirportSearch from "../SearchModals/AirportSearch";
import TimePicker from "../TimePicker";
import { CarRentalSearchContext } from "./CarRentalProvider";

const CarRentalSearchForm = () => {
  const {
    dropCarAtDifferentLocation,
    pickUpDate,
    dropOffDate,
    pickUpTime,
    dropOffTime,
    dropOffLocation,
    pickUpLocation,
    setPickUpDate,
    setDropOffDate,
    setPickUpTime,
    setDropOffTime,
    setDropCarAtDifferentLocation,
    setDropOffLocation,
    setPickUpLocation,
  } = useContext(CarRentalSearchContext);

  const { setMenuWide, airports } = useContext(MainContext);

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchFormText, setSearchFormText] = useState("");

  useEffect(() => {
    setMenuWide(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const args = [
    pickUpDate,
    dropOffDate,
    pickUpTime,
    dropOffTime,
    pickUpLocation,
  ];

  if (dropCarAtDifferentLocation) {
    args.push(dropOffLocation);
  }

  const isClickable: boolean = isLinkClickable(...args);

  return (
    <div className="bg-white flex flex-wrap justify-between rounded-lg py-8 px-9 mt-5 gap-y-4 transition-all">
      <div
        className="bg-gray-100 rounded-md w-[32%] px-4 py-2 cursor-pointer"
        onClick={() => {
          setSearchFormText("Pick up location");
          setShowSearchModal(true);
        }}
      >
        <div className="flex">
          <img src={Assets.LocationPointer} alt="Location pointer" />
          <p className="text-gray-300 text-sm ml-1">Pick up location</p>
        </div>
        <p className="text-black font-bold">
          {pickUpLocation === null
            ? "No location selected"
            : pickUpLocation.city + ", " + pickUpLocation.country}
        </p>
        <p className="text-xs text-gray-400">
          {pickUpLocation === null ? "No location picked" : pickUpLocation.name}
        </p>
      </div>
      {dropCarAtDifferentLocation && (
        <div
          className="bg-gray-100 rounded-md w-[32%] px-4 py-2 cursor-pointer"
          onClick={() => {
            setSearchFormText("Drop off location");
            setShowSearchModal(true);
          }}
        >
          <div className="flex">
            <img src={Assets.LocationPointer} alt="Location pointer" />
            <p className="text-gray-300 text-sm ml-1">Drop off location</p>
          </div>
          <p className="text-black font-bold">
            {dropOffLocation === null
              ? "No location selected"
              : dropOffLocation.city + ", " + dropOffLocation.country}
          </p>
          <p className="text-xs text-gray-400">
            {dropOffLocation === null
              ? "No location picked"
              : dropOffLocation.name}
          </p>
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
      <OffPageLink
        isClickable={isClickable}
        to="car-rental-results"
        children="SEARCH CARS"
      />
      <div className="flex items-center text-white bg-blue-600 px-3 py-1 rounded-md text-sm max-h-[30px]">
        <input
          type="checkbox"
          className="mr-2 h-5 w-5 rounded-xl"
          onChange={(e) => setDropCarAtDifferentLocation(e.target.checked)}
        />
        <p>Drop car off at different location</p>
      </div>
      {showSearchModal && (
        <AirportSearch
          closeModalFunction={setShowSearchModal}
          searchAirports={airports}
          searchFormText={searchFormText}
          setFunction={
            searchFormText === "Pick up location"
              ? setPickUpLocation
              : setDropOffLocation
          }
        />
      )}
    </div>
  );
};

export default CarRentalSearchForm;
