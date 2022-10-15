import React, { useState, useContext, useEffect } from "react";
import { SearchContext } from "../App";
import DevAirportData from "../Util/AirportFlightData.json";
import axios from "axios";

type aircraft = {
  reg?: string | undefined;
  modeS?: string | undefined;
  model: string;
};

type airline = {
  name: string;
};

type airportMin = {
  iata?: string | undefined;
  icao?: string | undefined;
  name: string;
};

type arrival = {
  actualTimeLocal?: string | undefined;
  actualTimeUtc?: string | undefined;
  baggageBelt?: string;
  gate?: string | undefined;
  quality: Array<string>;
  runwayTimeLocal?: string | undefined;
  scheduledTimeLocal?: string;
  scheduledTimeUtc?: string;
  terminal?: string | undefined;
};

type departure = {
  airport: airportMin;
  quality: Array<string>;
  actualTimeLocal?: string;
  actualTimeUtc?: string;
  gate?: string | undefined;
  scheduledTimeLocal?: string;
  scheduledTimeUtc?: string;
  terminal?: string;
};

type Arrival = {
  aircraft: aircraft;
  airline: airline;
  arrival: arrival;
  codeshareStatus: string;
  departure: departure;
  isCargo: boolean;
  number: string;
  status: string;
};

type Departures = {
  //TODO Complete creating departures.
};

const FlightResults = () => {
  const {
    toAirport,
    returnDate,
    departureDate,
    typeOfTrip,
    fromAirport,
    devMode,
  } = useContext(SearchContext);
  const [outGoingFlights, setOutGoingFlights] = useState<Departures[]>(
    DevAirportData.departures
  );
  const [incomingFlights, setAirportArrivals] = useState<Arrival[]>(
    DevAirportData.arrivals
  );

  useEffect(() => {
    if (!devMode) {
      fetchAirportFlightData();
    }
  }, []);

  function getZeroPadded(secondDateHour: number) {
    if (secondDateHour.toString().length != 2) {
      return 0 + secondDateHour.toString();
    }
    return secondDateHour.toString();
  }

  /**
   * A function to get the required search dates
   * @Returns [firstDate, secondDate]
   */
  const getSearchDates = () => {
    const todaysDate = new Date();
    const firstDate = todaysDate.toISOString().substring(0, 16);

    let secondDateHour = 0;
    if (todaysDate.getUTCHours() >= 12) {
      secondDateHour = todaysDate.getUTCHours() + 12 - 24;
    } else {
      secondDateHour = todaysDate.getUTCHours() + 12;
    }
    const secondDate =
      firstDate.substring(0, 11) +
      getZeroPadded(secondDateHour) +
      firstDate.substring(13);

    return [firstDate, secondDate];
  };

  const fetchAirportFlightData = () => {
    console.log("Searching data for " + fromAirport.name);

    const options = {
      method: "GET",
      url: `https://aerodatabox.p.rapidapi.com/flights/airports/icao/${
        fromAirport.icao
      }/${getSearchDates()[0]}/${getSearchDates()[1]}`,
      params: {
        withLeg: "true",
        withCancelled: "true",
        withCodeshared: "true",
        withCargo: "true",
        withPrivate: "true",
        withLocation: "false",
      },
      headers: {
        "X-RapidAPI-Key": "c890ab4a16msh7c633ea6110821ap1e3f64jsn0ed6b1319c46",
        "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  console.log("Departures from " + fromAirport.name + " to " + toAirport.name);
  console.log(
    outGoingFlights.filter(
      (outGoingFlight) => outGoingFlight.arrival.airport.icao === toAirport.icao
    )
  );

  return (
    <div>
      <p>
        to {toAirport.country} from {fromAirport.country}
      </p>
    </div>
  );
};

export default FlightResults;
