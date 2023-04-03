import React, { useContext, useEffect, useRef, useState } from 'react';
import { BaseFilter, RecommendedFilter } from '../../Types/PropertyList';
import { HotelSearchResultsContext } from './HotelSearchResultsProvider';

const HotelFilter = ({
  baseFilters,
  recommendedFilters,
}: {
  baseFilters: BaseFilter[];
  recommendedFilters: RecommendedFilter[];
}) => {
  const [activeFilter, setActiveFilter] = useState<BaseFilter | undefined>(
    baseFilters[0]
  );

  const { setFilterBy } = useContext(HotelSearchResultsContext);

  const addFilter = (filter_id: string) => {
    setFilterBy((prevState) => [...prevState, filter_id]);
  };

  const removeFilter = (filter: string) => {
    setFilterBy((prevState) =>
      prevState.filter((element) => element !== filter)
    );
  };
  const filterDiv = useRef<HTMLDivElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (filterDiv.current!.scrollHeight > filterDiv.current!.offsetHeight) {
      setIsOverflowing(true);
    } else {
      setIsOverflowing(false);
    }
  }, []);

  return (
    <div
      className="w-1/5 rounded-md overflow-hidden h-full relative"
      ref={filterDiv}
    >
      <p className="font-bold text-lg bg-flightResultsBg py-3 px-5">Filters</p>
      <div className="p-5 bg-white text-sm rounded-b-md">
        <div className="flex justify-between font-semibold">
          <p>Price</p>
          <p>+795</p>
        </div>
        <p className="text-red-800 font-bold">
          Fix me !! Generate price graph from provided prices
        </p>
        <input type="range" className="w-full" />
        <p className="font-semibold mb-5 mt-7">Looking for</p>
        <select
          className="w-full font-semibold border rounded-md h-10 px-3"
          onChange={(e) => {
            setActiveFilter(
              baseFilters.find((filter) => filter.id === e.target.value)
            );
          }}
        >
          {baseFilters.map((filter) => (
            <option value={filter.id} key={filter.id}>
              {filter.title}
            </option>
          ))}
        </select>
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
        {recommendedFilters.map((filter) => (
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
        {isOverflowing && (
          <p
            className="text-center absolute bottom-0 left-1/2 -translate-x-1/2 py-4 bg-white w-full cursor-pointer"
            onClick={() => (filterDiv.current!.style.overflowY = 'scroll')}
          >
            More
          </p>
        )}
      </div>
    </div>
  );
};

export default HotelFilter;
