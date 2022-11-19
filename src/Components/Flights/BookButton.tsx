import React, { useContext } from "react";
import { Departures } from "../../Types/Flights";
import { BookingContext } from "./FlightResults";
type BookButtonProps = {
  foundFlight: Departures;
};
const BookButton = ({ foundFlight }: BookButtonProps) => {
  const { initiateBooking } = useContext(BookingContext);
  return (
    <button
      type="submit"
      className="bg-blue-600 rounded-sm w-24 h-8 text-white text-xs cursor-pointer"
      onClick={() => initiateBooking(foundFlight)}
    >
      BOOK NOW
    </button>
  );
};

export default BookButton;
