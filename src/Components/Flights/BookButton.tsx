import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Departures } from "../../Types/Flights";
import { BookingContext } from "./FlightResults";
type BookButtonProps = {
  foundFlight: Departures;
};
const BookButton = ({ foundFlight }: BookButtonProps) => {
  const { initiateBooking } = useContext(BookingContext);
  return (
    <Link
      type="submit"
      className="bg-blue-600 rounded-sm w-24 h-8 text-white text-xs cursor-pointer flex items-center justify-center"
      onClick={() => initiateBooking(foundFlight)}
      to={foundFlight.number}
    >
      BOOK NOW
    </Link>
  );
};

export default BookButton;
