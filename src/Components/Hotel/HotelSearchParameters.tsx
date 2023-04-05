import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHotelDataContext } from '../../Hooks/useHotelData';
import { getFormattedDate } from '../../Util/Helpers';
import { RedSearchButton } from '../RedSearchButton';

const HotelSearchParameters = () => {
  const { userHotelChoices } = useHotelDataContext();
  const { checkInDate, checkOutDate, travellerHotelInfo, targetHotelLocation } =
    userHotelChoices;
  return (
    <div className="flex justify-between items-center bg-white py-4 px-5 my-2 rounded-lg text-sm">
      <div>
        <p className="text-xs text-gray-300 ml-2">WHERE</p>
        <p className="bg-gray-100 py-2 px-6 rounded-full mt-1">
          {targetHotelLocation?.city + ', ' + targetHotelLocation?.country}
        </p>
      </div>
      <HotelSearchFormDatePicker date={checkInDate} text="CHECK-IN" />
      <HotelSearchFormDatePicker date={checkOutDate} text="CHECK-OUT" />
      <div>
        <p className="text-xs text-gray-300 ml-2">Rooms & Guests</p>
        <p className="flex bg-gray-100 py-2 px-6 rounded-full mt-1">
          {travellerHotelInfo.Rooms} Room, {travellerHotelInfo.adults} Adults{' '}
          {travellerHotelInfo.kids} Kids
        </p>
      </div>
      <RedSearchButton text="Search Hotels" to="hotels/hotel-results" />
    </div>
  );
};

export default HotelSearchParameters;

const HotelSearchFormDatePicker = ({
  date,
  text,
}: {
  date: Date | null;
  text: string;
}) => {
  return (
    <div>
      <p className="text-xs text-gray-300 ml-2">{text}</p>
      <div className="py-2 px-6 flex justify-between items-center bg-gray-100 rounded-full">
        <p>{getFormattedDate(date)}</p>
        <FontAwesomeIcon icon={faCalendarDays} className="text-gray-400 ml-2" />
      </div>
    </div>
  );
};
