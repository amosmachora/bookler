import React, { useEffect, useState } from "react";
import { Assets } from "../../Assets/Assets";
import { useGlobalData } from "../../Hooks/useGlobalData";
import { isLinkClickable } from "../../Util/Helpers";
import { DatePicker } from "../DatePicker";
import OffPageLink from "../OffPageLink";
import AirportSearch, {
  AirportSearchConfig,
} from "../SearchModals/AirportSearch";
import TimePicker from "../TimePicker";
import { useUserCarRentalData } from "./useUserCarRentalData";

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
  } = useUserCarRentalData();

  const { setMenuWide } = useGlobalData();

  const [showSearchModal, setShowSearchModal] = useState(false);

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

  let config: AirportSearchConfig = {
    closeFunction: setShowSearchModal,
    inputPlaceHolder: "Search pick up location",
    mainText: "Pick Up location",
    name: "Pick up location",
    setFunction: setPickUpLocation,
  };

  return (
    <div className="bg-white flex flex-wrap justify-between rounded-lg py-8 px-9 mt-5 gap-y-4 transition-all">
      <div
        className="bg-gray-100 rounded-md w-[32%] px-4 py-2 cursor-pointer"
        onClick={() => setShowSearchModal(true)}
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
            config = {
              ...config,
              inputPlaceHolder: "Search drop off location",
              mainText: "Drop off location",
              setFunction: setDropOffLocation,
              name: "Drop off location",
            };
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
      {showSearchModal && <AirportSearch config={config} />}
    </div>
  );
};

export default CarRentalSearchForm;
