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
    <div className="bg-white rounded-lg flex justify-between mt-2 py-4 px-5 items-center">
      <div>
        <p className="text-xs text-gray-400">FROM</p>
        <div className="rounded-full bg-gray-200 text-sm py-1 px-4 text-center">
          {pickUpLocation?.city + ' , ' + pickUpLocation?.country}
        </div>
      </div>
      {dropCarAtDifferentLocation && (
        <div>
          <p className="text-xs text-gray-400">TO</p>
          <p className="rounded-full bg-gray-200 text-sm py-1 px-4 text-center">
            {dropOffLocation?.city + ' , ' + dropOffLocation?.country}
          </p>
        </div>
      )}
      <div>
        <p className="text-xs text-gray-400">PICK UP DATE</p>
        <p className="rounded-full bg-gray-200 text-sm py-1 px-4 text-center">
          {getFormattedDate(pickUpDate)}
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-400">PICK UP TIME</p>
        <p className="rounded-full bg-gray-200 text-sm py-1 px-4 text-center">
          {pickUpTime}
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-400">DROP OFF DATE</p>
        <p className="rounded-full bg-gray-200 text-sm py-1 px-4 text-center">
          {getFormattedDate(dropOffDate)}
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-400">DROP OFF TIME</p>
        <p className="rounded-full bg-gray-200 text-sm py-1 px-4 text-center">
          {dropOffTime}
        </p>
      </div>
      <RedSearchButton
        text="Search Cars"
        to={'/car-rental/car-rental-results'}
      />
    </div>
  );
};

export default TaxiSearchParameters;
