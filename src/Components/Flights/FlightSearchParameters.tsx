import React from 'react';
import { getFormattedDate } from '../../Util/Helpers';
import { RedSearchButton } from '../RedSearchButton';
import { useFlightDataContext } from '../../Hooks/useFlightData';

/**
 * @returns Display for chosen flight search parameters
 */
const FlightSearchParameters = () => {
  const { userFlightChoices } = useFlightDataContext();
  const { typeOfTrip, fromAirport, departureDate, returnDate, toAirport } =
    userFlightChoices;

  return (
    <div className="flex items-center justify-between bg-white my-2 py-4 px-12 rounded-lg text-sm">
      <div>
        <p className="text-gray-400 text-xs font-medium ml-3">TYPE</p>
        <p className="bg-gray-100 px-3 py-1 font-medium rounded-full">
          {typeOfTrip}
        </p>
      </div>
      <div>
        <p className="text-gray-400 text-xs font-medium ml-3">FROM</p>
        <p className="bg-gray-100 px-3 py-1 font-medium rounded-full">
          {fromAirport!.city + ', ' + fromAirport!.country}
        </p>
      </div>
      <div>
        <p className="text-gray-400 text-xs font-medium ml-3">TO</p>
        <p className="bg-gray-100 px-3 py-1 font-medium rounded-full">
          {toAirport!.city + ', ' + toAirport!.country}
        </p>
      </div>
      <div>
        <p className="text-gray-400 text-xs font-medium ml-3">
          DEPARTURE - RETURN
        </p>
        <p className="bg-gray-100 px-3 py-1 font-medium rounded-full">
          {getFormattedDate(departureDate) +
            ' - ' +
            getFormattedDate(returnDate)}
        </p>
      </div>
      <RedSearchButton text="Search FlIGhT" to="/flights/flight-results" />
    </div>
  );
};

export default FlightSearchParameters;
