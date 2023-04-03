import React, { useContext, useState } from 'react';
import { Assets } from '../../Assets/Assets';
import { HotelImage } from '../../Types/Hotel';
import { HotelSearchResultsContext } from './HotelSearchResultsProvider';

export const HotelDetailsImages = () => {
  const { selectedHotelInfo } = useContext(HotelSearchResultsContext);

  const arrayOfUniqueImages: HotelImage[] = getUniqueImages(
    selectedHotelInfo!.hotelImages
  );
  const [activeImageIndex, setActiveImageIndex] = useState<number>(
    Math.floor(7 / 2)
  );
  return (
    <div className={`w-[55%] transition-all relative h-[67vh]`}>
      <img
        src={arrayOfUniqueImages[activeImageIndex].img_url_large}
        alt="LocationPointerBlue"
        className="w-full rounded-md object-cover h-full"
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
        className="flex justify-between w-full absolute bottom-6 overflow-x-scroll items-baseline"
        id="image-tape"
      >
        {arrayOfUniqueImages.map((hotelImage, index) => (
          <img
            src={hotelImage.img_url_large}
            alt="Random hotel img"
            key={index}
            className={`rounded-md cursor-pointer mx-2 object-cover hover:h-20 hover:w-24 transition-all duration-300 ${
              activeImageIndex === index
                ? 'h-20 w-24 rounded-xl border-2 border-white'
                : 'w-16 h-12'
            }`}
            onClick={() => setActiveImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

const getKey = (arrayOfImages: HotelImage[]): string => {
  const firstObject = arrayOfImages?.find(() => true);
  return Object.keys(firstObject as Object)[0];
};

const getUniqueImages = (arrayOfImages: HotelImage[] | null): HotelImage[] => {
  const arrayUniqueByKey: HotelImage[] = [
    ...new Map(
      arrayOfImages?.map((item) => [item[getKey(arrayOfImages)], item])
    ).values(),
  ];

  return arrayOfImages!;
};
