import React, { useState, useEffect } from 'react';
import { Airline, Airport, Departures } from '../../Types/Flights';
import FlightFilter from './FlightFilter';
import FoundFlight from './FoundFlight';
import FlightSearchParameters from './FlightSearchParameters';
import { useFlightDataContext } from '../../Hooks/useFlightData';

const FlightResults = () => {
  const { userFlightChoices, outGoingFlights } = useFlightDataContext();
  const { toAirport } = userFlightChoices!;
  const [foundFlights, setFoundFlights] = useState<Departures[]>();
  const [sortBy, setSortBy] = useState('cheapest');
  const [preferredStopAirport, setPreferredStopAirport] =
    useState<Airport | null>(null);
  const [preferredAirline, setPreferredAirline] = useState<Airline | null>(
    null
  );

  const allUnfilteredFoundFlights = outGoingFlights!.filter(
    (outGoingFlight) => outGoingFlight.arrival.airport.icao === toAirport!.icao
  );

  useEffect(() => {
    console.log(preferredStopAirport);
  }, [preferredStopAirport]);

  useEffect(() => {
    if (preferredAirline) {
      setFoundFlights(
        foundFlights?.filter(
          (foundFlight) => foundFlight.airline.name === preferredAirline.Name
        )
      );
    } else {
      setFoundFlights(allUnfilteredFoundFlights);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferredAirline]);

  return (
    <div>
      <FlightSearchParameters />
      <div className="flex gap-x-2">
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
          <div className="rounded-lg mt-1 overflow-y-auto found-flights">
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
