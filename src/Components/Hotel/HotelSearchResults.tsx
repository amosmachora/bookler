import React, { useContext, useEffect, useState } from "react";
import { HotelSearchContext, MainContext } from "../../App";
import { fetchPropertyListByDestId } from "../../Fetchers/FetchPropertyListByDestId";
import { getDateFromIsoString } from "../../Util/Helpers";
import HotelSearchParameters from "./HotelSearchParameters";
import PropertyList from "../../Util/PropertyListByDestId.json";
import HotelData from "./HotelData";
import { fetchSuggestedLocations } from "../../Fetchers/FetchLocations";
import { PropertyListType } from "../../Types/PropertyList";
import HotelFilter from "./HotelFilter";
// import HotelFilter from "./HotelFilter";

type HotelSearchResultsProps = {
  travelingForWorkCheckBox: React.MutableRefObject<HTMLInputElement | null>;
};

const HotelSearchResults = ({
  travelingForWorkCheckBox,
}: HotelSearchResultsProps) => {
  const { devMode } = useContext(MainContext);
  const { checkInDate, checkOutDate, travellerHotelInfo, targetHotelLocation } =
    useContext(HotelSearchContext);
  const [propertyList, setPropertyList] =
    useState<PropertyListType>(PropertyList);
  const [hotelList, setHotelList] = useState(propertyList.result);
  const [sortBy, setSortBy] = useState<string>(
    propertyList.sorting.selected_identifier
  );

  useEffect(() => {
    if (!devMode) {
      fetchSuggestedLocations(targetHotelLocation?.city).then((res) => {
        const cityLocation = res.filter((res) => res.dest_type === "city");
        fetchPropertyListByDestId(
          getDateFromIsoString(checkInDate),
          getDateFromIsoString(checkOutDate),
          travellerHotelInfo.adults.toString(),
          travellerHotelInfo.Rooms.toString(),
          cityLocation[0].dest_id,
          travellerHotelInfo.kids.toString(),
          travelingForWorkCheckBox.current?.checked ? "business" : "leisure",
          //FIX ME
          "popularity"
        ).then((res) => setPropertyList(res));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devMode, sortBy]);

  useEffect(() => {
    setHotelList(propertyList.result);
  }, [propertyList]);

  return (
    <div>
      <HotelSearchParameters targetHotelLocation={targetHotelLocation} />
      <div className="flex justify-between">
        <div className="bg-flightResultsBg py-3 rounded-md w-[78%]">
          <div className="flex px-5">
            <div className="flex items-stretch">
              <p className="font-bold">Hotels</p>
              <div className="h-inherit w-[1px] bg-gray-300 mx-3" />
              <div className="flex items-center">
                <p className="text-sm font-semibold">
                  Total{" "}
                  <span className="text-sky-500 font-normal">
                    {PropertyList.result.length} results
                  </span>
                </p>
              </div>
            </div>
            <div className="flex text-sm items-stretch text-gray-400">
              <div className="flex items-center flex-wrap">
                {propertyList.sort.map((sortOption) => (
                  <p
                    className={`rounded-full text-xs py-1 mx-1 px-2 cursor-pointer transition-all ${
                      sortOption.id === sortBy ? "bg-blue-900 text-white" : ""
                    }`}
                    onClick={() => setSortBy(sortOption.id)}
                  >
                    {sortOption.name}
                  </p>
                ))}
              </div>
              <div className="h-inherit w-[1px] bg-gray-300 mx-3" />
              <div className="flex items-center">
                <p className="cursor-pointer text-blue-600 font-semibold">
                  Map View
                </p>
              </div>
            </div>
          </div>
          {hotelList.map((hotelInfo) => (
            <HotelData hotelInfo={hotelInfo} key={hotelInfo.hotel_id} />
          ))}
        </div>
        <HotelFilter
          baseFilters={propertyList.base_filters}
          recommendedFilters={propertyList.recommended_filters}
        />
      </div>
    </div>
  );
};

export default HotelSearchResults;
