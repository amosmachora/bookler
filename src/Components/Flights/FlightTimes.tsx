import { Airport, Departures, ExtraFlightData } from '../../Types/Flights';

export const FlightTimes = ({
  fromAirport,
  toAirport,
  foundFlight,
  showLocations,
  extraFlightData,
}: {
  fromAirport: Airport;
  toAirport: Airport;
  foundFlight: Departures;
  showLocations?: boolean;
  extraFlightData?: ExtraFlightData;
}) => {
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-end">
        <p className="font-bold text-lg">
          {getActualTime(foundFlight.departure.scheduledTimeUtc)}
        </p>
        <p className={`text-gray-400 ${showLocations ? 'text-xs' : 'text-sm'}`}>
          {showLocations
            ? fromAirport.city + ', ' + fromAirport.country
            : fromAirport.icao}
        </p>
      </div>
      <div className="w-24 mx-5 border-b h-[1px] border-dashed border-black relative">
        <div className="w-3 h-3 rounded-full bg-white border-2 border-black center-absolutely" />
      </div>
      <div className="flex flex-col items-start">
        <p className="font-bold text-lg">
          {/* {extraFlightData?.result.response.data[9].time.scheduled.arrival} */}
          00:00
        </p>
        <p
          className={`mr-2 text-gray-400 ${
            showLocations ? 'text-xs' : 'text-sm'
          }`}
        >
          {showLocations
            ? toAirport.city + ', ' + toAirport.country
            : toAirport.icao}
        </p>
      </div>
    </div>
  );
};

const getActualTime = (
  scheduledTimeUtc: string | undefined
): React.ReactNode => {
  return scheduledTimeUtc?.substring(
    scheduledTimeUtc.length - 6,
    scheduledTimeUtc.length - 1
  );
};
