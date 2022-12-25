import React from "react";
import { Assets } from "../../Assets/Assets";
import {
  CarRentalSearchResultsType,
  VehicleInformation,
} from "../../Types/CarRentals";
import { UserDetailsForm } from "../UserDetailsForm";
import CarRentalReviewAside from "./CarRentalReviewAside";

const CarRentalReview = ({
  selectedVehicle,
  carRentalData,
}: {
  selectedVehicle: VehicleInformation | null;
  carRentalData: CarRentalSearchResultsType;
}) => {
  const handleCountryCodeSelection = (value: string) => {};
  return (
    <div className="mt-4 flex justify-between">
      <div className="w-3/4">
        <div className="flex px-5 bg-flightResultsBg py-2 rounded-sm mb-1 items-center justify-between">
          <p className="font-bold text-lg">Car Rental Details</p>
          <p className="rounded-full py-1 mx-3 px-3 cursor-pointer transition-all bg-blue-900 text-white text-xs">
            Your Details
          </p>
        </div>
        <div className="flex justify-between bg-white rounded-md py-3 px-12 mt-2 items-center text-xs">
          <div className="flex items-center">
            <img src={Assets.CheckMark} alt="CheckMark" className="mr-2" />
            <p className="cursor-pointer">Car - Selected</p>
          </div>
          <div className="h-[1px] w-1/4 bg-gray-300" />
          <div className="flex items-center">
            <img src={Assets.CheckMark} alt="CheckMark" className="mr-2" />
            <p className="cursor-pointer">Car - Details</p>
          </div>
          <div className="h-[1px] w-1/4 bg-gray-300" />
          <div className="flex items-center">
            <span className="mr-2 bg-checkMarkBg px-2 py-[3px] text-white rounded-full">
              3
            </span>
            <p className="font-semibold">Car - Booking</p>
          </div>
        </div>
        <UserDetailsForm
          text={{
            textA: "",
            textB: "",
          }}
          handleCountryCodeSelection={handleCountryCodeSelection}
        />
      </div>
      <CarRentalReviewAside
        selectedVehicle={selectedVehicle}
        carRentalData={carRentalData}
      />
    </div>
  );
};

export default CarRentalReview;
