import React from 'react';
import GraySeparator from '../GraySeparator';
import LoadingScreen from '../LoadingScreen';
import CarRentalSearchParameters from './CarRentalSearchParameters';
import { useCarRentalSearchResults } from './CarRentalSearchResultsProvider';
import CarRentalsFilter from './CarRentalsFilter';
import Vehicle from './Vehicle';

const CarRentalResults = () => {
  const { suggestedVehicles } = useCarRentalSearchResults();
  return (
    <div>
      <CarRentalSearchParameters />
      <div className="flex gap-x-2 h-[75vh] overflow-y-scroll mb-3">
        <div className="w-4/5 flex flex-col">
          <div className="flex px-5 bg-flightResultsBg py-2 rounded-sm mb-1 items-center justify-between">
            <div className="flex items-center">
              <p className="text-xl font-bold">Taxi</p>
              <GraySeparator />
              <p className="text-xs font-semibold">
                Total{' '}
                <span className="text-sky-500">
                  {suggestedVehicles?.length ? suggestedVehicles?.length : 0}{' '}
                  Results
                </span>
              </p>
            </div>
            <div className="flex text-xs">
              <p className="rounded-full py-1 mx-3 px-3 cursor-pointer transition-all bg-blue-900 text-white">
                Cheapest
              </p>
              <p className="rounded-full py-1 mx-3 px-3 cursor-pointer transition-all bg-blue-900 text-white">
                Best
              </p>
              <p className="rounded-full py-1 mx-3 px-3 cursor-pointer transition-all bg-blue-900 text-white">
                Quickest
              </p>
            </div>
          </div>
          <div className="overflow-y-scroll flex-grow">
            {suggestedVehicles ? (
              suggestedVehicles.map((vehicle) => (
                <Vehicle vehicle={vehicle} key={vehicle.id} />
              ))
            ) : (
              <LoadingScreen />
            )}
          </div>
        </div>
        <CarRentalsFilter />
      </div>
    </div>
  );
};

export default CarRentalResults;
