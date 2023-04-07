import React, { useState } from 'react';
import { Departures } from '../../Types/Flights';
import { Assets } from '../../Assets/Assets';
import { useFlightDataContext } from '../../Hooks/useFlightData';
import { FlightTimes } from './FlightTimes';

const FlightDetails = ({
  foundFlight,
  thumbnail,
}: {
  foundFlight: Departures;
  thumbnail: string;
}) => {
  const { userFlightChoices } = useFlightDataContext();
  const { toAirport, fromAirport } = userFlightChoices!;
  const [details, setDetails] = useState(true);

  return (
    <div className="transition-all mb-2 rounded-b-lg overflow-hidden">
      <div>
        <button
          onClick={() => setDetails(true)}
          className={`uppercase ${
            details
              ? 'text-detailsText border border-b-detailsText'
              : `text-gray-700`
          } font-semibold text-sm px-4 py-2 mr-5`}
        >
          Details
        </button>
        <button
          onClick={() => setDetails(false)}
          className={`uppercase  ${
            details
              ? 'text-gray-700'
              : `text-detailsText border-b-detailsText border`
          } font-semibold text-sm px-4 py-2`}
        >
          Fares
        </button>
      </div>
      <div className="p-5 bg-white">
        {details ? (
          <div className="flex items-center">
            <img
              src={thumbnail}
              alt="Aircraft"
              className={`rounded-md w-24 h-12`}
            />

            <p className="text-sm font-semibold mx-4">{foundFlight.number}</p>
            <FlightTimes
              foundFlight={foundFlight}
              fromAirport={fromAirport!}
              toAirport={toAirport!}
              showLocations={true}
            />
            <div className="flex flex-col flex-grow ml-2">
              <div className="flex justify-between">
                <p className="font-bold text-sm">
                  <span className="text-gray-500 font-medium text-sm">
                    Baggage:{' '}
                  </span>
                  Adult
                </p>
                <p className="font-bold text-sm">
                  <span className="text-gray-500 font-medium text-sm">
                    Check In:{' '}
                  </span>
                  40kgs
                </p>
              </div>
              <p className="font-bold text-sm mt-1">
                <span className="text-gray-500 font-medium text-sm">
                  Cabin:{' '}
                </span>
                40kgs
              </p>
            </div>
          </div>
        ) : null}
        <div className="mt-7 flex items-center justify-between">
          <p className="uppercase font-bold text-sm">
            {foundFlight.airline.name}
          </p>
          <div className="bg-gray-300 w-10/12 h-[1px]" />
        </div>
        <div className="flex mt-1">
          <div className="flex items-center mr-12">
            <img src={Assets.PlaneSeat} alt="Plane seat" className="mr-2" />
            <p className="text-gray-500 text-xs">80 cm Seat</p>
          </div>
          <div className="flex items-center mr-12">
            <img src={Assets.Wifi} alt="WIFI" className="mr-2" />
            <p className="text-gray-500 text-xs">Wifi</p>
          </div>
          <div className="flex items-center mr-12">
            <img src={Assets.Food} alt="Food" className="mr-2" />
            <p className="text-gray-500 text-xs">Food available</p>
          </div>
          <div className="flex items-center mr-12">
            <img
              src={Assets.ChargingBattery}
              alt="Charging battery"
              className="mr-2"
            />
            <p className="text-gray-500 text-xs">Power Outlet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
