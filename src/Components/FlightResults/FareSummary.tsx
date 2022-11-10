import React, { useContext } from "react";
import { BookingContext } from "./FlightResults";

const FareSummary = () => {
  const { travelersInfo, flightPrice } = useContext(BookingContext);
  const flightSurCharges = 0;
  const numberOfAdults =
    travelersInfo === null ? 0 : travelersInfo?.adultList?.length;

  return (
    <div className="mt-5 w-11/12 mr-16 rounded-lg overflow-hidden ml-5">
      <p className="bg-grayLight font-bold px-4 py-3">Fare Summary</p>
      <div className="bg-white py-4 px-4 rounded-b-lg ">
        <p className="text-sm my-4">Base Fare</p>
        <div className="flex justify-between text-xs px-2 py-2 border rounded-sm">
          <p className="text-gray-400">
            Adults ({numberOfAdults + " X $" + flightPrice})
          </p>
          <p className="font-semibold">${numberOfAdults ?? 0 * flightPrice}</p>
        </div>
        <p className="text-sm my-4">Airlines</p>
        <div className="flex justify-between text-xs px-2 py-2 border rounded-sm">
          <p className="text-gray-400">Fee & Surcharges</p>
          <p className="font-semibold">${flightSurCharges}</p>
        </div>
        <p className="text-right my-5 font-bold">
          ${(numberOfAdults ?? 0 * flightPrice) + flightSurCharges}{" "}
          <span className="text-xs text-gray-300 font-light">USD</span>
        </p>
      </div>
    </div>
  );
};

export default FareSummary;
