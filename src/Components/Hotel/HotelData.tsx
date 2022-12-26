import { Rating } from "../../Components/Rating";
import React, { useContext, useEffect, useState } from "react";
import { Assets } from "../../Assets/Assets";
import {
  fetchHotelImages,
  getCleanedArrayOfImageObjects,
} from "../../Fetchers/FetchHotelImages";
import {
  Facility,
  GoogleMapsCenter,
  HotelImage,
  HotelInfo,
  SelectedHotel,
} from "../../Types/Hotel";
import DevHotelImages from "../../Util/HotelImages.json";
import Facilities from "../../Util/Facilities.json";
import { fetchHotelFacilities } from "../../Fetchers/FetchHotelFacilities";
import LittleFacilityDisplay from "./LittleFacilityDisplay";
import { MainContext } from "../Contexts/MainAppProvider";

const HotelData = ({
  hotelInfo,
  setShowMapFunction,
  mapShown,
  setMapCenter,
  activeTab,
  setActiveTab,
  setStage,
  setSelectedHotelInfo,
  hotelList,
}: {
  hotelInfo: HotelInfo;
  setShowMapFunction: React.Dispatch<React.SetStateAction<boolean>>;
  mapShown: boolean;
  setMapCenter: React.Dispatch<React.SetStateAction<GoogleMapsCenter>>;
  activeTab: string | null;
  setActiveTab: React.Dispatch<React.SetStateAction<string | null>>;
  setStage: React.Dispatch<React.SetStateAction<string>>;
  setSelectedHotelInfo: React.Dispatch<
    React.SetStateAction<SelectedHotel | null>
  >;
  hotelList: HotelInfo[];
}) => {
  const [hotelImages, setHotelImages] = useState<HotelImage[]>(
    getCleanedArrayOfImageObjects(DevHotelImages)
  );
  const { devMode } = useContext(MainContext);
  const [hotelFacilities, setHotelFacilities] =
    useState<Facility[]>(Facilities);

  const [showAllFacilities, setShowAllFacilities] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetchHotelImages(hotelInfo.hotel_id).then((res) =>
        setHotelImages(res)
      );
      await fetchHotelFacilities(hotelInfo.hotel_id.toString()).then((res) =>
        setHotelFacilities(res)
      );
    };
    if (!devMode) {
      fetchData();
    }
  }, [devMode, hotelInfo.hotel_id]);

  const isBookingAllowed: boolean = hotelInfo.soldout === 0 ? true : false;

  const smallCircleClasses: string =
    "rounded-[50%] border-white h-6 w-6 cursor-pointer mr-1 border hover:border-2 transition-all hover:h-7 hover:w-7";

  /**
   *
   * @param image_type A image type string e.g "Property Building"
   * @returns imageUrl of the specified image
   */
  const getSpecificImage = (image_type: string): string | undefined => {
    return hotelImages.find((image) => image.tag_name === image_type)
      ?.img_url_large;
  };

  const possibleTags = [
    "Bathroom",
    "Kitchen/Kitchenette",
    "Property Building",
    "Lobby/Reception",
    "TV/Entertainment Center",
    "Bed",
    "Restaurant/Places to Eat",
    "Fitness Center/Facilities",
    "Lobby/Reception",
    "Lounge/Bar",
    "Room Photo",
    "View",
    "Buffet breakfast",
    "Property logo or sign",
  ];

  /**
   * A function that returns a random image url.
   * @returns Image url
   */
  const getRandomImage = (): string | undefined => {
    const randomIndex: number = Math.floor(Math.random() * 10);
    return getSpecificImage(possibleTags[randomIndex]);
  };

  const [image, setImage] = useState(getSpecificImage("Property Building"));

  return (
    <div
      className={`bg-white rounded-md h-48 ${
        activeTab === hotelInfo.hotel_name
          ? "shadow-md border-2 my-2 border-red-400"
          : "mb-1 border-0"
      } transition-all`}
    >
      <div className="flex h-full">
        <div className={`h-full ${mapShown ? "w-[33%]" : "w-[30%]"} relative`}>
          <img
            src={image}
            alt="Hotel main"
            className={`h-full object-cover ${
              mapShown ? "rounded-l-md" : "rounded-md"
            } w-full`}
          />
          {mapShown ? null : (
            <div className="absolute z-50 flex bottom-4 w-full px-5 justify-between h-7 items-center">
              <div className="flex items-center">
                <img
                  src={getSpecificImage("Room Photo")}
                  alt="Random hotel"
                  className={smallCircleClasses}
                  onClick={() => setImage(getSpecificImage("Room Photo"))}
                />
                <img
                  src={getSpecificImage("Restaurant/Places to Eat")}
                  alt="Random hotel"
                  className={smallCircleClasses}
                  onClick={() =>
                    setImage(getSpecificImage("Restaurant/Places to Eat"))
                  }
                />
                <img
                  src={getSpecificImage("Fitness Center/Facilities")}
                  alt="Random hotel"
                  className={smallCircleClasses}
                  onClick={() =>
                    setImage(getSpecificImage("Fitness Center/Facilities"))
                  }
                />
              </div>
              <div>
                <button
                  className="text-white w-6 h-6 rounded-sm mr-2 text-lg toggle-image-buttons"
                  onClick={() => setImage(getRandomImage())}
                >
                  <img
                    src={Assets.ArrowWhiteLeft}
                    alt="Arrow"
                    className="mx-auto h-3"
                  />
                </button>
                <button
                  className="w-6 h-6 rounded-sm text-white text-lg toggle-image-buttons"
                  onClick={() => setImage(getRandomImage())}
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
            mapShown ? "w-[67%] px-2" : "pr-20 w-[70%] pl-6"
          }`}
        >
          <div
            className={`${mapShown ? "flex justify-between items-start" : ""}`}
          >
            <p className={`font-bold ${mapShown ? "text-sm" : "text-lg"}`}>
              {hotelInfo.hotel_name}
            </p>
            <Rating
              mapShown={mapShown}
              rating={((hotelInfo.review_score / 10) * 5).toFixed(1)}
            />
          </div>
          <div className={`flex justify-between ${mapShown ? "mt-3" : ""}`}>
            <p className="font-semibold text-xs">{hotelInfo.address}</p>
            {activeTab === hotelInfo.hotel_name ? (
              <p
                className="text-xs uppercase text-red-600 font-bold cursor-pointer hover:text-red-500"
                onClick={() => {
                  setShowMapFunction(false);
                  setActiveTab(null);
                }}
              >
                Close Map
              </p>
            ) : (
              <p
                className="text-xs uppercase text-red-600 font-bold cursor-pointer hover:text-red-500"
                onClick={() => {
                  setShowMapFunction(true);
                  setActiveTab(hotelInfo.hotel_name);
                  setMapCenter({
                    lat: hotelInfo.latitude,
                    lng: hotelInfo.longitude,
                  });
                }}
              >
                Map View
              </p>
            )}
          </div>
          <div
            className={`${
              showAllFacilities
                ? "h-11 overflow-y-scroll"
                : `h-4 overflow-y-hidden`
            } w-full flex flex-wrap my-3 relative`}
          >
            {hotelFacilities.map((facility, index) => (
              <LittleFacilityDisplay
                facility={facility}
                key={index}
                mapShown={mapShown}
              />
            ))}
            <p
              className="font-bold text-xs right-1 absolute cursor-pointer"
              onClick={() => setShowAllFacilities((prev) => !prev)}
            >
              {showAllFacilities ? "Less -" : "More +"}
            </p>
          </div>
          <div
            className={`flex justify-between items-center absolute bottom-3 ${
              mapShown ? "w-full" : "w-[95%]"
            }`}
          >
            <div className={`${mapShown ? "w-[30%]" : "flex"}`}>
              <p className="text-yellow-500 text-xs font-light mr-2">25% off</p>
              <p className="font-bold">
                ${hotelInfo.price_breakdown.all_inclusive_price}
              </p>
            </div>
            <div className={`text-xs ${mapShown ? "w-[70%]" : ""} flex`}>
              <button
                className={`py-3 ${
                  mapShown
                    ? "px-1 hover:border-gray-400 transition-all mr-2"
                    : "bg-gray-300 hover:bg-gray-400 px-5 mr-4"
                } rounded-md font-semibold transition-all border-2 border-transparent`}
                onClick={() => {
                  setSelectedHotelInfo({
                    hotelFacilities: hotelFacilities,
                    hotelInfo: hotelInfo,
                    hotelImages: hotelImages,
                  });
                  setStage("HotelDetails");
                }}
              >
                View Details
              </button>
              {isBookingAllowed ? (
                <a
                  className={`${
                    mapShown
                      ? "text-blue-600 font-semibold px-1 hover:border-blue-600 transition-all"
                      : "bg-blue-600 text-white px-5 hover:bg-blue-400"
                  } rounded-md transition-all disabled:cursor-not-allowed py-3 border-2 border-transparent`}
                  href={hotelInfo.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  BOOK NOW
                </a>
              ) : (
                <button className="text-white bg-blue-600 px-5 py-3 rounded-md hover:bg-blue-400 transition-all disabled:cursor-not-allowed">
                  SOLD OUT 😥
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelData;
