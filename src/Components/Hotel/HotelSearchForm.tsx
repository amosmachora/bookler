import React, { useContext, useEffect, useState } from "react";
import { Assets } from "../../Assets/Assets";
import { isLinkClickable } from "../../Util/Helpers";
import { MainContext } from "../Contexts/MainAppProvider";
import { DatePicker } from "../DatePicker";
import { MoreButton } from "../MoreButton";
import OffPageLink from "../OffPageLink";
import AirportSearch from "../SearchModals/AirportSearch";
import { HotelSearchContext } from "./HotelProvider";
import TravellerSelector from "./TravellersSelector";

const HotelSearchForm = () => {
  const {
    setCheckInDate,
    setCheckOutDate,
    checkInDate,
    checkOutDate,
    targetHotelLocation,
    travellerHotelInfo,
    travelingForWorkCheckBox,
    setTargetHotelLocation,
  } = useContext(HotelSearchContext);

  const { setMenuWide } = useContext(MainContext);

  useEffect(() => {
    setMenuWide(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showTravelSelector, setShowTravelSelector] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const isClickable = isLinkClickable(
    targetHotelLocation,
    checkInDate,
    checkOutDate
  );

  return (
    <div className="bg-white rounded-lg py-8 px-9 mt-5 relative">
      <div className="flex justify-between [&>*]:bg-gray-100 [&>*]:px-4 [&>*]:py-2 [&>*]:cursor-pointer [&>*]:rounded-lg mb-4">
        <div
          className="bg-gray-200 rounded-md w-[32%]"
          onClick={() => setShowSearchModal(true)}
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
        <DatePicker
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
        <DatePicker
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
        <OffPageLink to="hotel-results" isClickable={isClickable}>
          SEARCH FLIGHT
        </OffPageLink>
        {showSearchModal && (
          <AirportSearch
            config={{
              closeFunction: setShowSearchModal,
              inputPlaceHolder: "Search hotel location",
              mainText: "Hotel",
              name: "Hotel",
              setFunction: setTargetHotelLocation,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default HotelSearchForm;
