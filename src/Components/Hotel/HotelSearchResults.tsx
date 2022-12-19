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
import { GoogleMapsCenter, HotelInfo, SelectedHotel } from "../../Types/Hotel";
import HotelDetails from "./HotelDetails";
import BookingReview from "./BookingReview";

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
  const [hotelList, setHotelList] = useState<HotelInfo[]>(propertyList.result);
  const [sortBy, setSortBy] = useState<string>(
    propertyList.sorting.selected_identifier
  );

  //Selected filters array
  const [filterBy, setFilterBy] = useState<Array<string>>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);

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
  const [mapCenter, setMapCenter] = useState<GoogleMapsCenter>({
    lat: 0,
    lng: 0,
  });

  /**
   * Stage state to define the different booking stages
   * 1) HotelResults
   * 2) HotelDetails
   * 3) BookingReview
   */
  const [stage, setStage] = useState("HotelResults");
  const [selectedHotelInfo, setSelectedHotelInfo] =
    useState<SelectedHotel | null>(null);

  return (
    <div>
      <HotelSearchParameters targetHotelLocation={targetHotelLocation} />
      {stage === "HotelResults" && (
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
                    setStage={setStage}
                    setSelectedHotelInfo={setSelectedHotelInfo}
                    hotelList={hotelList}
                  />
                ))}
              </div>
              {mapShown && mapCenter !== null && <Map center={mapCenter} />}
            </div>
          </div>
          <HotelFilter
            baseFilters={propertyList.base_filters}
            recommendedFilters={propertyList.recommended_filters}
            setFilterBy={setFilterBy}
          />
        </div>
      )}
      {stage === "HotelDetails" && (
        <HotelDetails
          selectedHotelInfo={selectedHotelInfo}
          setStage={setStage}
        />
      )}
      {stage === "BookingReview" && (
        <BookingReview selectedHotelInfo={selectedHotelInfo} />
      )}
    </div>
  );
};

export default HotelSearchResults;
