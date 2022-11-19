import React, { useContext, useEffect, useState } from "react";
import { HotelSearchContext } from "../../App";
import { fetchHotelData } from "../../Fetchers/FetchHotelData";
import { getDateFromIsoString } from "../../Util/Helpers";
import { Hotel } from "./HotelSearchResults";

const HotelData = ({ hotel }: { hotel: Hotel }) => {
  const [hotelData, setHotelData] = useState(null);
  const { checkInDate, checkOutDate } = useContext(HotelSearchContext);

  useEffect(() => {
    fetchHotelData(
      hotel.destinationId,
      getDateFromIsoString(checkInDate),
      getDateFromIsoString(checkOutDate)
    ).then((res) => setHotelData(res));
  }, []);

  return <div>{hotel.name}</div>;
};

export default HotelData;
