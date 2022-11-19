import React, { useContext, useEffect, useState } from "react";
import { HotelSearchContext } from "../../App";
import { fetchHotelData } from "../../Fetchers/FetchHotelData";
import { Hotel } from "./HotelSearchResults";

const HotelData = ({ hotel }: { hotel: Hotel }) => {
  const [hotelData, setHotelData] = useState(null);
  const { checkInDate, checkOutDate } = useContext(HotelSearchContext);

  useEffect(() => {
    fetchHotelData(
      hotel.destinationId,
      checkInDate?.toDateString(),
      checkOutDate?.toDateString()
    ).then((res) => setHotelData(res));
  }, []);

  console.log(hotelData);

  return <div>{hotel.name}</div>;
};

export default HotelData;
