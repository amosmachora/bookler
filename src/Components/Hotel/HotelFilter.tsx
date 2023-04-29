import React, { useState } from 'react';
import { BaseFilter, RecommendedFilter } from '../../Types/PropertyList';
import LineGraph from '../CarRental/LineGraph';
import { useHotelSearchResults } from './HotelSearchResultsProvider';

const HotelFilter = ({
  baseFilters,
  recommendedFilters,
  prices,
}: {
  baseFilters: BaseFilter[] | undefined;
  recommendedFilters: RecommendedFilter[] | undefined;
  prices: number[] | null;
}) => {
  const [activeFilter, setActiveFilter] = useState<BaseFilter | null>(
    baseFilters ? baseFilters[0] : null
  );

  const { setFilterBy } = useHotelSearchResults();

  const addFilter = (filter_id: string) => {
    setFilterBy((prevState) => [...prevState, filter_id]);
  };

  const removeFilter = (filter: string) => {
    setFilterBy((prevState) =>
      prevState.filter((element) => element !== filter)
    );
  };

  return (
    <div className="w-1/5 h-full relative bg-white rounded-md overflow-hidden">
      <p className="font-bold text-lg bg-flightResultsBg py-3 px-5">Filters</p>
      <div className="p-5 text-sm rounded-bg">
        <div className="flex justify-between font-semibold">
          <p>Price</p>
          <p>+795</p>
        </div>
        {prices && <LineGraph prices={prices} />}
        <input type="range" className="w-full" />
        <p className="font-semibold mb-5 mt-7">Looking for</p>
        {baseFilters && (
          <select
            className="w-full font-semibold border rounded-md h-10 px-3"
            onChange={(e) => {
              setActiveFilter(
                baseFilters.find((filter) => filter.id === e.target.value)!
              );
            }}
          >
            {baseFilters.map((filter) => (
              <option value={filter.id} key={filter.id}>
                {filter.title}
              </option>
            ))}
          </select>
        )}
        <p className="mt-7 mb-5">Category</p>
        <select
          className="w-full font-bold border rounded-md h-10 px-3"
          onChange={(e) => addFilter(e.target.value)}
        >
          {activeFilter?.categories.map((filter) => (
            <option value={filter.id} key={filter.id}>
              {filter.name}
            </option>
          ))}
        </select>
        <p className="mt-7 mb-5">Popular Filters</p>
        {recommendedFilters &&
          recommendedFilters.map((filter) => (
            <div
              className="flex text-gray-400 text-xs mb-2"
              key={filter.generic_id}
            >
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    addFilter(filter.generic_id);
                  } else {
                    removeFilter(filter.generic_id);
                  }
                }}
              />
              <p className="ml-2">{filter.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HotelFilter;
