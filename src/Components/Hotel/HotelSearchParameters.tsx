import React from 'react';
import { useHotelDataContext } from '../../Hooks/useHotelData';
import { DatePicker } from '../DatePicker';
import { RedSearchButton } from '../RedSearchButton';

const HotelSearchParameters = () => {
  const { userHotelChoices } = useHotelDataContext();
  const { checkInDate, checkOutDate, travellerHotelInfo, targetHotelLocation } =
    userHotelChoices;
  return (
    <div className="flex justify-between items-center bg-white py-4 px-5 mt-10 rounded-b-lg text-sm mb-5">
      <div>
        <p className="text-xs text-gray-300 ml-2">WHERE</p>
        <p className="bg-gray-100 py-2 px-6 rounded-full mt-1">
          {targetHotelLocation?.city + ', ' + targetHotelLocation?.country}
        </p>
      </div>
      <DatePicker
        date={checkInDate}
        source="Hotels"
        type="check-in-date"
        name="CHECK-IN"
      />
      <DatePicker
        date={checkOutDate}
        name="CHECK-OUT"
        source="Hotels"
        type="check-out-date"
      />
      <div>
        <p className="text-xs text-gray-300 ml-2">Rooms & Guests</p>
        <p className="flex bg-gray-100 py-2 px-6 rounded-full mt-1">
          {travellerHotelInfo.Rooms} Room, {travellerHotelInfo.adults} Adults{' '}
          {travellerHotelInfo.kids} Kids
        </p>
      </div>
      <RedSearchButton text="Search Hotels" />
    </div>
  );
};

export default HotelSearchParameters;
