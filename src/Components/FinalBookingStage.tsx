import React from 'react';

export const FinalBookingStage = ({
  bookingType,
}: {
  bookingType: 'Flights' | 'Hotels' | 'CarRental';
}) => {
  return (
    <div className="p-10 bg-white mt-1 rounded-md">
      {bookingType}
      <p className="text-xl font-bold">Your details</p>
      <p className="text-gray-400 leading-5 text-xs w-3/4">
        Whether you are in town for business or leisure, 'FIX ME' welcomes
        travelers to 'FIX ME' with exceptional service, spacious
      </p>
    </div>
  );
};
