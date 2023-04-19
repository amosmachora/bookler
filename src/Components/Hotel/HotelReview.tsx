import React, { useEffect, useState } from 'react';
import { Assets } from '../../Assets/Assets';
import { fetchHotelDescription } from './fetchers/FetchHotelDescription';

import { HotelDescription } from '../../Types/HotelDescription';
import { useHotelSearchResults } from './HotelSearchResultsProvider';
import LittleFacilityDisplay from './LittleFacilityDisplay';
import LoadingScreen from '../LoadingScreen';

export const HotelReview = () => {
  const { selectedHotelInfo } = useHotelSearchResults();
  const hotelInfo = selectedHotelInfo?.hotelInfo;
  const hotelReviewScore: number = (hotelInfo!.review_score / 10) * 5;

  const [hotelDescription, setHotelDescription] = useState<
    HotelDescription[] | null
  >(null);

  useEffect(() => {
    fetchHotelDescription(hotelInfo?.hotel_id.toString()!).then((res) =>
      setHotelDescription(res)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-2/5 h-full overflow-y-scroll relative">
      <p className="font-bold">Hotel review</p>
      <div className="flex items-center mt-2">
        <div className="bg-ratingBg flex rounded-sm w-max px-2 text-white text-sm py-1 items-center">
          <p className="mr-1 font-bold">{hotelReviewScore.toFixed(1)}</p>
          <img src={Assets.Star} alt="Star" />
        </div>
        <div className="ml-3">
          <p className="text-sm">{hotelInfo?.review_score_word}</p>
          <div className="flex">
            <p className="text-[11px] text-gray-400 mr-2">
              {hotelInfo?.review_nr} reviews
            </p>
            {[...Array(parseInt(hotelReviewScore.toFixed(0)))].map((i) => (
              <img src={Assets.StarBlue} alt="star" key={i} />
            ))}
            {[...Array(5 - parseInt(hotelReviewScore.toFixed(0)))].map((i) => (
              <img src={Assets.StarGray} alt="star" key={i} />
            ))}
          </div>
        </div>
      </div>
      <p className="font-bold mt-5 mb-2">About</p>
      <p className="text-xs text-gray-400 leading-5">
        {hotelDescription ? hotelDescription[0].description : <LoadingScreen />}
      </p>
      <p className="font-bold mt-5 mb-2">Popular Services</p>
      <div className="flex">
        {selectedHotelInfo?.hotelFacilities.slice(0, 3).map((facility) => (
          <LittleFacilityDisplay
            facility={facility}
            mapShown={false}
            key={facility.facility_name}
          />
        ))}
      </div>
      <div className="flex justify-between bg-covidBg rounded-lg py-2 px-7 mt-5 absolute bottom-0 right-0 left-0">
        <div className="flex">
          <img src={Assets.SoapyHands} alt="SoapyHands" />
          <p className="text-sm font-semibold ml-5">
            Travel safe during <br /> COVID-19
          </p>
        </div>
        <img src={Assets.InfoIcon} alt="Info" className="cursor-pointer" />
      </div>
    </div>
  );
};
