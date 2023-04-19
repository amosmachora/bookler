import React from 'react';
import { Assets } from '../../Assets/Assets';

export const FlightProgressBar = () => {
  return (
    <div className="flex justify-between bg-white rounded-md py-3 px-12 mb-2 items-center text-xs">
      <div className="flex items-center">
        <img src={Assets.CheckMark} alt="CheckMark" className="mr-2" />
        <p className="cursor-pointer">Flight selected</p>
      </div>
      <div className="h-[1px] w-1/4 bg-gray-300" />
      <div className="flex items-center">
        <img src={Assets.CheckMark} alt="CheckMark" className="mr-2" />
        <p className="cursor-pointer">Flight details</p>
      </div>
      <div className="h-[1px] w-1/4 bg-gray-300" />
      <div className="flex items-center">
        <span className="mr-2 bg-checkMarkBg px-2 py-[3px] text-white rounded-full">
          3
        </span>
        <p className="font-semibold">Flight booking</p>
      </div>
    </div>
  );
};
