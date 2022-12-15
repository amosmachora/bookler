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
import { Facility, GoogleMapsCenter, HotelImagesType } from "../../Types/Hotel";
import HotelDetails from "./HotelDetails";

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

  const [detailsShown, setDetailsShown] = useState<boolean>(false);
  const [hotelDetailsId, setHotelDetailsId] = useState<number | null>(null);
  const [HotelDetailsImages, setHotelDetailsImages] =
    useState<HotelImagesType | null>(null);
  const [hotelDetailsFacilities, setHotelDetailsFacilities] = useState<
    Facility[]
  >([]);

  return (
    <div>
      <HotelSearchParameters targetHotelLocation={targetHotelLocation} />
      <div className="flex justify-between">
        <div className={`${detailsShown ? "w-full" : "w-[78%]"} h-max`}>
          <HotelActiveDataScreen
            sortBy={sortBy}
            propertyList={propertyList}
            setSortBy={setSortBy}
          />
          {detailsShown ? (
            <HotelDetails
              hotelInfo={hotelList.find(
                (hotel) => hotel.hotel_id === hotelDetailsId
              )}
              hotelImages={HotelDetailsImages}
              hotelFacilities={hotelDetailsFacilities.slice(0, 4)}
              showInfo={false}
            />
          ) : (
            <div className="flex justify-between">
              <div
                className={`h-[87vh] overflow-y-scroll overflow-x-hidden rounded-md transition-all duration-500 w-full ${
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
                    setDetailsShown={setDetailsShown}
                    setHotelDetailsId={setHotelDetailsId}
                    setHotelDetailsImages={setHotelDetailsImages}
                    setHotelDetailsFacilities={setHotelDetailsFacilities}
                  />
                ))}
              </div>
              {mapShown && mapCenter !== null && <Map center={mapCenter} />}
            </div>
          )}
        </div>
        {!detailsShown && (
          <HotelFilter
            baseFilters={propertyList.base_filters}
            recommendedFilters={propertyList.recommended_filters}
            setFilterBy={setFilterBy}
          />
        )}
      </div>
    </div>
  );
};

export default HotelSearchResults;
