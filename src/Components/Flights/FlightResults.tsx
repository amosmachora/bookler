import React, { useState, useEffect } from 'react';
import { Airline, Airport, Departures } from '../../Types/Flights';
import FlightFilter from './FlightFilter';
import FoundFlight from './FoundFlight';
import FlightSearchParameters from './FlightSearchParameters';
import { useFlightDataContext } from '../../Hooks/useFlightData';
import { useUpdateLogger } from '../../Hooks/useUpdateLogger';
import { RESULTS_DIV_HEIGHT } from '../../App';

const FlightResults = () => {
  const { userFlightChoices, outGoingFlights } = useFlightDataContext();
  const { toAirport } = userFlightChoices!;
  const unfilteredFoundFlights: Departures[] = outGoingFlights!.filter(
    (outGoingFlight) => outGoingFlight.arrival.airport.icao === toAirport!.icao
  );
  const [foundFlights, setFoundFlights] = useState<Departures[]>(
    unfilteredFoundFlights
  );
  const [sortBy, setSortBy] = useState('cheapest');
  const [preferredStopAirport, setPreferredStopAirport] =
    useState<Airport | null>(null);
  const [preferredAirline, setPreferredAirline] = useState<Airline | null>(
    null
  );

  useEffect(() => {
    console.log(preferredStopAirport);
  }, [preferredStopAirport]);

  useUpdateLogger(preferredAirline, 'preferredAirline');

  useEffect(() => {
    if (preferredAirline) {
      setFoundFlights(
        foundFlights?.filter(
          (foundFlight) => foundFlight.airline.name === preferredAirline.Name
        )
      );
    } else {
      setFoundFlights(unfilteredFoundFlights);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferredAirline]);

  return (
    <div className="flex-1 flex flex-col">
      <FlightSearchParameters />
      <div className="flex flex-1 gap-x-2">
        <div className="w-4/5">
          <div className="flex justify-between px-5 py-3 items-center rounded-lg bg-flightResultsBg">
            <div className="flex items-center">
              <p className="font-bold inline text-xl">Flights</p>
              <div className="h-[14px] w-[1px] mx-3 my-auto bg-gray-400" />
              <p className="text-sm">
                Total{' '}
                <span className="text-blue-400">
                  {foundFlights?.length} results
                </span>
              </p>
            </div>
            <div className="flex text-xs items-center">
              <p
                className={`${
                  sortBy === 'cheapest'
                    ? 'bg-blueBgMainSm text-white px-3 py-2 rounded-full transition-all'
                    : ''
                } cursor-pointer`}
                onClick={() => setSortBy('cheapest')}
              >
                Cheapest
              </p>
              <p
                className={`${
                  sortBy === 'best'
                    ? 'bg-blueBgMainSm text-white px-3 py-2 rounded-full transition-all'
                    : ''
                } mx-8 cursor-pointer`}
                onClick={() => setSortBy('best')}
              >
                Best
              </p>
              <p
                className={`${
                  sortBy === 'quickest'
                    ? 'bg-blueBgMainSm text-white px-3 py-2 rounded-full transition-all'
                    : ''
                } cursor-pointer`}
                onClick={() => setSortBy('quickest')}
              >
                Quickest
              </p>
            </div>
          </div>
          <div
            className={`rounded-lg overflow-y-auto mt-1 found-flights ${RESULTS_DIV_HEIGHT}`}
          >
            {foundFlights?.map((foundFlight) => (
              <FoundFlight
                foundFlight={foundFlight}
                sortBy={sortBy}
                key={foundFlight.number}
              />
            ))}
          </div>
        </div>
        <FlightFilter
          setPreferredStopAirport={setPreferredStopAirport}
          preferredStopAirport={preferredStopAirport}
          setPreferredAirline={setPreferredAirline}
        />
      </div>
    </div>
  );
};

export default FlightResults;
