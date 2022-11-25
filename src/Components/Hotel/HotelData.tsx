import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../App";
import { Assets } from "../../Assets/Assets";
import { fetchHotelImages } from "../../Fetchers/FetchHotelImages";
import { Facility, HotelImagesType, HotelInfo } from "../../Types/Hotel";
import HotelImages from "../../Util/HotelImages.json";
import Facilities from "../../Util/Facilities.json";
import { fetchHotelFacilities } from "../../Fetchers/FetchHotelFacilities";

const HotelData = ({ hotelInfo }: { hotelInfo: HotelInfo }) => {
  const [hotelImages, setHotelImages] = useState<HotelImagesType>(HotelImages);
  const { devMode } = useContext(MainContext);
  const [hotelFacilities, setHotelFacilities] =
    useState<Facility[]>(Facilities);

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

  const tempHotelId: number = 25924;

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

  /**
   *
   * @param image_type A image type string e.g "Property Building"
   * @returns imageUrl of the specified image
   */
  const getSpecificImage = (image_type: string): string | undefined => {
    const imageArray = hotelImages.data[tempHotelId].find((image) => {
      const imageTags = image[1];
      if (Array.isArray(imageTags) && imageTags.length > 0) {
        return imageTags[0].tag_name === image_type;
      }
      return false;
    });

    if (imageArray !== undefined) {
      return hotelImages.url_prefix + imageArray[4];
    }
  };

  const [image, setImage] = useState(getSpecificImage("Property Building"));

  const isBookingAllowed: boolean = hotelInfo.soldout === 0 ? false : true;

  const smallCircleClasses: string =
    "rounded-[50%] border-white h-6 w-6 cursor-pointer mr-1 border hover:border-2 transition-all hover:h-7 hover:w-7";

  return (
    <div className="my-1 bg-white rounded-md h-48">
      <div className="flex h-full">
        <div className="h-full w-[21%] relative">
          <img
            src={image}
            alt="Hotel main"
            className="h-full object-cover rounded-md w-full"
          />
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
        </div>
        <div className="py-6 pl-6 flex-grow relative pr-20">
          <div className="flex justify-between">
            <p className="font-bold text-lg">{hotelInfo.hotel_name}</p>
            <p className="text-xs uppercase text-red-600 font-bold cursor-pointer hover:text-red-500">
              Map View
            </p>
          </div>
          <div className="absolute top-[15%] font-bold right-0 text-white bg-blue-900 rounded-tl-md rounded-bl-md">
            <div className="flex items-center px-3 py-1">
              <p>{((hotelInfo.review_score / 10) * 5).toFixed(1)}</p>
              <img src={Assets.Star} alt="Star" className="ml-2" />
            </div>
            <div className="w-full h-6 bg-white rounded-tr-3xl" />
          </div>
          <div className="h-24 overflow-scroll w-full">
            {hotelFacilities.map((facility) => (
              <p>{facility.facility_name}</p>
            ))}
          </div>
          <div className="flex justify-between">
            <p className="font-bold">
              ${hotelInfo.price_breakdown.all_inclusive_price}
            </p>
            <div className="text-xs">
              <button className="px-5 py-3 bg-gray-300 rounded-md font-semibold mr-4 hover:bg-gray-200 transition-all">
                View Details
              </button>
              <button
                className="text-white bg-blue-600 px-5 py-3 rounded-md hover:bg-blue-400 transition-all disabled:cursor-not-allowed"
                disabled={isBookingAllowed}
              >
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelData;
