import React from "react";
import { Assets } from "../../Assets/Assets";
import { SelectedHotel } from "../../Types/Hotel";
import BookingReviewAside from "./BookingReviewAside";
import { CountryCodeSelector } from "./CountryCodeSelector";

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
        <div className="p-10 bg-white mt-1 rounded-md">
          <p className="text-xl font-bold">Your details</p>
          <p className="text-gray-400 leading-5 text-xs w-3/4">
            Whether you are in town for business or leisure,{" "}
            {selectedHotelInfo!.hotelInfo?.hotel_name} welcomes travelers to{" "}
            {selectedHotelInfo!.hotelInfo?.city} with exceptional service,
            spacious
          </p>
          <div className="flex justify-between mt-6">
            <div className="w-1/4">
              <p className="text-sm mb-3">Title</p>
              <select className="w-full bg-flightResultsBg py-3 px-2 rounded-md border text-sm">
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
              </select>
            </div>
            <div className="w-1/3">
              <p className="text-sm mb-3">First Name</p>
              <input
                type="text"
                className="w-full bg-flightResultsBg py-3 px-2 rounded-md border text-sm"
                placeholder="Enter your first name"
              />
            </div>
            <div className="w-1/3">
              <p className="text-sm mb-3">Last Name</p>
              <input
                type="text"
                className="w-full bg-flightResultsBg py-3 px-2 rounded-md border text-sm"
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div className="mt-6">
            <p>Email</p>
            <input
              type="email"
              className="w-full bg-flightResultsBg py-3 px-2 rounded-md border text-sm"
              placeholder="Email"
            />
          </div>
          <div className="flex mt-6 justify-between">
            <div className="w-1/4">
              <p className="text-sm mb-3">Country Code</p>
              <CountryCodeSelector handleChange={handleCountryCodeSelection} />
            </div>
            <div className="w-2/3">
              <p className="text-sm mb-3">Mobile</p>
              <input
                type="tel"
                className="w-full bg-flightResultsBg py-3 px-2 rounded-md border text-sm"
              />
            </div>
          </div>
          <div className="bg-covidBg py-5 px-4 rounded-md mt-2">
            <div className="flex justify-center items-center w-max">
              <input type="checkbox" className="h-5 w-5 mr-3" />
              <p className="text-sm font-bold">I have a coupon</p>
            </div>
            <input
              type="text"
              placeholder="Enter your coupon number"
              className="border-b text-sm w-5/6 mt-4 bg-covidBg border-black px-4 focus:border-none"
            />
          </div>
        </div>
      </div>
      <BookingReviewAside selectedHotelInfo={selectedHotelInfo} />
    </div>
  );
};

export default BookingReview;
