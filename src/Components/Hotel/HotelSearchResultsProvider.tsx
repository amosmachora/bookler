import React, { createContext, useEffect, useState } from 'react';
import { fetchPropertyListByDestId } from '../../Fetchers/FetchPropertyListByDestId';
import { cleaned, getDateFromIsoString } from '../../Util/Helpers';
import HotelSearchParameters from './HotelSearchParameters';
import { fetchSuggestedLocations } from '../../Fetchers/FetchLocations';
import { PropertyListType } from '../../Types/PropertyList';
import { SelectedHotel } from '../../Types/Hotel';
import { useGlobalData } from '../../Hooks/useGlobalData';
import { Outlet } from 'react-router';
import { useUpdateLogger } from '../../Hooks/useUpdateLogger';
import { useHotelDataContext } from '../../Hooks/useHotelData';

export const HotelSearchResultsContext = createContext<{
  selectedHotelInfo: SelectedHotel | null;
  propertyList: PropertyListType | null;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setFilterBy: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedHotelInfo: React.Dispatch<
    React.SetStateAction<SelectedHotel | null>
  >;
}>(null as any);

export const HotelSearchResults = () => {
  const { userHotelChoices, travelingForWorkCheckBox } = useHotelDataContext();
  const { checkInDate, checkOutDate, travellerHotelInfo, targetHotelLocation } =
    userHotelChoices;
  const { setIsLoading, setMenuWide } = useGlobalData();
  const [propertyList, setPropertyList] = useState<PropertyListType | null>(
    null
  );
  const [sortBy, setSortBy] = useState<string>('');
  const [filterBy, setFilterBy] = useState<Array<string>>([]);

  useEffect(() => {
    setMenuWide(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useUpdateLogger(propertyList, 'PropertyList');

  const fetchHotelInfo = async () => {
    setIsLoading(true);
    const suggestedLocations = await fetchSuggestedLocations(
      targetHotelLocation?.city!
    );
    const cityLocation = suggestedLocations.filter(
      (res) => res.dest_type === 'city'
    );
    const propertyListByDestId = await fetchPropertyListByDestId(
      getDateFromIsoString(checkInDate),
      getDateFromIsoString(checkOutDate),
      travellerHotelInfo.adults.toString(),
      travellerHotelInfo.Rooms.toString(),
      cityLocation[0].dest_id,
      travellerHotelInfo.kids.toString(),
      travelingForWorkCheckBox.current?.checked ? 'business' : 'leisure',
      sortBy,
      cleaned(filterBy)
    );
    setPropertyList(propertyListByDestId);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchHotelInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, filterBy]);

  const [selectedHotelInfo, setSelectedHotelInfo] =
    useState<SelectedHotel | null>(null);

  return (
    <HotelSearchResultsContext.Provider
      value={{
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
