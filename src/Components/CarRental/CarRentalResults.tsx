import React from 'react';
import { RESULTS_DIV_HEIGHT } from '../../App';
import GraySeparator from '../GraySeparator';
import LoadingScreen from '../LoadingScreen';
import CarRentalSearchParameters from './CarRentalSearchParameters';
import { useCarRentalSearchResults } from './CarRentalSearchResultsProvider';
import CarRentalsFilter from './CarRentalsFilter';
import Vehicle from './Vehicle';

const CarRentalResults = () => {
  const { suggestedVehicles } = useCarRentalSearchResults();
  return (
    <div className="flex-1 flex flex-col">
      <CarRentalSearchParameters />
      <div className="flex gap-x-2 mt-2 flex-1">
        <div className="w-4/5">
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
          <div className={`${RESULTS_DIV_HEIGHT} overflow-y-scroll`}>
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
