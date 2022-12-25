import { UserDetailsForm } from "../../Components/UserDetailsForm";
import React from "react";
import { Assets } from "../../Assets/Assets";
import { SelectedHotel } from "../../Types/Hotel";
import BookingReviewAside from "./BookingReviewAside";

const BookingReview = ({
  selectedHotelInfo,
}: {
  selectedHotelInfo: SelectedHotel | null;
}) => {
  const handleCountryCodeSelection = (currentValue: string) => {};
  return (
    <div className="flex justify-between">
      <div className="w-3/4">
        <div className="bg-flightResultsBg justify-between flex rounded-sm py-2 px-3">
          <p className="text-lg font-bold">Booking Review</p>
          <div className="flex">
            <p className="text-white text-xs bg-blue-900 py-2 px-3 cursor-pointer rounded-full mr-3">
              Your Details
            </p>
            <p className="text-xs text-gray-400 rounded-full py-2 px-3 cursor-pointer">
              Payment details
            </p>
          </div>
        </div>
        <div className="bg-white flex items-center justify-between mt-3 px-12 py-2 rounded-md">
          <div className="flex items-center">
            <img src={Assets.CheckMark} alt="Tick" className="mr-2" />
            <p className="text-xs">Hotel selected</p>
          </div>
          <div className="bg-gray-300 w-1/4 h-[1px]" />
          <div className="flex items-center">
            <div className="bg-blue-700 text-white rounded-[50%] p-3 relative mr-2">
              <p className="absolute center-absolutely text-sm">2</p>
            </div>
            <p className="text-xs">Your Details</p>
          </div>
          <div className="bg-gray-300 w-1/4 h-[1px]" />
          <div className="flex items-center">
            <div className="bg-gray-500 text-white rounded-[50%] p-3 relative mr-2">
              <p className="absolute center-absolutely text-sm">3</p>
            </div>
            <p className="text-xs">Hotel booking</p>
          </div>
        </div>
        <UserDetailsForm
          text={{
            textA: selectedHotelInfo?.hotelInfo?.hotel_name!,
            textB: selectedHotelInfo?.hotelInfo?.city!,
          }}
          handleCountryCodeSelection={handleCountryCodeSelection}
        />
      </div>
      <BookingReviewAside selectedHotelInfo={selectedHotelInfo} />
    </div>
  );
};

export default BookingReview;
