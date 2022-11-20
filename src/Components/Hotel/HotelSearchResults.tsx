import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../App";
import { fetchDestinationsByLocations } from "../../Fetchers/FetchDestinationsByLocation";
import { Airport } from "../../Types/Flights";
import DestinationData from "../../Util/DestinationData.json";
import HotelData from "./HotelData";
import HotelSearchParameters from "./HotelSearchParameters";

type HotelSearchResultsProps = {
  toAirport: Airport;
};

export type Hotel = {
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

  console.log(hotelList);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <HotelSearchParameters toAirport={toAirport} />
      {hotelList.map((hotel) => {
        return <HotelData hotel={hotel} key={hotel.name} />;
      })}
    </div>
  );
};

export default HotelSearchResults;
