import React, { useContext, useState } from "react";
import { GoogleMapsCenter } from "../../Types/Hotel";
import HotelData from "./HotelData";
import HotelFilter from "./HotelFilter";
import { HotelSearchResultsContext } from "./HotelSearchResults";
import Map from "./Map";

const HotelResults = () => {
  const { propertyList, setSortBy, sortBy, hotelList } = useContext(
    HotelSearchResultsContext
  );
  const [mapShown, setMapShown] = useState<boolean>(false);
  const [mapCenter, setMapCenter] = useState<GoogleMapsCenter>({
    lat: 0,
    lng: 0,
  });
  const [activeTab, setActiveTab] = useState<string | null>(null);

  return (
    <div className="flex justify-between h-[87vh] mb-8">
      <div className="w-3/4 h-87vh flex flex-col justify-between overflow-hidden rounded-b-md">
        <div className="flex px-5 bg-flightResultsBg py-2 rounded-sm mb-1 items-center justify-between">
          <p className="font-bold">Hotels</p>
          <div className="h-5 w-[1px] bg-gray-300 mx-3" />
          <p className="text-sm font-semibold">
            Total{" "}
            <span className="text-sky-500 font-normal">
              {propertyList.result.length} results
            </span>
          </p>
          <div className="flex items-center flex-wrap text-xs text-gray-400 w-max">
            {propertyList.sort.map((sortOption) => (
              <p
                className={`rounded-full py-1 mx-1 px-2 cursor-pointer transition-all ${
                  sortOption.id === sortBy ? "bg-blue-900 text-white" : ""
                }`}
                onClick={() => setSortBy(sortOption.id)}
                key={sortOption.id}
              >
                {sortOption.name}
              </p>
            ))}
            {propertyList.applied_filters.map((appliedFilter) => (
              <p className="text-xs py-1 mx-1 px-2">{appliedFilter.name}</p>
            ))}
          </div>
          <div className="h-5 w-[1px] bg-gray-300 mx-3" />
          <div className="flex items-center">
            <p className="cursor-pointer text-blue-600 font-semibold text-sm ml-2">
              Map View
            </p>
          </div>
        </div>
        <div className="flex justify-between flex-grow h-[90%]">
          <div
            className={`h-full overflow-y-scroll overflow-x-hidden rounded-md transition-all duration-500 w-full ${
              mapShown ? "w-[44%]" : ""
            } `}
          >
            {hotelList.map((hotelInfo) => (
              <HotelData
                hotelInfo={hotelInfo}
                key={hotelInfo.hotel_id}
                setShowMapFunction={setMapShown}
                mapShown={mapShown}
                setMapCenter={setMapCenter}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            ))}
          </div>
          {mapShown && mapCenter !== null && (
            <Map center={mapCenter} width="w-[55%]" />
          )}
        </div>
      </div>
      <HotelFilter
        baseFilters={propertyList.base_filters}
        recommendedFilters={propertyList.recommended_filters}
      />
    </div>
  );
};

export default HotelResults;
