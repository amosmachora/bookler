import React, { useContext, useState } from "react";
import { MainContext } from "../../App";
import { Assets } from "../../Assets/Assets";
import { MoreButton } from "../MoreButton";
import { getDay } from "../../Util/Helpers";
import AirportSearch from "../SearchModals/AirportSearch";
import { HotelSearchContext } from "./Hotel";
import TravellerSelector from "./TravellersSelector";

type HotelSearchFormProps = {
  travelingForWorkCheckBox: React.MutableRefObject<HTMLInputElement | null>;
};

const HotelSearchForm = ({
  travelingForWorkCheckBox,
}: HotelSearchFormProps) => {
  const {
    setCheckInDate,
    checkInDate,
    setCheckOutDate,
    checkOutDate,
    targetHotelLocation,
    travellerHotelInfo,
  } = useContext(HotelSearchContext);

  const { setMenuWide } = useContext(MainContext);
  const [showHotelSearchModal, setShowHotelSearchModal] =
    useState<boolean>(false);
  const [showTravelSelector, setShowTravelSelector] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-lg py-8 px-9 mt-5 relative">
      <div className="flex justify-between [&>*]:bg-gray-100 [&>*]:px-4 [&>*]:py-2 [&>*]:cursor-pointer [&>*]:rounded-lg mb-4">
        <div
          className="bg-gray-200 rounded-md w-[32%]"
          onClick={() => {
            setShowHotelSearchModal(true);
          }}
        >
          <div className="flex">
            <img src={Assets.LocationPointer} alt="Location pointer" />
            <p className="text-gray-300 text-sm ml-1">TO</p>
          </div>
          <p className="text-black font-bold">
            {targetHotelLocation === null
              ? "No Location Selected"
              : targetHotelLocation?.city + " ," + targetHotelLocation?.country}
          </p>
          <p className="text-xs text-gray-400">
            {targetHotelLocation === null
              ? "No Location Selected"
              : targetHotelLocation?.name}
          </p>
        </div>
        <CheckInOrOutInput
          setDate={setCheckInDate}
          date={checkInDate}
          name="Check In"
        />
        <div
          className="rounded-md bg-gray-100 w-[32%] relative z-0"
          onClick={() => setShowTravelSelector(true)}
        >
          <div className="flex">
            <img src={Assets.LocationPointer} alt="Location" />
            <p className="text-gray-300 ml-1 text-sm">TO</p>
          </div>
          <p className="font-bold mb-2">
            {travellerHotelInfo.adults} adult - {travellerHotelInfo.kids}{" "}
            children - {travellerHotelInfo.Rooms} room
          </p>
          <p className="text-xs text-gray-400">Person</p>
        </div>
        {showTravelSelector && (
          <TravellerSelector closeModalFunction={setShowTravelSelector} />
        )}
      </div>
      <div className="flex justify-between relative">
        <CheckInOrOutInput
          setDate={setCheckOutDate}
          date={checkOutDate}
          name="Check out"
        />
        <div className="flex h-max mt-auto">
          <input
            type="checkbox"
            className="h-5 w-5 mr-2 cursor-pointer"
            ref={travelingForWorkCheckBox}
          />
          <p>I`m traveling for work</p>
        </div>
        <MoreButton />
        <input
          type="submit"
          value="SEARCH HOTELS"
          className="bg-red-600 text-white rounded-lg w-[22.4%] cursor-pointer"
          onClick={() => setMenuWide(false)}
        />
      </div>
      {showHotelSearchModal && (
        <AirportSearch
          closeModalFunction={setShowHotelSearchModal}
          typeOfSearch="Choose your target location"
        />
      )}
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
