import React, { useEffect, useState } from 'react';
import { Assets } from '../../Assets/Assets';
import { useHotelSearchResults } from './HotelSearchResultsProvider';

export const HotelDetailsImages = () => {
  const { selectedHotelInfo } = useHotelSearchResults();
  const { hotelImages } = selectedHotelInfo!;

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  useEffect(() => {
    const imgElement = document.getElementById(`image-${activeImageIndex}`);
    imgElement!.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [activeImageIndex]);

  return (
    <div className="w-3/5 transition-all relative h-full">
      <img
        src={hotelImages[activeImageIndex].img_url_large}
        alt="LocationPointerBlue"
        className="w-full rounded-md object-cover h-full"
      />
      <div
        onClick={() =>
          setActiveImageIndex((prev) =>
            prev !== 0 ? prev - 1 : hotelImages.length - 1
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
            prev !== hotelImages.length - 1 ? prev + 1 : 0
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
        {hotelImages.map((hotelImage, index) => (
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
            id={`image-${index}`}
          />
        ))}
      </div>
    </div>
  );
};
