import React, { useContext, useEffect, useState } from "react";
import { MainContext, SearchContext } from "../../App";
import { Assets } from "../../Assets/Assets";
import { Departures, SingleFlightData } from "../../Types/Flights";
import BookButton from "./BookButton";
import { Airline } from "../../Types/Flights";
import DevExtraFlightData from "../../Util/DevExtraFlightData.json";
import { fetchExtraFlightData } from "../../Fetchers/FetchExtraFlightData";
import FlightDetails from "./FlightDetails";

type FoundFlightProps = {
  foundFlight: Departures;
  sortBy: string;
};

const FoundFlight = ({ foundFlight, sortBy }: FoundFlightProps) => {
  const { fromAirport, toAirport } = useContext(SearchContext);
  const { airlines } = useContext(MainContext);
  const [flightData, setFlightData] = useState<SingleFlightData | undefined>(
    DevExtraFlightData
  );
  const { devMode } = useContext(MainContext);
  const [showDetails, setShowDetails] = useState<Boolean>(false);

  useEffect(() => {
    if (!devMode) {
      const flightData = fetchExtraFlightData(foundFlight.number);
      setFlightData(flightData);
    }
  }, []);

  return (
    <>
      <div className="flex rounded-lg overflow-hidden" key={foundFlight.number}>
        <div className="bg-white px-2 py-3 w-[79%] mb-[2px]">
          <div className="flex items-center text-[11px]">
            <p>{sortBy}</p>
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
            <div className="flex flex-col items-end">
              <p className="font-bold text-lg">
                {getActualTime(foundFlight.departure.scheduledTimeUtc)}
              </p>
              <p className="text-sm text-gray-400">{fromAirport.icao}</p>
            </div>
            <div className="w-24 mx-5 border-b h-[1px] border-dashed border-black relative">
              <div className="w-3 h-3 rounded-full bg-white border-2 border-black center-absolutely" />
            </div>
            <div className="flex flex-col items-start">
              <p className="font-bold text-lg">00:00</p>
              <p className="mr-2 text-sm text-gray-400">{toAirport.icao}</p>
            </div>
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
            <p className="text-red-600 text-sm font-semibold mt-7">00% OFF</p>
            <p className="text-xs text-gray-400">Save $00</p>
          </div>
          <div className="flex flex-col items-end mt-2">
            <p className="text-[32px] w-min font-semi mb-1">
              000
              <span className="text-gray-400 text-xs font-normal">USD</span>
            </p>
            <BookButton foundFlight={foundFlight} />
          </div>
        </div>
      </div>
      <div>{showDetails && <FlightDetails flightData={flightData} />}</div>
    </>
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

function getActualTime(scheduledTimeUtc: string | undefined): React.ReactNode {
  return scheduledTimeUtc?.substring(
    scheduledTimeUtc.length - 6,
    scheduledTimeUtc.length - 1
  );
}
