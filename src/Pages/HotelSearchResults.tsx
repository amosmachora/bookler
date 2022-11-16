import React, { SetStateAction, useContext, useEffect, useState } from "react";
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
        return <p key={hotel.name}>{hotel.name}</p>;
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
        <CheckInCheckOutDatePicker
          setDateFunction={setCheckInDate}
          date={checkInDate}
        />
      </div>
      <div>
        <p className="text-xs text-gray-300 ml-2">CHECK-OUT</p>
        <CheckInCheckOutDatePicker
          date={checkOutDate}
          setDateFunction={setCheckOutDate}
        />
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

type CheckInCheckOutDatePicker = {
  date: Date | null;
  setDateFunction: React.Dispatch<SetStateAction<Date | null>>;
};

function CheckInCheckOutDatePicker({
  date,
  setDateFunction,
}: CheckInCheckOutDatePicker) {
  return (
    <div className="mt-1 relative">
      <input
        type="date"
        defaultValue={date?.toDateString()}
        onChange={(e) => setDateFunction(e.target.valueAsDate)}
        className="w-full py-2 px-6 rounded-full bg-gray-100 cursor-pointer check-in-or-out-picker"
      />
      <img
        src={Assets.Calendar}
        alt="Calendar"
        className="absolute top-1/2 right-6 -translate-y-1/2"
      />
    </div>
  );
}
