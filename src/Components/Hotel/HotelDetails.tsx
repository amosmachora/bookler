import React, { useState } from "react";
import { Assets } from "../../Assets/Assets";
import { HotelImagesType, HotelInfo, tags } from "../../Types/Hotel";

const HotelDetails = ({
  hotelInfo,
  hotelImages,
}: {
  hotelInfo: HotelInfo | undefined;
  hotelImages: HotelImagesType | null;
}) => {
  const tempHotelId: number = 25924;

  const getArrayOfImages = () => {
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

  const [image, setImage] = useState<string | undefined>(
    getArrayOfImages()?.find((image) => image.tag_name === "Property Building")
      ?.img_url_large
  );

  console.log(image);

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
          <button className="px-6 py-2 bg-blue-600 rounded-md text-[11px] text-white">
            PAY NOW
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="w-[55%] relative">
          <img
            src={image}
            alt="LocationPointerBlue"
            className="w-full rounded-md h-[67vh] object-cover"
          />
          <img
            src={Assets.ArrowWhiteLeft}
            alt="Arrow"
            className="h-6 absolute top-1/2 left-3 cursor-pointer hover:h-4 transition-all"
          />
          <img
            src={Assets.ArrowWhiteRight}
            alt="Arrow"
            className="h-6 absolute top-1/2 right-3 cursor-pointer hover:h-4 transition-all"
          />
          {/* <div className="flex justify-between">
            {[...Array(numberOfAllowedImages)].map((i) => (
              <TinyImageSelector
                hotelImages={hotelImages as HotelImagesType}
                hotel_id={tempHotelId}
                setImage={setImage}
                key={i}
              />
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;

// function TinyImageSelector({
//   hotelImages,
//   hotel_id,
//   setImage,
// }: {
//   hotelImages: HotelImagesType;
//   hotel_id: number;
//   setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
// }) {
//   const IMAGE_URL = getRandomImage(hotelImages as HotelImagesType, hotel_id);
//   return (
//     <img
//       src={IMAGE_URL}
//       alt="Random hotel img"
//       className="h-12 w-[10%] rounded-md cursor-pointer"
//       onClick={() => setImage(IMAGE_URL)}
//     />
//   );
// }
