import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../App";
import { Assets } from "../../Assets/Assets";
import { fetchHotelImages } from "../../Fetchers/FetchHotelImages";
import { HotelImagesType, HotelInfo } from "../../Types/Hotel";
import HotelImages from "../../Util/HotelImages.json";

const HotelData = ({ hotelInfo }: { hotelInfo: HotelInfo }) => {
  const [hotelImages, setHotelImages] = useState<HotelImagesType>(HotelImages);
  const { devMode } = useContext(MainContext);

  useEffect(() => {
    if (!devMode) {
      fetchHotelImages(hotelInfo.hotel_id).then((res) => setHotelImages(res));
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

  return (
    <div className="my-1 bg-white rounded-md h-48">
      <div className="flex h-full">
        <div className="h-full w-[21%] relative">
          <img
            src={getSpecificImage("Property Building")}
            alt="Hotel main"
            className="h-full object-contain rounded-md"
          />
          <div className="absolute z-50 flex bottom-4 w-full px-5 justify-between">
            <div className="flex">
              <img
                src={getSpecificImage("Room Photo")}
                alt="Random hotel"
                className="rounded-[50%] border-white h-6 w-6 cursor-pointer mr-1 border"
              />
              <img
                src={getSpecificImage("Restaurant/Places to Eat")}
                alt="Random hotel"
                className="rounded-[50%] border-white h-6 w-6 cursor-pointer mr-1 border"
              />
              <img
                src={getSpecificImage("Fitness Center/Facilities")}
                alt="Random hotel"
                className="rounded-[50%] border-white h-6 w-6 cursor-pointer mr-1 border"
              />
            </div>
            <div>
              <button className="text-white w-6 h-6 rounded-sm mr-2 text-lg toggle-image-buttons">
                <img
                  src={Assets.ArrowWhiteLeft}
                  alt="Arrow"
                  className="mx-auto h-3"
                />
              </button>
              <button className="w-6 h-6 rounded-sm text-white text-lg toggle-image-buttons">
                <img
                  src={Assets.ArrowWhiteRight}
                  alt="Arrow"
                  className="mx-auto h-3"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="py-6 pl-6 ">
          <p className="font-semibold">{hotelInfo.hotel_name}</p>
          <p className="font-bold">
            ${hotelInfo.price_breakdown.all_inclusive_price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HotelData;
