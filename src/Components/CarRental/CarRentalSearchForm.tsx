import React, { useState } from 'react';
import { Assets } from '../../Assets/Assets';
import { useCarRentalDataContext } from '../../Hooks/useCarRentalData';
import { isLinkClickable } from '../../Util/Helpers';
import { DatePicker } from '../DatePicker';
import OffPageLink from '../OffPageLink';
import { CarRentalSearch } from '../SearchModals/AirportSearch.cars';
import {
  getArrayOfObjects,
  useCarRentalSearchResults,
} from './CarRentalSearchResultsProvider';
import { fetchCarRentals } from './fetchers/FetchCarRentals';
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
  const { setCarRentalData, setSuggestedVehicles } =
    useCarRentalSearchResults();

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [dropsCarAtDifferentLocation, setDropsCarAtDifferentLocation] =
    useState(false);

  const [config, setConfig] = useState<ModalConfig>({
    inputPlaceHolder: 'Search pick up location',
    mainText: 'Pick Up location',
    name: 'Pick up location',
    closeFunction: setShowSearchModal,
    type: 'pick-up',
  });

  const args = [
    userCarRentalChoices?.pickUpDate,
    userCarRentalChoices?.dropOffDate,
    userCarRentalChoices?.pickUpTime,
    userCarRentalChoices?.dropOffTime,
    userCarRentalChoices?.pickUpLocation,
  ];

  if (dropsCarAtDifferentLocation) {
    args.push(userCarRentalChoices?.dropOffLocation);
  }

  const isClickable: boolean = isLinkClickable(...args);

  const handleCarRentalSearch = () => {
    fetchCarRentals(
      userCarRentalChoices.pickUpLocation!.iata,
      getConcatenatedDate(
        userCarRentalChoices.dropOffDate,
        userCarRentalChoices.dropOffTime!
      ),
      getConcatenatedDate(
        userCarRentalChoices.pickUpDate,
        userCarRentalChoices.pickUpTime!
      ),
      userCarRentalChoices.dropOffLocation?.iata ??
        userCarRentalChoices.pickUpLocation!.iata
    ).then((res) => {
      setCarRentalData(res);
      setSuggestedVehicles(getArrayOfObjects(res.vehicleRates));
    });
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
      {dropsCarAtDifferentLocation && (
        <div
          className="bg-gray-100 rounded-md w-[32%] px-4 py-2 cursor-pointer"
          onClick={() => {
            setConfig({
              type: 'drop-off',
              inputPlaceHolder: 'Search drop off location',
              mainText: 'Drop off location',
              name: 'Drop off location',
              closeFunction: setShowSearchModal,
            });
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
          onChange={(e) => setDropsCarAtDifferentLocation(e.target.checked)}
        />
        <p>Drop car off at different location</p>
      </div>
      <OffPageLink
        isClickable={isClickable}
        to="car-rental-results"
        children="SEARCH CARS"
        onClick={handleCarRentalSearch}
      />
      {showSearchModal && <CarRentalSearch config={config} />}
    </div>
  );
};

export default CarRentalSearchForm;

const getConcatenatedDate = (date: Date | null, Time: string): string => {
  if (!date) {
    return '';
  }
  return `${
    date!.getFullYear() +
    '-' +
    (date!.getMonth() + 1) +
    '-' +
    date!.getDate() +
    ' ' +
    Time +
    ':00'
  }`;
};
