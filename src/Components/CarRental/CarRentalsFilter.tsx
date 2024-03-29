import React, { useEffect, useState } from 'react';
import { VehicleCategory, VehicleInformation } from '../../Types/CarRentals';
import {
  getArrayOfObjects,
  useCarRentalSearchResults,
} from './CarRentalSearchResultsProvider';
import LineGraph from './LineGraph';

const CarRentalsFilter = () => {
  const [appliedFilters, setAppliedFilters] = useState<string | null>(null);
  const { setSuggestedVehicles, allUnfilteredVehicles, carRentalData } =
    useCarRentalSearchResults();
  const categories: VehicleCategory[] | null = getArrayOfObjects(
    carRentalData?.vehicleCategories
  );

  useEffect(() => {
    if (appliedFilters !== null && appliedFilters !== 'No filter') {
      setSuggestedVehicles(
        allUnfilteredVehicles!.filter((vehicle) =>
          vehicle.vehicleCategoryIds.includes(appliedFilters!)
        )
      );
    } else {
      setSuggestedVehicles(allUnfilteredVehicles);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters]);

  const prices: number[] = getPrices(allUnfilteredVehicles);
  const arrayOfSeats: string[] = getNumberOfSeatsArray(allUnfilteredVehicles);

  const handlePriceRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minPrice: number = parseInt(e.target.value);
    console.log(e.target.value);
    const maxPrice = prices[prices.length - 1];
    setSuggestedVehicles(
      allUnfilteredVehicles!.filter(
        (vehicle) =>
          parseInt(
            vehicle.rates[vehicle.posCurrencyCode].totalAllInclusivePrice
          ) >= minPrice &&
          parseInt(
            vehicle.rates[vehicle.posCurrencyCode].totalAllInclusivePrice
          ) <= maxPrice
      )
    );
  };

  return (
    <div className="w-1/5 overflow-hidden rounded-md relative bg-white">
      <p className="bg-flightResultsBg font-bold text-lg py-3 px-5">Filters</p>
      <div className="px-5 pt-2 text-sm rounded-b-md">
        <p className="text-xs">Prices</p>
        <LineGraph prices={prices} />
        <input
          type="range"
          className="w-full"
          min={0}
          max={prices[prices.length - 1]}
          // value={prices[prices.length - 1]}
          step="1"
          onChange={handlePriceRange}
        />
        <p className="font-semibold mt-7 mb-5">Looking for</p>
        <select
          className="text-xs border w-full rounded-md h-10 px-2 font-semibold"
          onChange={(e) => setAppliedFilters(e.target.value)}
        >
          <option value="No filter">No filter</option>
          {categories &&
            categories.map((category) => (
              <option value={category.display.id} key={category.display.id}>
                {category.display.name}
              </option>
            ))}
        </select>
        <p className="mt-7 mb-5">Popular Filters</p>
        <div className="h-[20vh] overflow-hidden">
          <div className="flex text-xs text-gray-400 mb-3">
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setSuggestedVehicles(
                    allUnfilteredVehicles!.filter(
                      (vehicle) => vehicle.vehicleInfo.airConditioning
                    )
                  );
                } else {
                  setSuggestedVehicles(allUnfilteredVehicles);
                }
              }}
            />
            <p className="ml-2">AC</p>
          </div>
          <div className="flex text-gray-400 text-xs mb-3">
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setSuggestedVehicles(
                    allUnfilteredVehicles!.filter(
                      (vehicle) => vehicle.vehicleInfo.automatic
                    )
                  );
                } else {
                  setSuggestedVehicles(allUnfilteredVehicles);
                }
              }}
            />
            <p className="ml-2">Automatic</p>
          </div>
          <div className="flex text-gray-400 text-xs mb-3">
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setSuggestedVehicles(
                    allUnfilteredVehicles!.filter(
                      (vehicle) => vehicle.vehicleInfo.manual
                    )
                  );
                } else {
                  setSuggestedVehicles(allUnfilteredVehicles);
                }
              }}
            />
            <p className="ml-2">Manual</p>
          </div>
          {arrayOfSeats.map((seat) => (
            <div className="flex text-gray-400 text-xs mb-3" key={seat}>
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSuggestedVehicles(
                      allUnfilteredVehicles!.filter(
                        (vehicle) => vehicle.vehicleInfo.peopleCapacity === seat
                      )
                    );
                  } else {
                    setSuggestedVehicles(allUnfilteredVehicles);
                  }
                }}
              />
              <p className="ml-2">{seat} seats</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarRentalsFilter;

const getPrices = (
  suggestedVehicles: VehicleInformation[] | null
): number[] => {
  const myArray: number[] = [];
  if (!suggestedVehicles) {
    return [];
  }
  suggestedVehicles.forEach((vehicle) =>
    myArray.push(
      parseInt(
        vehicle.rates[vehicle.transactionCurrencyCode].totalAllInclusivePrice
      )
    )
  );
  return myArray.sort((a, b) => a - b);
  // return myArray.sort((a, b) => a - b);
};

const getNumberOfSeatsArray = (
  allUnfilteredVehicles: VehicleInformation[] | null
): string[] => {
  const myArray: string[] = [];
  if (!allUnfilteredVehicles) {
    return [];
  }
  allUnfilteredVehicles.forEach((vehicle) =>
    myArray.push(vehicle.vehicleInfo.peopleCapacity!)
  );

  const filteredArray = myArray.filter(
    (s) => s !== undefined && typeof s === 'string'
  );

  return [...new Set(filteredArray)];
};
