import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchPropertyListByDestId } from "../../Fetchers/FetchPropertyListByDestId";
import { cleaned, getDateFromIsoString } from "../../Util/Helpers";
import HotelSearchParameters from "./HotelSearchParameters";
import { fetchSuggestedLocations } from "../../Fetchers/FetchLocations";
import { PropertyListType } from "../../Types/PropertyList";
import { HotelInfo, SelectedHotel } from "../../Types/Hotel";
import { HotelSearchContext } from "./HotelProvider";
import { MainContext } from "../Contexts/MainAppProvider";
import { Outlet } from "react-router";

export const HotelSearchResultsContext = createContext<{
  hotelList: HotelInfo[];
  selectedHotelInfo: SelectedHotel | null;
  propertyList: PropertyListType;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setFilterBy: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedHotelInfo: React.Dispatch<
    React.SetStateAction<SelectedHotel | null>
  >;
}>(null as any);

const HotelSearchResults = () => {
  const { devMode } = useContext(MainContext);
  const {
    checkInDate,
    checkOutDate,
    travellerHotelInfo,
    targetHotelLocation,
    travelingForWorkCheckBox,
  } = useContext(HotelSearchContext);

  const [propertyList, setPropertyList] = useState<PropertyListType>({} as any);
  const [hotelList, setHotelList] = useState<HotelInfo[]>(propertyList.result);
  const [sortBy, setSortBy] = useState<string>(
    propertyList.sorting.selected_identifier
  );
  const [filterBy, setFilterBy] = useState<Array<string>>([]);
  const { setMenuWide, setIsLoading } = useContext(MainContext);

  useEffect(() => {
    setMenuWide(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!devMode) {
      setIsLoading(true);
      fetchSuggestedLocations(targetHotelLocation?.city!).then((res) => {
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
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devMode, sortBy, filterBy]);

  useEffect(() => {
    setHotelList(propertyList.result);
  }, [propertyList]);

  const [selectedHotelInfo, setSelectedHotelInfo] =
    useState<SelectedHotel | null>(null);

  return (
    <HotelSearchResultsContext.Provider
      value={{
        hotelList,
        setFilterBy,
        setSelectedHotelInfo,
        setSortBy,
        selectedHotelInfo,
        propertyList,
        sortBy,
      }}
    >
      <HotelSearchParameters />
      <Outlet />
    </HotelSearchResultsContext.Provider>
  );
};

export default HotelSearchResults;
