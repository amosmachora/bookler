import React, { useContext } from "react";
import { BookingContext } from "./FlightResults";
import { getTotalPrice } from "../../Util/Helpers";

const FareSummary = () => {
  const { flightPrice, travelersInfo } = useContext(BookingContext);
  const numberOfAdults =
    travelersInfo?.adultList === undefined
      ? 0
      : travelersInfo?.adultList?.length;

  const getFlightPriceWithoutSurCharges = (): number => {
    const baseFare =
      flightPrice?.baseFare === undefined ? 0 : flightPrice?.baseFare;

    return baseFare * numberOfAdults;
  };

  return (
    <div className="mt-4 w-full mr-16 rounded-lg overflow-hidden">
      <p className="bg-grayLight font-bold px-4 py-3">Fare Summary</p>
      <div className="bg-white py-4 px-4 rounded-b-lg ">
        <p className="text-sm my-4">Base Fare</p>
        <div className="flex justify-between text-xs px-2 py-2 border rounded-sm">
          <p className="text-gray-400">
            Adults ({numberOfAdults + " X $" + flightPrice?.baseFare})
          </p>
          <p className="font-semibold">${getFlightPriceWithoutSurCharges()}</p>
        </div>
        <p className="text-sm my-4">Airlines</p>
        <div className="flex justify-between text-xs px-2 py-2 border rounded-sm">
          <p className="text-gray-400">Fee & Surcharges</p>
          <p className="font-semibold">${flightPrice?.flightSurCharges}</p>
        </div>
        <p className="text-right my-5 font-bold">
          ${getTotalPrice(travelersInfo, flightPrice)}{" "}
          <span className="text-xs text-gray-300 font-light">USD</span>
        </p>
      </div>
    </div>
  );
};

export default FareSummary;
