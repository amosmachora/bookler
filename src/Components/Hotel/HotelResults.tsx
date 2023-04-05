import React, { useEffect, useState } from 'react';
import { fetchHotelFacilities } from '../../Fetchers/FetchHotelFacilities';
import { fetchHotelImages } from '../../Fetchers/FetchHotelImages';
import { useUpdateLogger } from '../../Hooks/useUpdateLogger';
import { CompleteHotel, GoogleMapsCenter, HotelInfo } from '../../Types/Hotel';
import LoadingScreen from '../LoadingScreen';
import HotelData from './HotelData';
import HotelFilter from './HotelFilter';
import HotelSearchParameters from './HotelSearchParameters';
import { useHotelSearchResults } from './HotelSearchResultsProvider';
import Map from './Map';

const HotelResults = () => {
  const { propertyList, setSortBy, sortBy } = useHotelSearchResults();
  const [mapCenter, setMapCenter] = useState<GoogleMapsCenter | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [completeHotelsList, setCompleteHotelsList] = useState<
    CompleteHotel[] | null
  >(null);
  const prices: number[] = getPricesArray(completeHotelsList);

  useUpdateLogger(completeHotelsList, 'CompleteHotelsList');

  useEffect(() => {
    if (propertyList) {
      fetchExtraHotelsData(propertyList.result).then((res) => {
        setCompleteHotelsList(res);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <HotelSearchParameters />
      <div className="flex gap-x-2 h-[87vh] mb-8">
        <div className="w-4/5 h-87vh flex flex-col overflow-hidden rounded-b-md">
          <div className="flex px-5 bg-flightResultsBg py-2 rounded-md mb-1 items-center justify-between">
            <p className="font-bold">Hotels</p>
            <div className="h-5 w-[1px] bg-gray-300 mx-3" />
            <p className="text-sm font-semibold">
              Total{' '}
              <span className="text-sky-500 font-normal">
                {propertyList === null ? 0 : propertyList.result.length} results
              </span>
            </p>
            <div className="flex items-center flex-wrap text-xs text-gray-400">
              {propertyList &&
                propertyList.sort.map((sortOption) => (
                  <p
                    className={`rounded-full py-1 mx-1 px-2 cursor-pointer transition-all ${
                      sortOption.id === sortBy ? 'bg-blue-900 text-white' : ''
                    }`}
                    onClick={() => setSortBy(sortOption.id)}
                    key={sortOption.id}
                  >
                    {sortOption.name}
                  </p>
                ))}
              {propertyList &&
                propertyList.applied_filters.map((appliedFilter) => (
                  <p className="text-xs py-1 mx-1 px-2">{appliedFilter.name}</p>
                ))}
            </div>
          </div>
          <div className="flex gap-x-2 flex-grow h-[90%]">
            {completeHotelsList ? (
              <div
                className={`h-full overflow-y-scroll overflow-x-hidden rounded-md transition-all duration-500 w-full ${
                  mapCenter ? 'w-5/12' : ''
                } `}
              >
                {completeHotelsList.map((hotel) => (
                  <HotelData
                    hotelData={hotel}
                    setMapCenter={setMapCenter}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    mapCenter={mapCenter}
                    key={hotel.hotelInfo.hotel_id}
                  />
                ))}
              </div>
            ) : (
              <LoadingScreen />
            )}
            {mapCenter && <Map center={mapCenter} width="w-7/12" />}
          </div>
        </div>
        <HotelFilter
          baseFilters={propertyList === null ? [] : propertyList.base_filters}
          recommendedFilters={
            propertyList === null ? [] : propertyList.recommended_filters
          }
          prices={completeHotelsList ? prices : []}
        />
      </div>
    </div>
  );
};

export default HotelResults;

function fetchExtraHotelsData(
  hotelList: HotelInfo[]
): Promise<CompleteHotel[]> {
  const CompleteHotelArray: CompleteHotel[] = [];
  return new Promise<CompleteHotel[]>((resolve, reject) => {
    hotelList.forEach((hotel, index) => {
      setTimeout(() => {
        fetchHotelImages(parseInt(hotel.hotel_id.toString()))
          .then((hotelImages) => {
            console.log(hotelImages, hotel.hotel_name + '`s images');
            fetchHotelFacilities(hotel.hotel_id.toString()).then((facilities) =>
              CompleteHotelArray.push({
                hotelFacilities: facilities,
                hotelImages: hotelImages,
                hotelInfo: hotel,
              })
            );
          })
          .then(() => {
            if (index === hotelList.length - 1) {
              resolve(CompleteHotelArray);
            }
          })
          .catch((error) => reject(error));
      }, 2000 * index);
    });
  });
}
const getPricesArray = (
  completeHotelsList: CompleteHotel[] | null
): number[] => {
  const pricesArray: number[] =
    completeHotelsList?.map(
      (hotel) => hotel.hotelInfo.price_breakdown.all_inclusive_price
    ) || [];

  return pricesArray;
};
