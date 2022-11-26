import React, { useContext, useEffect, useState } from "react";
import { HotelSearchContext, MainContext } from "../../App";
import { fetchPropertyListByDestId } from "../../Fetchers/FetchPropertyListByDestId";
import { getDateFromIsoString } from "../../Util/Helpers";
import HotelSearchParameters from "./HotelSearchParameters";
import PropertyList from "../../Util/PropertyListByDestId.json";
import HotelData from "./HotelData";
import { fetchSuggestedLocations } from "../../Fetchers/FetchLocations";
import { PropertyListType } from "../../Types/PropertyList";

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

  // useEffect(() => {
  //   if (!devMode) {
  //     fetchPropertyListByDestId(
  //       getDateFromIsoString(checkInDate),
  //       getDateFromIsoString(checkOutDate),
  //       travellerHotelInfo.adults.toString(),
  //       travellerHotelInfo.Rooms.toString(),
  //       cityLocation[0].dest_id,
  //       travellerHotelInfo.kids.toString(),
  //       travelingForWorkCheckBox.current?.checked ? "business" : "leisure",
  //       sortBy
  //     ).then((res) => setPropertyList(res));
  //   }
  // }, [sortBy]);

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
          "popularity"
        ).then((res) => setPropertyList(res));
      });
    }
  }, [
    checkInDate,
    checkOutDate,
    devMode,
    targetHotelLocation,
    travelingForWorkCheckBox,
    travellerHotelInfo,
  ]);
  return (
    <div>
      <HotelSearchParameters targetHotelLocation={targetHotelLocation} />
      <div className="flex justify-between bg-flightResultsBg py-3 px-5 rounded-md items-center">
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
                className={`rounded-full text-xs py-1 mx-1 px-2 cursor-pointer ${
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
  );
};

export default HotelSearchResults;
