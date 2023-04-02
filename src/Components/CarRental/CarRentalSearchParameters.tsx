import React from 'react';
import { useCarRentalDataContext } from '../../Hooks/useCarRentalData';
import { getFormattedDate } from '../../Util/Helpers';
import { RedSearchButton } from '../RedSearchButton';

const TaxiSearchParameters = () => {
  const { dropCarAtDifferentLocation, userCarRentalChoices } =
    useCarRentalDataContext();

  const {
    pickUpLocation,
    dropOffLocation,
    pickUpDate,
    dropOffDate,
    dropOffTime,
    pickUpTime,
  } = userCarRentalChoices!;

  return (
    <div className="bg-white rounded-b-lg flex justify-between mt-10 py-4 px-5 items-center">
      <div>
        <p className="text-xs text-gray-400">FROM</p>
        <div className="rounded-full bg-gray-200 text-sm py-1 px-2">
          {pickUpLocation?.city + ' , ' + pickUpLocation?.country}
        </div>
      </div>
      {dropCarAtDifferentLocation && (
        <div>
          <p className="text-xs text-gray-400">TO</p>
          <p className="rounded-full bg-gray-200 text-sm py-1 px-2">
            {dropOffLocation?.city + ' , ' + dropOffLocation?.country}
          </p>
        </div>
      )}
      <div>
        <p className="text-xs text-gray-400">PICK UP DATE</p>
        <p className="rounded-full bg-gray-200 text-sm py-1 px-2">
          {getFormattedDate(pickUpDate)}
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-400">PICK UP TIME</p>
        <p className="rounded-full bg-gray-200 text-sm py-1 px-2">
          {pickUpTime}
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-400">DROP OFF DATE</p>
        <p className="rounded-full bg-gray-200 text-sm py-1 px-2">
          {getFormattedDate(dropOffDate)}
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-400">DROP OFF TIME</p>
        <p className="rounded-full bg-gray-200 text-sm py-1 px-2">
          {dropOffTime}
        </p>
      </div>
      <RedSearchButton text="Search Cars" />
    </div>
  );
};

export default TaxiSearchParameters;
