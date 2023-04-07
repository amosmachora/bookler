import React from 'react';

const FareSummary = () => {
  const flightPrice = {
    baseFare: 0,
    flightSurCharges: 10,
  };
  const numberOfAdults = 0;

  return (
    <div className="w-full rounded-lg overflow-hidden">
      <p className="bg-grayLight font-bold px-4 py-3">Fare Summary</p>
      <div className="bg-white py-4 px-4 rounded-b-lg ">
        <p className="text-sm my-4">Base Fare</p>
        <div className="flex justify-between text-xs px-2 py-2 border rounded-sm">
          <p className="text-gray-400">
            Adults ({numberOfAdults + ' X $' + flightPrice?.baseFare})
          </p>
          <p className="font-semibold">${flightPrice.baseFare}</p>
        </div>
        <p className="text-sm my-4">Airlines</p>
        <div className="flex justify-between text-xs px-2 py-2 border rounded-sm">
          <p className="text-gray-400">Fee & Surcharges</p>
          <p className="font-semibold">${flightPrice?.flightSurCharges}</p>
        </div>
        <p className="text-right my-5 font-bold">
          $
          {numberOfAdults * flightPrice.baseFare + flightPrice.flightSurCharges}{' '}
          <span className="text-xs text-gray-300 font-light">USD</span>
        </p>
      </div>
    </div>
  );
};

export default FareSummary;
