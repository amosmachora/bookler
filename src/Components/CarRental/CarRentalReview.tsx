import React from 'react';
import { Link } from 'react-router-dom';
import { Assets } from '../../Assets/Assets';
import { FinalBookingStage } from '../FinalBookingStage';
import { CarRentalReviewSummary } from './CarRentalReviewAside';
import CarRentalSearchParameters from './CarRentalSearchParameters';
import { useCarRentalSearchResults } from './CarRentalSearchResultsProvider';

const CarRentalReview = () => {
  const { activeVehicle, carRentalData } = useCarRentalSearchResults();

  return (
    <div>
      <CarRentalSearchParameters />
      <div className="flex gap-x-4 mt-4">
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
            <Link
              className="flex items-center"
              to={'/car-rental/car-rental-results/car-details'}
            >
              <img src={Assets.CheckMark} alt="CheckMark" className="mr-2" />
              <p className="cursor-pointer">Car - Details</p>
            </Link>
            <div className="h-[1px] w-1/4 bg-gray-300" />
            <div className="flex items-center">
              <span className="mr-2 bg-checkMarkBg px-2 py-[3px] text-white rounded-full">
                3
              </span>
              <p className="font-semibold">Car - Booking</p>
            </div>
          </div>
          <FinalBookingStage bookingType="CarRental" />
        </div>
        <CarRentalReviewSummary
          selectedVehicle={activeVehicle}
          carRentalData={carRentalData!}
        />
      </div>
    </div>
  );
};

export default CarRentalReview;
