import React, { useContext, useEffect, useState } from "react";
import { HotelSearchContext, MainContext } from "../App";
import { Assets } from "../Assets/Assets";
import { RedSearchButton } from "../Components/SearchParameters";
import { fetchDestinationsByLocations } from "../Fetchers/FetchDestinationsByLocation";
import { Airport } from "../Types/Flights";
import DestinationData from "../Util/DestinationData.json";

type HotelSearchResultsProps = {
  toAirport: Airport;
};

type Hotel = {
  caption: string;
  destinationId: string;
  geoId: string;
  landmarkCityDestinationId: null | string;
  latitude: number;
  longitude: number;
  name: string;
  redirectPage: string;
  searchDetail: null;
  type: string;
};

const HotelSearchResults = ({ toAirport }: HotelSearchResultsProps) => {
  const { devMode } = useContext(MainContext);
  const [hotelList, setHotelList] = useState<Hotel[]>(
    DestinationData.suggestions.filter(
      (suggestion: { group: string }) => suggestion.group === "HOTEL_GROUP"
    )[0].entities
  );

  useEffect(() => {
    if (!devMode) {
      fetchDestinationsByLocations(toAirport.city).then((res) => {
        setHotelList(
          res.suggestions.filter(
            (suggestion: { group: string }) =>
              suggestion.group === "HOTEL_GROUP"
          )[0].entities
        );
      });
    }
  }, []);
  return (
    <div>
      <HotelSearchParameters toAirport={toAirport} />
      {hotelList.map((hotel) => {
        return <p>{hotel.name}</p>;
      })}
    </div>
  );
};

export default HotelSearchResults;

type HotelSearchParametersProps = {
  toAirport: Airport;
};

function HotelSearchParameters({ toAirport }: HotelSearchParametersProps) {
  const { setCheckInDate, checkInDate, setCheckOutDate, checkOutDate } =
    useContext(HotelSearchContext);
  return (
    <div className="flex justify-between items-center bg-white py-4 px-5 mt-10 rounded-b-lg text-sm">
      <div>
        <p className="text-xs text-gray-300 ml-2">WHERE</p>
        <p className="bg-gray-100 py-2 px-6 rounded-full mt-1">
          {toAirport.city + ", " + toAirport.country}
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-300 ml-2">CHECK-IN</p>
        <div className="flex bg-gray-100 py-2 px-6 rounded-full mt-1 cursor-pointer justify-between">
          {/* <input type="date" defaultValue={checkInDate?.toDateString()} /> */}
          <p>25 Aug’19</p>
          <img src={Assets.Calendar} alt="Calendar" />
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-300 ml-2">CHECK-OUT</p>
        <div className="flex bg-gray-100 py-2 px-6 rounded-full mt-1 cursor-pointer justify-between">
          <p>25 Aug’19</p>
          <img src={Assets.Calendar} alt="Calendar" />
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-300 ml-2">Rooms & Guests</p>
        <p className="flex bg-gray-100 py-2 px-6 rounded-full mt-1">
          1 Room, 3 Adults
        </p>
      </div>
      <RedSearchButton text="Search Hotels" />
    </div>
  );
}
