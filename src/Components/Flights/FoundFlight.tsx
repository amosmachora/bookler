import React, { useEffect, useState } from 'react';
import { Assets } from '../../Assets/Assets';
import { Departures, ExtraFlightData } from '../../Types/Flights';
import { Airline } from '../../Types/Flights';
import { fetchExtraFlightData } from './fetchers/FetchExtraFlightData';
import FlightDetails from './FlightDetails';
import { useGlobalData } from '../../Hooks/useGlobalData';
import { useFlightDataContext } from '../../Hooks/useFlightData';
import { useUpdateLogger } from '../../Hooks/useUpdateLogger';
import LoadingScreen from '../LoadingScreen';
import { FlightTimes } from './FlightTimes';
import { Link } from 'react-router-dom';
import { FlightPrices } from '../../Types/Contexts';

const FoundFlight = ({
  foundFlight,
  sortBy,
}: {
  foundFlight: Departures;
  sortBy: string;
}) => {
  const { userFlightChoices } = useFlightDataContext();
  const { fromAirport, toAirport } = userFlightChoices!;
  const { airlines } = useGlobalData();
  const [extraFlightData, setExtraFlightData] = useState<{
    extraFlightData: ExtraFlightData;
    flightPrice: FlightPrices;
  } | null>(null);
  const [showDetails, setShowDetails] = useState<Boolean>(false);
  const baseFare = getRandomThreeDigitNumber();

  const fetchFlightPrices = (): FlightPrices => {
    const flightSurCharges = 10;
    return { baseFare, flightSurCharges };
  };

  useEffect(() => {
    fetchExtraFlightData(foundFlight.aircraft.reg!).then((res) => {
      const flightPrices = fetchFlightPrices();
      setExtraFlightData({
        extraFlightData: res,
        flightPrice: flightPrices,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUpdateLogger(extraFlightData, 'ExtraFlightData');

  return (
    <div>
      <div
        className={`flex transition-all ${
          showDetails ? 'rounded-t-lg' : 'rounded-lg mb-2'
        } overflow-hidden`}
        key={foundFlight.number}
      >
        <div className="bg-white px-2 py-3 w-[79%]">
          <div className="flex items-center text-[11px]">
            <p className="capitalize">{sortBy}</p>
            <div className="h-[14px] w-[1px] mx-3 my-auto bg-gray-100" />
            <p>
              Rating: <span className="text-goldRating font-bold">4.5</span>
            </p>
          </div>
          <div className="h-[1px] bg-gray-200" />
          <div className="flex items-center p-5">
            <img
              src={getLogo(foundFlight.airline.name, airlines)}
              alt="Airline Logo"
              className="h-14 w-14 rounded-full shadow-xl mr-3"
            />
            <p className="mr-4 text-sm font-bold w-20">
              {foundFlight.airline.name}
            </p>
            {extraFlightData ? (
              <FlightTimes
                foundFlight={foundFlight}
                fromAirport={fromAirport!}
                toAirport={toAirport!}
                extraFlightData={extraFlightData.extraFlightData}
              />
            ) : (
              <LoadingScreen />
            )}
            <p className="font-bold mx-6">00H 00M</p>
            <p
              className="text-black bg-gray-300 rounded-full text-xs p-2 cursor-pointer"
              onClick={() => setShowDetails((prev) => !prev)}
            >
              View Details
            </p>
          </div>
        </div>
        <div className="flex bg-flightPrices flex-grow p-2">
          <div>
            <p className="text-red-600 text-sm font-semibold mt-7">
              {getRandomTwoDigitNumberLessThan30()}% OFF
            </p>
            <p className="text-xs text-gray-400">
              Save ${getRandomTwoDigitNumber()}
            </p>
          </div>
          <div className="flex flex-col items-end mt-2 justify-between">
            <p className="text-[32px] w-min font-semi mb-1 ml-6">
              {getRandomThreeDigitNumber()}
              <span className="text-gray-400 text-xs font-normal">USD</span>
            </p>
            <Link
              type="submit"
              className="bg-blue-600 rounded-sm w-24 h-8 text-white text-xs cursor-pointer flex items-center justify-center"
              to={foundFlight.number}
            >
              BOOK NOW
            </Link>
          </div>
        </div>
      </div>
      {showDetails && (
        <FlightDetails
          foundFlight={foundFlight}
          thumbnail={
            extraFlightData?.extraFlightData.result.response.aircraftImages[0]
              .images.thumbnails[0].src!
          }
        />
      )}
    </div>
  );
};

export default FoundFlight;

const getLogo = (airlineName: string, airlines: Airline[]): string => {
  const airline: any = airlines.filter(
    (airline) => airline.Name === airlineName
  );
  if (airline[0] === undefined) {
    return Assets.PlaneFlying;
  }
  return `https://content.airhex.com/content/logos/airlines_${airline[0].Code}_100_100_s.png`;
};

function getRandomThreeDigitNumber(): number {
  const min = 100;
  const max = 999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTwoDigitNumber(): number {
  const min = 10;
  const max = 99;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTwoDigitNumberLessThan30(): number {
  const min = 10;
  const max = 29;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
