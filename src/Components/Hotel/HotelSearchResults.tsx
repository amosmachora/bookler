import React, { useContext, useEffect, useState } from "react";
import { HotelSearchContext, MainContext } from "../../App";
import { fetchPropertyListByDestId } from "../../Fetchers/FetchPropertyListByDestId";
import { getDateFromIsoString } from "../../Util/Helpers";
import HotelSearchParameters from "./HotelSearchParameters";
import PropertyList from "../../Util/PropertyListByDestId.json";
import { Assets } from "../../Assets/Assets";
import HotelData from "./HotelData";
import { HotelInfo } from "../../Types/Hotel";
import { fetchSuggestedLocations } from "../../Fetchers/FetchLocations";

type HotelSearchResultsProps = {
  travelingForWorkCheckBox: React.MutableRefObject<HTMLInputElement | null>;
};

const HotelSearchResults = ({
  travelingForWorkCheckBox,
}: HotelSearchResultsProps) => {
  const { devMode } = useContext(MainContext);
  const { checkInDate, checkOutDate, travellerHotelInfo, targetHotelLocation } =
    useContext(HotelSearchContext);
  const [propertyList, setPropertyList] = useState(PropertyList);
  const [hotelList, setHotelList] = useState<HotelInfo[]>(PropertyList.result);
  const [sortBy, setSortBy] = useState<string>();

  console.log(PropertyList);

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
          travelingForWorkCheckBox.current?.checked ? "business" : "leisure"
        ).then((res) => setHotelList(res.result));
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
          <div className="flex items-center">
            <p
              className={`${
                sortBy === "Popularity"
                  ? "bg-blue-900 text-white"
                  : "hover:bg-blue-600"
              }  rounded-full px-3 py-1 mr-8 cursor-pointer hover:text-white transition-all`}
              onClick={() => setSortBy("Popularity")}
            >
              Popular
            </p>
            <p
              className={`${
                sortBy === "Guest-ratings"
                  ? "bg-blue-900 text-white"
                  : "hover:bg-blue-600"
              } mr-8 cursor-pointer transition-all hover:text-white px-3 py-1 rounded-full`}
              onClick={() => setSortBy("Guest-ratings")}
            >
              Guest ratings
            </p>
            <div
              className={`${
                sortBy === "Price"
                  ? "bg-blue-900 text-white"
                  : "hover:bg-blue-600"
              } flex items-center cursor-pointer hover:text-white transition-all px-3 py-1 rounded-full`}
              onClick={() => setSortBy("Price")}
            >
              <p>Price</p>
              <img
                src={Assets.PriceArrows}
                alt="Price Arrows"
                className="ml-2"
              />
            </div>
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
