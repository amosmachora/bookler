import React, { useContext } from "react";
import { HotelSearchContext } from "../../App";
import { Assets } from "../../Assets/Assets";
import { HotelImage, HotelInfo } from "../../Types/Hotel";

const BookingReviewAside = ({
  hotelInfo,
  hotelImages,
}: {
  hotelInfo: HotelInfo | undefined;
  hotelImages: HotelImage[] | null;
}) => {
  const { checkInDate, checkOutDate } = useContext(HotelSearchContext);
  return (
    <div className="w-1/5 bg-white rounded-md overflow-hidden p-3">
      <img
        src={
          hotelImages?.find((image) => image.tag_name === "Property Building")
            ?.img_url_large
        }
        alt="hotel view"
        className="rounded-md"
      />
      <p className="text-lg font-semibold mt-3">{hotelInfo?.hotel_name}</p>
      <div className="flex">
        <img src={Assets.LocationPointerBlue} alt="location" />
        <p className="text-xs">{hotelInfo?.address_trans}</p>
      </div>
      <p className="mt-8 mb-5 text-sm">Check In</p>
      <p>{checkInDate?.toString()}</p>
      <p className="mt-8 mb-5 text-sm">Check Out</p>
      <p>{checkOutDate?.toString()}</p>
    </div>
  );
};

export default BookingReviewAside;
