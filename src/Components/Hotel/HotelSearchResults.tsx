import React, { useContext, useEffect } from "react";
import { HotelSearchContext, MainContext } from "../../App";
import { fetchPropertyListByDestId } from "../../Fetchers/FetchPropertyListByDestId";
import { fetchSuggestedLocations } from "../../Fetchers/FetchSuggestedLocations";
import { Airport } from "../../Types/Flights";
import { getDateFromIsoString } from "../../Util/Helpers";
import HotelSearchParameters from "./HotelSearchParameters";

type HotelSearchResultsProps = {
  toAirport: Airport;
  travelingForWorkCheckBox: React.MutableRefObject<HTMLInputElement | null>;
};

const HotelSearchResults = ({
  toAirport,
  travelingForWorkCheckBox,
}: HotelSearchResultsProps) => {
  const { devMode } = useContext(MainContext);
  const { targetHotelLocation } = useContext(HotelSearchContext);
  const { checkInDate, checkOutDate, travellerHotelInfo } =
    useContext(HotelSearchContext);

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
        ).then((res) => console.log(res));
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
      <HotelSearchParameters toAirport={toAirport} />
    </div>
  );
};

export default HotelSearchResults;
