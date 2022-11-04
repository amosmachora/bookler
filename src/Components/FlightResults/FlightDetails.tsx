import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../App";
import { Departures, SingleFlightData } from "../../Types/Flights";
import { FlightTimes } from "./FoundFlight";
import axios from "axios";
import { Assets } from "../../Assets/Assets";

type FlightDetailsProps = {
  extraFlightData: SingleFlightData | undefined;
  foundFlight: Departures;
};

const FlightDetails = ({
  extraFlightData,
  foundFlight,
}: FlightDetailsProps) => {
  // const aircraftImages = extraFlightData?.result.response.aircraftImages;
  // const randomIndex = Math.floor(Math.random() * 5);
  //   console.log("Extra flight data 👇👇👇👇");
  //   console.log(extraFlightData?.result.response.data);
  //   console.log("Found Flight 👇👇👇👇");
  //   console.log(foundFlight);
  const { toAirport, fromAirport } = useContext(SearchContext);
  const [details, setDetails] = useState(true);
  const [aircraftImage, setAircraftImage] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAircraftImage = async (): Promise<string> => {
      setLoading(true);
      const options = {
        method: "GET",
        url: `https://aerodatabox.p.rapidapi.com/aircrafts/reg/${foundFlight.aircraft.reg}/image/beta`,
        headers: {
          "X-RapidAPI-Key":
            "6445ce28c1msh4b2afb9dc1a38bbp17a68bjsn97511bcb4bbf",
          "X-RapidAPI-Host": "aerodatabox.p.rapidapi.com",
        },
      };

      const imageUrlPromise = await axios
        .request(options)
        .then(function (response) {
          return response.data.url;
        })
        .catch(function (error) {
          console.error(error);
        });

      setLoading(false);

      return imageUrlPromise;
    };

    getAircraftImage().then((url) => setAircraftImage(url));
  }, []);

  console.log(foundFlight);

  return (
    <div className="transition-all">
      <div>
        <button
          onClick={() => setDetails(true)}
          className={`uppercase ${
            details
              ? "text-detailsText border border-b-detailsText"
              : `text-gray-700`
          } font-semibold text-sm px-4 py-2 mr-5`}
        >
          Details
        </button>
        <button
          onClick={() => setDetails(false)}
          className={`uppercase  ${
            details
              ? "text-gray-700"
              : `text-detailsText border-b-detailsText border`
          } font-semibold text-sm px-4 py-2`}
        >
          Fares
        </button>
      </div>
      <div className="p-5 bg-white">
        {details ? (
          <div className="flex items-center">
            <img
              src={loading ? Assets.loadingImage : aircraftImage}
              alt="Aircraft"
              className={`rounded-md w-24 h-12`}
            />
            <p className="text-sm font-semibold mx-4">{foundFlight.number}</p>
            <FlightTimes
              foundFlight={foundFlight}
              fromAirport={fromAirport}
              toAirport={toAirport}
              showLocations={true}
            />
          </div>
        ) : null}
        <div className="mt-7 flex items-center justify-between">
          <p className="uppercase font-bold text-sm">
            {foundFlight.airline.name}
          </p>
          <div className="bg-gray-300 w-10/12 h-[1px]" />
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
