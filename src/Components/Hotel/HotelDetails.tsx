import React, { useState } from "react";
import { Assets } from "../../Assets/Assets";
import { HotelImagesType, HotelInfo, tags } from "../../Types/Hotel";

export type HotelImage = {
  tag_name: string | undefined | null;
  img_url_large: string;
  img_url_small: string;
  img_url_medium: string;
  img_url_tiny: string;
};

const HotelDetails = ({
  hotelInfo,
  hotelImages,
}: {
  hotelInfo: HotelInfo | undefined;
  hotelImages: HotelImagesType | null;
}) => {
  const tempHotelId: number = 25924;

  const getArrayOfImages = (): HotelImage[] | undefined => {
    const ArrayOfImages = hotelImages?.data[tempHotelId].map((hotelImage) => {
      return {
        tag_name: getTagName(hotelImage[1]),
        img_url_large: hotelImages.url_prefix + hotelImage[4],
        img_url_small: hotelImages.url_prefix + hotelImage[5],
        img_url_medium: hotelImages.url_prefix + hotelImage[6],
        img_url_tiny: hotelImages.url_prefix + hotelImage[7],
      };
    });
    return ArrayOfImages?.filter(
      (hotelImage) => hotelImage.tag_name !== undefined
    );
  };

  const getTagName = (
    hotelImage: string | number | tags[]
  ): string | null | undefined => {
    if (
      Array.isArray(hotelImage) &&
      hotelImage.length > 0 &&
      hotelImage[0] !== undefined
    ) {
      return hotelImage[0].tag_name;
    }
  };

  const arrayOfUniqueImages: HotelImage[] = getUniqueImages(getArrayOfImages());
  const [activeImageIndex, setActiveImageIndex] = useState<number>(
    Math.floor(7 / 2)
  );

  console.log(hotelInfo);

  return (
    <div className="bg-white rounded-md px-3 py-6">
      <div className="flex justify-between">
        <div>
          <p className="font-bold text-2xl">{hotelInfo?.hotel_name}</p>
          <div className="flex">
            <img src={Assets.LocationPointerBlue} alt="location-pointer" />
            <p className="text-sm">{hotelInfo?.address}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-2xl font-bold">
            {hotelInfo?.price_breakdown.all_inclusive_price}{" "}
            <span className="text-gray-500 text-xs font-normal">USD</span>
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
      <div className="flex justify-between">
        <div className="w-[55%] relative">
          <img
            src={arrayOfUniqueImages[activeImageIndex].img_url_large}
            alt="LocationPointerBlue"
            className="w-full rounded-md h-[67vh] object-cover"
          />
          <div
            onClick={() =>
              setActiveImageIndex((prev) =>
                prev !== 0 ? prev - 1 : arrayOfUniqueImages.length - 1
              )
            }
            className="absolute top-1/3 left-0 cursor-pointer h-16 flex items-center w-6 justify-center [&>*]:hover:h-4 image-switch"
          >
            <img
              src={Assets.ArrowWhiteLeft}
              alt="Arrow"
              className="transition-all h-6 w-4"
            />
          </div>
          <div
            onClick={() =>
              setActiveImageIndex((prev) =>
                prev !== arrayOfUniqueImages.length - 1 ? prev + 1 : 0
              )
            }
            className="absolute top-1/3 right-0 cursor-pointer h-16 flex items-center w-6 justify-center [&>*]:hover:h-4 image-switch"
          >
            <img
              src={Assets.ArrowWhiteRight}
              alt="Arrow"
              className="h-6 transition-all w-4"
            />
          </div>
          <div
            className="flex justify-between w-full absolute bottom-6 overflow-x-hidden items-baseline"
            id="image-tape"
          >
            {arrayOfUniqueImages.map((hotelImage, index) => (
              <img
                src={hotelImage.img_url_large}
                alt="Random hotel img"
                className={`rounded-md cursor-pointer mx-2 object-cover hover:h-20 hover:w-24 transition-all duration-300 ${
                  activeImageIndex === index
                    ? "h-20 w-24 rounded-xl border-2 border-white"
                    : "w-16 h-12"
                }`}
                onClick={() => setActiveImageIndex(index)}
              />
            ))}
          </div>
        </div>
        <div className="w-[43%]">
          <p className="font-bold">Hotel review</p>
          <div className="flex items-center mt-2">
            <div className="bg-ratingBg flex rounded-md w-max px-2 text-white text-sm py-1 items-center">
              <p className="mr-1 font-bold">
                {((hotelInfo!.review_score / 10) * 5).toFixed(1)}
              </p>
              <img src={Assets.Star} alt="Star" />
            </div>
            <div className="ml-3">
              <p className="text-sm">{hotelInfo?.review_score_word}</p>
              <p className="text-[11px] text-gray-400">
                {hotelInfo?.review_nr} reviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;

const getKey = (arrayOfImages: HotelImage[]): string => {
  const firstObject = arrayOfImages?.find(() => true);
  return Object.keys(firstObject as Object)[0];
};

const getUniqueImages = (
  arrayOfImages: HotelImage[] | undefined
): HotelImage[] => {
  const arrayUniqueByKey: HotelImage[] = [
    ...new Map(
      arrayOfImages?.map((item) => [item[getKey(arrayOfImages)], item])
    ).values(),
  ];

  return arrayUniqueByKey.slice(
    arrayUniqueByKey.length - 7,
    arrayUniqueByKey.length
  );
};
