import React, { useEffect, useState } from 'react';
import Flag from 'react-world-flags';
import { Assets } from '../../Assets/Assets';
import { fetchHotelReviews } from './fetchers/FetchHotelReviews';
import { HotelReviews } from '../../Types/HotelReviews';
import { monthNames } from '../../Util/Helpers';
import LoadingScreen from '../LoadingScreen';
import { useHotelSearchResults } from './HotelSearchResultsProvider';

const GuestRatings = () => {
  const { selectedHotelInfo } = useHotelSearchResults();
  const [hotelReviews, setHotelReviews] = useState<HotelReviews | null>(null);
  const hotelInfo = selectedHotelInfo?.hotelInfo;

  const fetchHotelReview = async () => {
    const hotelReviews = await fetchHotelReviews(
      hotelInfo?.hotel_id.toString()!
    );
    setHotelReviews(hotelReviews);
  };

  useEffect(() => {
    fetchHotelReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-2/5 h-full overflow-y-scroll">
      <p className="font-bold mb-3">Guest Ratings</p>
      {hotelReviews ? (
        hotelReviews.result.map((review) => (
          <div key={review.author.user_id} className=" pb-3 border-b">
            <div className="flex justify-between">
              <div className="w-[30%]">
                <div className="flex items-center">
                  <img
                    src={
                      review.author.avatar === undefined
                        ? Assets.PersonClipArt
                        : review.author.avatar
                    }
                    alt="Person"
                    className="rounded-full h-9 w-9 mr-3"
                  />
                  <div>
                    <p className="font-sm font-semibold caveat">
                      {review.author.name}
                    </p>
                    <div className="flex">
                      <Flag
                        code={review.countrycode}
                        fallback={<span>Country flag</span>}
                        height="16"
                        width="32"
                      />
                      <p className="font-sm ml-2">
                        {getCountryNameFromCountryCode(review.countrycode)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex text-gray-500 text-xs items-start my-3">
                  <img
                    src={review.stayed_room_info.photo.url_square60}
                    alt="room"
                    className="w-5 h-5 mr-2 rounded-sm cursor-pointer hover:w-10 hover:h-10 transition-all"
                  />
                  <p>{review.stayed_room_info.room_name}</p>
                </div>
                <div className="flex text-gray-500 text-xs items-center my-3">
                  <img
                    src={Assets.Calendar}
                    alt="Calendar"
                    className="w-5 h-5 mr-2"
                  />
                  <p>
                    {getNumberOfNights(
                      review.stayed_room_info.checkin,
                      review.stayed_room_info.checkout
                    )}{' '}
                    nights .{' '}
                    {getMonthAndYearString(review.stayed_room_info.checkout)}
                  </p>
                </div>
                <div className="flex text-gray-500 text-xs my-3">
                  <img
                    src={getAuthorTypeClipArt(review.author.type)}
                    alt="author type"
                    className="w-5 h-5 mr-2"
                  />
                  <p className="capitalize">{review.author.type}</p>
                </div>
              </div>
              <div className="w-[60%] flex-grow pl-4">
                <p className="text-xs text-gray-500">
                  Reviewed: {getFormattedDateString(review.date)}
                </p>
                <p className="capitalize my-2">{review.title}</p>
                <p className="text-sm my-3">😁 {review.pros}</p>
                <p className="text-sm my-2">😞 {review.cons}</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-sm py-3 mt-3 mb-7 px-2">
              <p className="font-bold">Hotel Response:</p>
              <p className="text-xs leading-relaxed">
                {review.hotelier_response}
              </p>
            </div>
          </div>
        ))
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default GuestRatings;

const getNumberOfNights = (checkin: string, checkout: string): number => {
  let checkInDate: Date = new Date(checkin);
  let checkOutDate: Date = new Date(checkout);
  return (checkOutDate.getTime() - checkInDate.getTime()) / 86400000;
};

const getFormattedDateString = (date: string): string => {
  let myDate: Date = new Date(date);
  return `${
    monthNames[myDate.getMonth()] +
    ' ' +
    myDate.getDate() +
    ', ' +
    myDate.getFullYear()
  }`;
};

const getAuthorTypeClipArt = (type: string): string | undefined => {
  if (type === 'couple') {
    return Assets.CoupleClipArt;
  } else if (type === 'family_with_children') {
    return Assets.FamilyClipArt;
  } else {
    return Assets.StandingManClipArt;
  }
};

const getMonthAndYearString = (checkout: string): string => {
  let date: Date = new Date(checkout);
  return monthNames[date.getMonth()] + ' ' + date.getFullYear();
};

const getCountryNameFromCountryCode = (
  countrycode: string
): React.ReactNode => {
  //TODO fix . currently not working
  let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  return regionNames.of(countrycode);
};
