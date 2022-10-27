import React from "react";
import { Departures } from "../../Types/Flights";
type BookButtonProps = {
  foundFlight: Departures;
};
const BookButton = ({ foundFlight }: BookButtonProps) => {
  return (
    <button
      type="submit"
      className="bg-blue-600 rounded-sm w-24 h-8 text-white text-xs cursor-pointer"
      onClick={() => console.log(foundFlight)}
    >
      BOOK NOW
    </button>
  );
};

export default BookButton;
