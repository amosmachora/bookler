import React, { useState } from 'react';
import { Assets } from '../../Assets/Assets';
import { CompleteHotel, GoogleMapsCenter, HotelImage } from '../../Types/Hotel';
import LittleFacilityDisplay from './LittleFacilityDisplay';
import { Link } from 'react-router-dom';
import { useHotelSearchResults } from './HotelSearchResultsProvider';
import { Rating } from '../Rating';

const HotelData = ({
  mapCenter,
  hotelData,
  setMapCenter,
  activeTab,
  setActiveTab,
}: {
  hotelData: CompleteHotel;
  mapCenter: GoogleMapsCenter | null;
  setMapCenter: React.Dispatch<React.SetStateAction<GoogleMapsCenter | null>>;
  activeTab: string | null;
  setActiveTab: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [showAllFacilities, setShowAllFacilities] = useState<boolean>(false);
  const { setSelectedHotelInfo } = useHotelSearchResults();
  const isBookingAllowed: boolean =
    hotelData.hotelInfo.soldout === 0 ? true : false;

  const [image, setImage] = useState(getMainImage(hotelData.hotelImages));

  return (
    <div
      className={`bg-white rounded-md h-48 ${
        activeTab === hotelData.hotelInfo.hotel_name
          ? 'shadow-md border-2 my-2 border-red-400'
          : 'mb-1 border-0'
      } transition-all`}
    >
      <div className="flex h-full">
        <div className="h-full relative w-1/3">
          <img
            src={image}
            alt="Hotel main"
            className={`h-full w-full object-cover ${
              mapCenter ? 'rounded-l-md' : 'rounded-md'
            }`}
          />
          {!mapCenter && (
            <div className="absolute z-50 flex bottom-4 w-full px-5 justify-between h-7 items-center">
              <div className="flex items-center">
                {hotelData.hotelImages.slice(0, 3).map((image) => (
                  <img
                    src={image.img_url_medium}
                    alt="Random hotel"
                    className="rounded-[50%] border-white h-6 w-6 cursor-pointer mr-1 border hover:border-2 transition-all hover:h-7 hover:w-7"
                    onClick={() => setImage(image.img_url_large)}
                  />
                ))}
              </div>
              <div>
                <button
                  className="text-white w-6 h-6 rounded-sm mr-2 text-lg toggle-image-buttons"
                  onClick={() =>
                    setImage(getRandomImage(hotelData.hotelImages))
                  }
                >
                  <img
                    src={Assets.ArrowWhiteLeft}
                    alt="Arrow"
                    className="mx-auto h-3"
                  />
                </button>
                <button
                  className="w-6 h-6 rounded-sm text-white text-lg toggle-image-buttons"
                  onClick={() =>
                    setImage(getRandomImage(hotelData.hotelImages))
                  }
                >
                  <img
                    src={Assets.ArrowWhiteRight}
                    alt="Arrow"
                    className="mx-auto h-3"
                  />
                </button>
              </div>
            </div>
          )}
        </div>
        <div
          className={`py-6 flex-grow relative ${
            mapCenter ? 'w-[67%] px-2' : 'pr-20 w-[70%] pl-6'
          }`}
        >
          <div className="flex justify-between items-center">
            <p className={`font-bold ${mapCenter ? 'text-sm' : 'text-lg'}`}>
              {hotelData.hotelInfo.hotel_name}
            </p>
            {activeTab === hotelData.hotelInfo.hotel_name ? (
              <p
                className="text-xs uppercase text-red-600 font-bold cursor-pointer hover:text-red-500"
                onClick={() => {
                  setMapCenter(null);
                  setActiveTab(null);
                }}
              >
                Close Map
              </p>
            ) : (
              <p
                className="text-xs uppercase text-red-600 font-bold cursor-pointer hover:text-red-500"
                onClick={() => {
                  setActiveTab(hotelData.hotelInfo.hotel_name);
                  setMapCenter({
                    lat: hotelData.hotelInfo.latitude,
                    lng: hotelData.hotelInfo.longitude,
                  });
                }}
              >
                Map View
              </p>
            )}
            <Rating
              mapShown={mapCenter !== null}
              rating={((hotelData.hotelInfo.review_score / 10) * 5).toFixed(1)}
            />
          </div>
          <p className="font-semibold text-xs">{hotelData.hotelInfo.address}</p>
          {!mapCenter && (
            <div
              className={`${
                showAllFacilities
                  ? 'h-11 overflow-y-scroll'
                  : `h-4 overflow-y-hidden`
              } w-full flex flex-wrap my-3 relative`}
            >
              {hotelData.hotelFacilities.map((facility, index) => (
                <LittleFacilityDisplay
                  facility={facility}
                  key={index}
                  mapShown={mapCenter !== null}
                />
              ))}
              <p
                className="font-bold text-xs right-1 top-0 absolute cursor-pointer"
                onClick={() => setShowAllFacilities((prev) => !prev)}
              >
                {showAllFacilities ? 'Less -' : 'More +'}
              </p>
            </div>
          )}
          <div
            className={`flex justify-between items-center absolute bottom-3 ${
              mapCenter ? 'w-full' : 'w-[95%]'
            }`}
          >
            <div
              className={`flex items-center ${
                mapCenter ? 'w-[30%]' : 'w-auto'
              }`}
            >
              <p className="text-yellow-500 text-xs font-light mr-2">25% off</p>
              <p className="font-bold">
                ${hotelData.hotelInfo.price_breakdown.all_inclusive_price}
              </p>
            </div>
            <div className={`text-xs flex items-center`}>
              <Link
                className={`py-3 ${
                  mapCenter
                    ? 'px-1 hover:border-gray-400 transition-all mr-2'
                    : 'bg-gray-300 hover:bg-gray-400 px-5 mr-4'
                } rounded-md font-semibold transition-all border-2 border-transparent`}
                onClick={() => {
                  setSelectedHotelInfo({
                    hotelFacilities: hotelData.hotelFacilities,
                    hotelInfo: hotelData.hotelInfo,
                    hotelImages: hotelData.hotelImages,
                  });
                }}
                to="hotel-details"
              >
                View Details
              </Link>
              {mapCenter === null ? (
                isBookingAllowed ? (
                  <a
                    className={`rounded-md transition-all disabled:cursor-not-allowed py-3 border-2 border-transparent ${
                      mapCenter
                        ? 'text-blue-600 font-semibold px-1 hover:border-blue-600 transition-all'
                        : 'bg-blue-600 text-white px-5 hover:bg-blue-400'
                    }`}
                    href={hotelData.hotelInfo.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    BOOK NOW
                  </a>
                ) : (
                  <button className="text-white bg-blue-600 px-5 py-3 rounded-md hover:bg-blue-400 transition-all disabled:cursor-not-allowed">
                    SOLD OUT 😥
                  </button>
                )
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelData;

/**
 * @param image_type A image type string e.g "Property Building"
 * @returns imageUrl of the specified image
 */
export const getMainImage = (hotelImages: HotelImage[]): string => {
  const image = hotelImages.find(
    (image) => image.tag_name === 'Property Building'
  )?.img_url_large;

  return image ?? getRandomImage(hotelImages);
};

const getRandomImage = (hotelImages: HotelImage[]): string => {
  const randomIndex: number = Math.floor(Math.random() * 10);

  const possibleTags: string[] = Array.from(
    new Set(
      hotelImages
        .filter((image) => image.tag_name != null)
        .map((image) => image.tag_name as string)
    )
  );
  return hotelImages.find(
    (image) => image.tag_name === possibleTags[randomIndex]
  )!.img_url_large;
};
