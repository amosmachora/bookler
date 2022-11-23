import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../App";
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

  getSpecificImage("Bed");

  const imageString = hotelImages.data[25924][1][4];

  return (
    <div className="my-1">
      <div className="flex">
        <img
          src={hotelImages.url_prefix + imageString}
          alt="Hotel main"
          className="w-[21%] h-48 object-contain rounded-md"
        />
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

const getSpecificImage = (image_type: string): string | null => {
  HotelImages.data[25924].find((image) => {
    const imageTags = image[1];
    return imageTags[0].tag_name === image_type;
  });

  return "";
};
