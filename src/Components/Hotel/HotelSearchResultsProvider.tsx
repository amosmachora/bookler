import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchPropertyListByDestId } from '../../Fetchers/FetchPropertyListByDestId';
import { cleaned, getDateFromIsoString } from '../../Util/Helpers';
import { fetchSuggestedLocations } from '../../Fetchers/FetchLocations';
import { PropertyList } from '../../Types/PropertyList';
import { SelectedHotel } from '../../Types/Hotel';
import { useUpdateLogger } from '../../Hooks/useUpdateLogger';
import { useHotelDataContext } from '../../Hooks/useHotelData';

const HotelSearchResultsContext = createContext<{
  selectedHotelInfo: SelectedHotel | null;
  propertyList: PropertyList | null;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setFilterBy: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedHotelInfo: React.Dispatch<
    React.SetStateAction<SelectedHotel | null>
  >;
}>(null as any);

export const HotelSearchResultsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { userHotelChoices, travelingForWorkCheckBox } = useHotelDataContext();
  const { checkInDate, checkOutDate, travellerHotelInfo, targetHotelLocation } =
    userHotelChoices;
  const [propertyList, setPropertyList] = useState<PropertyList | null>(null);
  const [sortBy, setSortBy] = useState<string>('');
  const [filterBy, setFilterBy] = useState<Array<string>>([]);

  useUpdateLogger(propertyList, 'PropertyList');

  const fetchHotelInfo = async () => {
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
  };

  useEffect(() => {
    fetchHotelInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {children}
    </HotelSearchResultsContext.Provider>
  );
};

export const useHotelSearchResults = () =>
  useContext(HotelSearchResultsContext);
