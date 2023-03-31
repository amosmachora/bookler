import { useEffect, useState } from "react";
import { fetchAirportFlightData } from "../../Fetchers/FetchAirportFlightData";
import { useGlobalData } from "../../Hooks/useGlobalData";
import { useUpdateLogger } from "../../Hooks/useUpdateLogger";
import { Airport, Departures } from "../../Types/Flights";

export const useUserFlightData = () => {
  const [toAirport, setToAirport] = useState<Airport | null>(null);
  const [typeOfTrip, setTypeOfTrip] = useState("one-way");
  const [fromAirport, setFromAirport] = useState<Airport | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [outGoingFlights, setOutGoingFlights] = useState<Departures[]>([]);

  const { setIsLoading } = useGlobalData();

  useEffect(() => {
    if (fromAirport) {
      setIsLoading(true);
      fetchAirportFlightData(fromAirport)
        .then((res) => {
          setOutGoingFlights(res);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromAirport]);

  useUpdateLogger(fromAirport, "fromAirport");

  useUpdateLogger(outGoingFlights, "outGoingFlights");

  return {
    typeOfTrip,
    fromAirport,
    toAirport,
    departureDate,
    returnDate,
    outGoingFlights,
    setToAirport,
    setFromAirport,
    setTypeOfTrip,
    setDepartureDate,
    setReturnDate,
  };
};
