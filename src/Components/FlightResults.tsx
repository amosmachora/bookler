import React, { useState, useContext, useEffect } from "react";
import { Airport, SearchContext } from "../App";
import DevAirportData from "../Util/AirportFlightData.json";
import axios from "axios";
import AirlineLogos from "../Util/AirLineLogos.json";
import Airlines from "../Util/Airlines.json";

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
type departure2 = {
  actualTimeLocal?: string | undefined;
  actualTimeUtc?: string;
  checkInDesk?: string | undefined;
  gate?: string | undefined;
  quality: Array<string>;
  scheduledTimeLocal?: string;
  scheduledTimeUtc?: string;
  terminal?: string | undefined;
};

type arrival2 = {
  airport: airportMin;
  quality: Array<string>;
};

type Departures = {
  aircraft: aircraft;
  airline: airline;
  arrival: arrival2;
  departure: departure2;
  isCargo: boolean;
  number: string;
  status: string;
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
  const [foundFlights, setFoundFlights] = useState<Departures[]>();
  const [sortBy, setSortBy] = useState("cheapest");

  useEffect(() => {
    if (!devMode) {
      fetchAirportFlightData(fromAirport);
    }
    setFoundFlights(
      outGoingFlights.filter(
        (outGoingFlight) =>
          outGoingFlight.arrival.airport.icao === toAirport.icao
      )
    );
  }, []);

  return (
    <div className="mt-5">
      <div className="flex justify-between px-5 py-3 items-center rounded-lg bg-flightResultsBg">
        <div className="flex items-center">
          <p className="font-bold inline text-xl">Flights</p>
          <div className="h-[14px] w-[1px] mx-3 my-auto bg-gray-400" />
          <p className="text-sm">
            Total{" "}
            <span className="text-blue-400">
              {foundFlights?.length} results
            </span>
          </p>
        </div>
        <div className="flex text-xs items-center">
          <p
            className={`${
              sortBy === "cheapest"
                ? "bg-blueBgMainSm text-white px-3 py-2 rounded-full transition-all"
                : ""
            } cursor-pointer`}
            onClick={() => setSortBy("cheapest")}
          >
            Cheapest
          </p>
          <p
            className={`${
              sortBy === "best"
                ? "bg-blueBgMainSm text-white px-3 py-2 rounded-full transition-all"
                : ""
            } mx-8 cursor-pointer`}
            onClick={() => setSortBy("best")}
          >
            Best
          </p>
          <p
            className={`${
              sortBy === "quickest"
                ? "bg-blueBgMainSm text-white px-3 py-2 rounded-full transition-all"
                : ""
            } cursor-pointer`}
            onClick={() => setSortBy("quickest")}
          >
            Quickest
          </p>
        </div>
      </div>
      <div className="rounded-lg mt-1">
        {foundFlights?.map((foundFlight) => (
          <div
            className="flex justify-between rounded-lg overflow-hidden"
            key={foundFlight.number}
          >
            <div className="bg-white px-2 py-3 w-5/6 mb-[2px]">
              <div className="flex items-center text-[11px]">
                <p>{sortBy}</p>
                <div className="h-[14px] w-[1px] mx-3 my-auto bg-gray-100" />
                <p>
                  Rating: <span className="text-goldRating font-bold">4.5</span>
                </p>
              </div>
              <div className="h-[1px] bg-gray-200" />
              <img src={getLogo(foundFlight.airline.name)} alt="Airline Logo" />
              <p>{foundFlight.airline.name}</p>
            </div>
            <div>Prices</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightResults;

/**
 *
 */
const getLogo: (airlineName: string) => string = (airlineName: string) => {
  /**
   * {name,code,ICAO}
   */
  const airline = Airlines.rows.filter(
    (airline) => airline.Name === airlineName
  );

  const imageUrl = AirlineLogos.result.response.airlines.logotypes.filter(
    (logo) =>
      logo.file.name.includes(airline[0]?.ICAO) ||
      logo.file.name.includes(airline[0]?.Name) ||
      logo.file.name.includes(airline[0]?.Code)
  );
  console.log(AirlineLogos.result.response.airlines.logotypes);

  return imageUrl[0]?.file.url;
};

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

const fetchAirportFlightData = (fromAirport: Airport) => {
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
