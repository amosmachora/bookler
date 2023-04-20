import React from 'react';

export const FinalBookingStage = ({
  bookingType,
}: {
  bookingType: 'Flights' | 'Hotels' | 'CarRental';
}) => {
  return <div className="p-10 bg-white rounded-md">{bookingType}</div>;
};
