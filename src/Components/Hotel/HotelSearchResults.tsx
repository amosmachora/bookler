import Map from "./Map";
import React, { useContext, useEffect, useState } from "react";
import { HotelSearchContext, MainContext } from "../../App";
import { fetchPropertyListByDestId } from "../../Fetchers/FetchPropertyListByDestId";
import { cleaned, getDateFromIsoString } from "../../Util/Helpers";
import HotelSearchParameters from "./HotelSearchParameters";
import PropertyList from "../../Util/PropertyListByDestId.json";
import HotelData from "./HotelData";
import { fetchSuggestedLocations } from "../../Fetchers/FetchLocations";
import { PropertyListType } from "../../Types/PropertyList";
import HotelFilter from "./HotelFilter";
import HotelActiveDataScreen from "./HotelActiveDataScreen";
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

  //Selected filters array
  const [filterBy, setFilterBy] = useState<Array<string>>([]);

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
          sortBy,
          cleaned(filterBy)
        ).then((res) => setPropertyList(res));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devMode, sortBy, filterBy]);

  useEffect(() => {
    setHotelList(propertyList.result);
  }, [propertyList]);

  const [mapShown, setMapShown] = useState<boolean>(false);

  return (
    <div>
      <HotelSearchParameters targetHotelLocation={targetHotelLocation} />
      <div className="flex justify-between">
        <div className="w-[78%] h-max">
          <HotelActiveDataScreen
            sortBy={sortBy}
            propertyList={propertyList}
            setSortBy={setSortBy}
          />
          <div className="flex justify-between">
            <div
              className={`h-[87vh] overflow-y-scroll overflow-x-hidden rounded-md ${
                mapShown ? "w-[44%]" : ""
              } `}
            >
              {hotelList.map((hotelInfo) => (
                <HotelData
                  hotelInfo={hotelInfo}
                  key={hotelInfo.hotel_id}
                  setShowMapFunction={setMapShown}
                  mapShown={mapShown}
                />
              ))}
            </div>
            {mapShown && <Map />}
          </div>
        </div>
        <HotelFilter
          baseFilters={propertyList.base_filters}
          recommendedFilters={propertyList.recommended_filters}
          setFilterBy={setFilterBy}
        />
      </div>
    </div>
  );
};

export default HotelSearchResults;
