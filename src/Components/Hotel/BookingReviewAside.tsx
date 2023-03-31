import React from 'react';
import { Assets } from '../../Assets/Assets';
import { SelectedHotel } from '../../Types/Hotel';
import { getDay, monthNames } from '../../Util/Helpers';
import { useUserHotelData } from './useUserHotelData';

const BookingReviewAside = ({
  selectedHotelInfo,
}: {
  selectedHotelInfo: SelectedHotel | null;
}) => {
  const { checkInDate, checkOutDate } = useUserHotelData();

  const hotelImages = selectedHotelInfo?.hotelImages;
  const hotelInfo = selectedHotelInfo?.hotelInfo;
  return (
    <div className="w-1/5 bg-white rounded-md overflow-hidden p-3">
      <img
        src={
          hotelImages?.find((image) => image.tag_name === 'Property Building')
            ?.img_url_large
        }
        alt="hotel view"
        className="rounded-md"
      />
      <p className="text-lg font-semibold mt-3">{hotelInfo?.hotel_name}</p>
      <div className="flex">
        <img src={Assets.LocationPointerBlue} alt="location" />
        <p className="text-xs">{hotelInfo?.address_trans}</p>
      </div>
      <p className="mt-8 mb-5 text-sm">Check In</p>
      <div className="border text-sm font-semibold py-3 px-4">
        <p>{`${
          checkInDate?.getDate() +
          ' ' +
          monthNames[checkInDate!.getMonth()].substring(0, 3) +
          ', ' +
          checkInDate?.getFullYear() +
          ', ' +
          getDay(checkInDate)
        }`}</p>
      </div>
      <p className="mt-8 mb-5 text-sm">Check Out</p>
      <div className="border text-sm font-semibold py-3 px-4">
        <p>{`${
          checkOutDate?.getDate() +
          ' ' +
          monthNames[checkOutDate!.getMonth()].substring(0, 3) +
          ', ' +
          checkOutDate?.getFullYear() +
          ', ' +
          getDay(checkOutDate)
        }`}</p>
      </div>
      <div className="flex flex-col items-end mt-7">
        <p className="font-bold text-3xl mb-3">
          {hotelInfo?.price_breakdown.all_inclusive_price}{' '}
          <span className="text-xs font-normal text-gray-400">
            {hotelInfo?.price_breakdown.currency}
          </span>
        </p>
        <a
          className="px-6 py-2 bg-blue-600 rounded-md text-[11px] text-white"
          href={hotelInfo?.url}
          target="_blank"
          rel="noreferrer"
        >
          PAY NOW
        </a>
      </div>
    </div>
  );
};

export default BookingReviewAside;
