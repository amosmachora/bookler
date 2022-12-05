import React, { useRef, useState } from "react";
import { Assets } from "../../Assets/Assets";
import { HotelImagesType, HotelInfo, tags } from "../../Types/Hotel";

type HotelImage = {
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

  const [image, setImage] = useState<HotelImage | undefined>(
    getArrayOfImages()?.find((image) => image.tag_name === "Property Building")
  );

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
            src={image?.img_url_large}
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
          <div
            className="flex justify-between w-full absolute bottom-6 overflow-x-scroll items-baseline"
            id="image-tape"
          >
            {getArrayOfImages()?.map((hotelImage, index) => (
              <TinyImageSelector
                renderImage={hotelImage}
                key={index}
                setImage={setImage}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;

function TinyImageSelector({
  renderImage,
  setImage,
}: {
  renderImage: HotelImage;
  setImage: React.Dispatch<React.SetStateAction<HotelImage | undefined>>;
}) {
  const imageRef = useRef<HTMLImageElement | null>(null);

  return (
    <img
      src={renderImage.img_url_large}
      alt="Random hotel img"
      className={`h-12 w-[65px] rounded-md cursor-pointer mx-2 object-cover hover:h-20 hover:w-24 transition-all duration-300`}
      onClick={() => {
        setImage(renderImage);
        imageRef.current!.className =
          imageRef.current?.className + " h-19 w-23 transition-all";
      }}
    />
  );
}
