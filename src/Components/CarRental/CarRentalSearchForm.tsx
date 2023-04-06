import React, { useState } from 'react';
import { Assets } from '../../Assets/Assets';
import { useCarRentalDataContext } from '../../Hooks/useCarRentalData';
import { isLinkClickable } from '../../Util/Helpers';
import { DatePicker } from '../DatePicker';
import OffPageLink from '../OffPageLink';
import { CarRentalSearch } from '../SearchModals/AirportSearch.cars';
import TimePicker from './TimePicker';

export type ModalConfig = {
  inputPlaceHolder: string;
  mainText: string;
  name: string;
  type: 'pick-up' | 'drop-off';
  closeFunction: React.Dispatch<React.SetStateAction<boolean>>;
};

const CarRentalSearchForm = () => {
  const { userCarRentalChoices } = useCarRentalDataContext();

  const [dropCarAtDifferentLocation, setDropCarAtDifferentLocation] =
    useState<boolean>(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const args = [
    userCarRentalChoices?.pickUpDate,
    userCarRentalChoices?.dropOffDate,
    userCarRentalChoices?.pickUpTime,
    userCarRentalChoices?.dropOffTime,
    userCarRentalChoices?.pickUpLocation,
  ];

  if (dropCarAtDifferentLocation) {
    args.push(userCarRentalChoices?.dropOffLocation);
  }

  const isClickable: boolean = isLinkClickable(...args);

  let config: ModalConfig = {
    inputPlaceHolder: 'Search pick up location',
    mainText: 'Pick Up location',
    name: 'Pick up location',
    closeFunction: setShowSearchModal,
    type: 'pick-up',
  };

  return (
    <div className="bg-white flex flex-wrap rounded-lg p-9 mt-5 gap-2 transition-all">
      <div
        className="bg-gray-100 rounded-md w-1/3 px-4 py-2 cursor-pointer"
        onClick={() => setShowSearchModal(true)}
      >
        <div className="flex">
          <img src={Assets.LocationPointer} alt="Location pointer" />
          <p className="text-gray-300 text-sm ml-1">Pick up location</p>
        </div>
        <p className="text-black font-bold">
          {userCarRentalChoices?.pickUpLocation === null
            ? 'No location selected'
            : userCarRentalChoices?.pickUpLocation.city +
              ', ' +
              userCarRentalChoices?.pickUpLocation.country}
        </p>
        <p className="text-xs text-gray-400">
          {userCarRentalChoices?.pickUpLocation === null
            ? 'No location picked'
            : userCarRentalChoices?.pickUpLocation.name}
        </p>
      </div>
      {dropCarAtDifferentLocation && (
        <div
          className="bg-gray-100 rounded-md w-[32%] px-4 py-2 cursor-pointer"
          onClick={() => {
            config = {
              ...config,
              inputPlaceHolder: 'Search drop off location',
              mainText: 'Drop off location',
              name: 'Drop off location',
            };
            setShowSearchModal(true);
          }}
        >
          <div className="flex">
            <img src={Assets.LocationPointer} alt="Location pointer" />
            <p className="text-gray-300 text-sm ml-1">Drop off location</p>
          </div>
          <p className="text-black font-bold">
            {userCarRentalChoices?.dropOffLocation === null
              ? 'No location selected'
              : userCarRentalChoices?.dropOffLocation.city +
                ', ' +
                userCarRentalChoices?.dropOffLocation.country}
          </p>
          <p className="text-xs text-gray-400">
            {userCarRentalChoices?.dropOffLocation === null
              ? 'No location picked'
              : userCarRentalChoices?.dropOffLocation.name}
          </p>
        </div>
      )}
      <DatePicker
        date={userCarRentalChoices!.pickUpDate}
        name="Pick-up date"
        type="pick-up-date"
        source="CarRental"
      />
      <DatePicker
        date={userCarRentalChoices!.dropOffDate}
        name="Drop-off Date"
        type="drop-off-date"
        source="CarRental"
      />
      <TimePicker name="Pick-up time" type="pick-up-time" />
      <TimePicker name="Drop-off time" type="drop-off-time" />
      <div className="flex items-center flex-grow text-white bg-blue-600 px-3 py-2 rounded-md text-sm h-max mt-auto">
        <input
          type="checkbox"
          className="mr-2 h-5 w-5 rounded-xl"
          onChange={(e) => setDropCarAtDifferentLocation(e.target.checked)}
        />
        <p>Drop car off at different location</p>
      </div>
      <OffPageLink
        isClickable={isClickable}
        to="car-rental-results"
        children="SEARCH CARS"
      />
      {showSearchModal && <CarRentalSearch config={config} />}
    </div>
  );
};

export default CarRentalSearchForm;
