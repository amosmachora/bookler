import React from "react";
import { Assets } from "../../Assets/Assets";

const PaymentOptions = () => {
  const remainingTime = "0min 5sec";
  return (
    <div className="grid mt-5">
      <div className="flex justify-between py-3 px-5 rounded-md bg-flightResultsBg items-center">
        <p className="font-bold text-lg">Payment Options</p>
        <p className="text-gray-500 text-sm">
          The session will expire in{" "}
          <span className="text-sky-700 font-semibold">{remainingTime}</span>
        </p>
      </div>
      <div className="flex justify-between bg-white rounded-md py-3 px-12 mt-2 items-center text-xs">
        <div className="flex items-center">
          <img src={Assets.CheckMark} alt="CheckMark" className="mr-2" />
          <p>Flight selected</p>
        </div>
        <div className="h-[1px] w-1/4 bg-gray-300" />
        <div className="flex items-center">
          <img src={Assets.CheckMark} alt="CheckMark" className="mr-2" />
          <p>Flight details</p>
        </div>
        <div className="h-[1px] w-1/4 bg-gray-300" />
        <div className="flex items-center">
          <span className="mr-2 bg-checkMarkBg px-2 py-[3px] text-white rounded-full">
            3
          </span>
          <p className="font-semibold">Flight booking</p>
        </div>
      </div>
      <div className="rounded-md px-12 py-6 bg-white mt-1">
        <p className="font-bold text-2xl">Payment Method</p>
        <div>
          <img src={Assets.ArrowLeft} alt="Arrow" />
          <img src={Assets.ArrowRight} alt="Arrow" />
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
