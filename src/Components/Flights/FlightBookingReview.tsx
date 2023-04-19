import React from 'react';
import { FinalBookingStage } from '../FinalBookingStage';
import FareSummary from './FareSummary';
import { FlightProgressBar } from './FlightProgressBar';
import FlightSearchParameters from './FlightSearchParameters';

export const FlightBookingReview = () => {
  return (
    <div>
      <FlightSearchParameters />
      <div className="flex gap-x-2">
        <div className="w-4/5">
          <FlightProgressBar />
          <FinalBookingStage bookingType="Flights" />
        </div>
        <div className="w-1/5">
          <FareSummary />
          <button className="w-28 h-9 bg-blue-700 text-white rounded-sm cursor-pointer ml-auto mr-auto block mt-4 hover:scale-110 transition-all">
            Lets go 🚀
          </button>
        </div>
      </div>
    </div>
  );
};
