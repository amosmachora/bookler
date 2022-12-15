import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../App";
import { Assets } from "../../Assets/Assets";
import { fetchHotelDescription } from "../../Fetchers/FetchHotelDescription";
import { fetchHotelReviews } from "../../Fetchers/FetchHotelReviews";
import { Facility, HotelImagesType, HotelInfo, tags } from "../../Types/Hotel";
import { HotelReviews } from "../../Types/HotelReviews";
import { HotelDescription } from "../../Types/HotelDescription";
import DevHotelReviews from "../../Util/HotelReviews.json";
import DevHotelDescription from "../../Util/DevHotelDescription.json";
import LittleFacilityDisplay from "./LittleFacilityDisplay";
import Flag from "react-world-flags";

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
  hotelFacilities,
  showInfo,
}: {
  hotelInfo: HotelInfo | undefined;
  hotelImages: HotelImagesType | null;
  hotelFacilities: Facility[];
  showInfo: boolean;
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
  const [hotelReviews, setHotelReviews] =
    useState<HotelReviews>(DevHotelReviews);
  const [hotelDescription, setHotelDescription] =
    useState<HotelDescription[]>(DevHotelDescription);

  const { devMode } = useContext(MainContext);

  useEffect(() => {
    if (!devMode) {
      fetchHotelReviews(hotelInfo?.hotel_id.toString()!).then((res) =>
        setHotelReviews(res)
      );
      fetchHotelDescription(hotelInfo?.hotel_id.toString()!).then((res) =>
        setHotelDescription(res)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devMode, []]);

  const hotelReviewScore: number = (hotelInfo!.review_score / 10) * 5;

  console.log(hotelReviews.result);

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
        <div
          className={`${
            showInfo ? "w-[55%]" : "w-45%"
          } transition-all relative h-[67vh]`}
        >
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
            className="flex justify-between w-full absolute bottom-6 overflow-x-hidden items-baseline"
            id="image-tape"
          >
            {arrayOfUniqueImages.map((hotelImage, index) => (
              <img
                src={hotelImage.img_url_large}
                alt="Random hotel img"
                key={index}
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
        {showInfo ? (
          <div className="w-[43%]">
            <p className="font-bold">Hotel review</p>
            <div className="flex items-center mt-2">
              <div className="bg-ratingBg flex rounded-md w-max px-2 text-white text-sm py-1 items-center">
                <p className="mr-1 font-bold">{hotelReviewScore.toFixed(1)}</p>
                <img src={Assets.Star} alt="Star" />
              </div>
              <div className="ml-3">
                <p className="text-sm">{hotelInfo?.review_score_word}</p>
                <div className="flex">
                  <p className="text-[11px] text-gray-400 mr-2">
                    {hotelInfo?.review_nr} reviews
                  </p>
                  {[...Array(hotelReviewScore)].map(() => (
                    <img src={Assets.StarBlue} alt="star" />
                  ))}
                  {[...Array(5 - hotelReviewScore)].map(() => (
                    <img src={Assets.StarGray} alt="star" />
                  ))}
                </div>
              </div>
            </div>
            <p className="font-bold mt-5 mb-2">About</p>
            <p className="text-xs text-gray-400 leading-5 w-[85%]">
              {hotelDescription[0].description}
            </p>
            <p className="font-bold mt-5 mb-2">Popular Services</p>
            <div className="flex">
              {hotelFacilities.map((facility) => (
                <LittleFacilityDisplay
                  facility={facility}
                  mapShown={false}
                  key={facility.facility_name}
                />
              ))}
            </div>
            <div className="flex justify-between bg-covidBg rounded-lg py-2 px-7 mt-5">
              <div className="flex">
                <img src={Assets.SoapyHands} alt="SoapyHands" />
                <p className="text-sm font-semibold ml-5">
                  Travel safe during <br /> COVID-19
                </p>
              </div>
              <img
                src={Assets.InfoIcon}
                alt="Info"
                className="cursor-pointer"
              />
            </div>
          </div>
        ) : (
          <div className="w-[47%] h-[67vh] overflow-y-scroll">
            <p className="font-bold mb-3">Top Reviews</p>
            {hotelReviews.result.map((review) => (
              <div key={review.author.user_id} className="flex justify-between">
                <div className="w-[30%]">
                  <div className="flex items-center">
                    <img
                      src={
                        review.author.avatar === undefined
                          ? Assets.PersonClipArt
                          : review.author.avatar
                      }
                      alt="Person"
                      className="rounded-full h-9 w-9 mr-3"
                    />
                    <div>
                      <p className="font-sm font-semibold caveat">
                        {review.author.name}
                      </p>
                      <div className="flex">
                        <Flag
                          code={review.countrycode}
                          fallback={<span>Country flag</span>}
                          height="16"
                          width="32"
                        />
                        <p className="font-sm ml-2">
                          {getCountryNameFromCountryCode(review.countrycode)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex text-gray-500 text-xs items-start my-3">
                    <img
                      src={review.stayed_room_info.photo.url_square60}
                      alt="room"
                      className="w-5 h-5 mr-2 rounded-sm"
                    />
                    <p>{review.stayed_room_info.room_name}</p>
                  </div>
                  <div className="flex text-gray-500 text-xs items-center my-3">
                    <img
                      src={Assets.Calendar}
                      alt="Calendar"
                      className="w-5 h-5 mr-2"
                    />
                    <p>
                      {getNumberOfNights(
                        review.stayed_room_info.checkin,
                        review.stayed_room_info.checkout
                      )}{" "}
                      nights .{" "}
                      {getMonthAndYearString(review.stayed_room_info.checkout)}
                    </p>
                  </div>
                  <div className="flex text-gray-500 text-xs my-3">
                    <img
                      src={getAuthorTypeClipArt(review.author.type)}
                      alt="author type"
                      className="w-5 h-5 mr-2"
                    />
                    <p className="capitalize">{review.author.type}</p>
                  </div>
                </div>
                <div className="w-[60%] flex-grow pl-4">
                  <p className="font-xs">Reviewed: {review.date}</p>
                  <p className="font-xs">{review.pros}</p>
                  <p className="font-xs">{review.cons}</p>
                  <p className="font-sm">{review.title}</p>
                  <p>Hotel Response</p>
                  <p>{review.hotelier_response}</p>
                </div>
              </div>
            ))}
          </div>
        )}
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

const getAuthorTypeClipArt = (type: string): string | undefined => {
  return "";
  // throw new Error("Function not implemented.");
};

const getNumberOfNights = (
  checkin: string,
  checkout: string
): React.ReactNode => {
  return 0;
  // throw new Error("Function not implemented.");
};

const getMonthAndYearString = (checkout: string): React.ReactNode => {
  return checkout;
  // throw new Error("Function not implemented.");
};

const getCountryNameFromCountryCode = (
  countrycode: string
): React.ReactNode => {
  //TODO fix . currently not working
  let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(countrycode);
};
