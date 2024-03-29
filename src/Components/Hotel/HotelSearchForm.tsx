import React, { useState } from 'react';
import { Assets } from '../../Assets/Assets';
import { useHotelDataContext } from '../../Hooks/useHotelData';
import { isLinkClickable } from '../../Util/Helpers';
import { DatePicker } from '../DatePicker';
import { MoreButton } from '../MoreButton';
import OffPageLink from '../OffPageLink';
import { HotelsSearch } from '../SearchModals/AirportSearch.hotels';
import TravellerSelector from './TravellersSelector';

const HotelSearchForm = () => {
  const { userHotelChoices, travelingForWorkCheckBox } = useHotelDataContext();
  const { targetHotelLocation, travellerHotelInfo, checkInDate, checkOutDate } =
    userHotelChoices;

  const [showTravelSelector, setShowTravelSelector] = useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const isClickable = isLinkClickable(
    userHotelChoices.targetHotelLocation,
    userHotelChoices.checkInDate,
    userHotelChoices.checkOutDate
  );

  return (
    <div className="bg-white rounded-lg py-8 px-9 mt-5 relative">
      <div className="flex flex-wrap gap-2 [&>*]:px-3 [&>*]:py-2 [&>*]:cursor-pointer [&>*]:rounded-lg">
        <div
          className="bg-gray-200 rounded-md flex-grow"
          onClick={() => setShowSearchModal(true)}
        >
          <div className="flex">
            <img src={Assets.LocationPointer} alt="Location pointer" />
            <p className="text-gray-300 text-sm ml-1">TO</p>
          </div>
          <p className="text-black font-bold">
            {targetHotelLocation === null
              ? 'No Location Selected'
              : targetHotelLocation?.city + ' ,' + targetHotelLocation?.country}
          </p>
          <p className="text-xs text-gray-400">
            {targetHotelLocation === null
              ? 'No Location Selected'
              : targetHotelLocation?.name}
          </p>
        </div>
        <DatePicker
          date={checkInDate}
          name="Check In"
          source="Hotels"
          type="check-in-date"
        />
        <DatePicker
          date={checkOutDate}
          name="Check out"
          source="Hotels"
          type="check-out-date"
        />
        <div
          className="rounded-md bg-gray-100 relative z-0"
          onClick={() => setShowTravelSelector(true)}
        >
          <div className="flex">
            <img src={Assets.LocationPointer} alt="Location" />
            <p className="text-gray-300 ml-1 text-sm">Travellers</p>
          </div>
          <p className="font-bold mb-2">
            {travellerHotelInfo.adults} adult - {travellerHotelInfo.kids}{' '}
            children - {travellerHotelInfo.Rooms} room
          </p>
          <p className="text-xs text-gray-400">Person</p>
        </div>
        {showTravelSelector && (
          <TravellerSelector closeModalFunction={setShowTravelSelector} />
        )}
        <MoreButton />
        <div className="flex items-center flex-grow text-white bg-blue-600 px-3 py-2 rounded-md text-sm h-max mt-auto">
          <input
            type="checkbox"
            className="h-5 w-5 mr-2 cursor-pointer"
            ref={travelingForWorkCheckBox}
          />
          <p>I`m traveling for work</p>
        </div>
        <OffPageLink to="hotel-results" isClickable={isClickable}>
          SEARCH FLIGHT
        </OffPageLink>
        {showSearchModal && (
          <HotelsSearch
            config={{
              closeFunction: setShowSearchModal,
              inputPlaceHolder: 'Search hotel location',
              mainText: 'Hotel',
              name: 'Hotel',
              type: 'drop-off', // TODO plastering wounds
            }}
          />
        )}
      </div>
    </div>
  );
};

export default HotelSearchForm;
