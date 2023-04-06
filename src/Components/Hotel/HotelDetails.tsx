import React, { useState } from 'react';
import { Assets } from '../../Assets/Assets';
import { useHotelSearchResults } from './HotelSearchResultsProvider';
import { HotelDetailsImages } from './HotelDetailsImages';
import { HotelReview } from './HotelReview';
import GuestRatings from './GuestRatings';
import { PayNowButton } from '../PayNowButton';
import HotelSearchParameters from './HotelSearchParameters';

const HotelDetails = () => {
  const { selectedHotelInfo } = useHotelSearchResults();
  const hotelInfo = selectedHotelInfo?.hotelInfo;
  const [showInfo, setShowInfo] = useState(true);

  return (
    <div>
      <HotelSearchParameters />
      <div className="flex px-5 bg-flightResultsBg py-2 rounded-sm mb-1 items-center justify-between">
        <p className="font-bold">Hotel Details</p>
        <div className="flex">
          <p
            className={`${
              showInfo ? 'bg-blue-900 text-white' : 'text-gray-400'
            } text-xs py-2 px-3 rounded-full mr-3 cursor-pointer transition-all`}
            onClick={() => setShowInfo(true)}
          >
            Info and Price
          </p>
          <p
            className={`${
              showInfo ? 'text-gray-400' : 'text-white bg-blue-900'
            } text-xs py-2 px-3 rounded-full cursor-pointer transition-all`}
            onClick={() => setShowInfo(false)}
          >
            Guest Ratings
          </p>
        </div>
      </div>
      <div className="bg-white rounded-md px-3 py-6">
        <div className="flex justify-between mb-2">
          <div>
            <p className="font-bold text-2xl">{hotelInfo?.hotel_name}</p>
            <div className="flex">
              <img src={Assets.LocationPointerBlue} alt="location-pointer" />
              <p className="text-sm">{hotelInfo?.address}</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-2xl font-bold">
              {hotelInfo?.price_breakdown.all_inclusive_price}{' '}
              <span className="text-gray-500 text-xs font-normal">USD</span>
            </p>
            <PayNowButton linkTo="booking-review" />
          </div>
        </div>
        <div className="flex justify-between h-[67vh] gap-x-4 w-full">
          <HotelDetailsImages />
          {showInfo ? <HotelReview /> : <GuestRatings />}
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
