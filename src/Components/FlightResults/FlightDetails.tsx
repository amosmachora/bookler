import React, { useState } from "react";
import { SingleFlightData } from "../../Types/Flights";

type FlightDetailsProps = {
  flightData: SingleFlightData | undefined;
};

const FlightDetails = ({ flightData }: FlightDetailsProps) => {
  const aircraftImages = flightData?.result.response.aircraftImages;
  const randomIndex = Math.floor(Math.random() * 5);
  const [details, setDetails] = useState(true);

  return (
    <div className="transition-all">
      <div>
        <button
          onClick={() => setDetails(true)}
          className={`uppercase ${
            details
              ? "text-detailsText border border-b-detailsText"
              : `text-gray-700`
          } font-semibold text-sm px-2 py-3 mr-5`}
        >
          Details
        </button>
        <button
          onClick={() => setDetails(false)}
          className={`uppercase  ${
            details
              ? "text-gray-700"
              : `text-detailsText border-b-detailsText border`
          } font-semibold text-sm px-2 py-3`}
        >
          Fares
        </button>
      </div>
      <div className="p-5 bg-white">
        {details ? (
          <img
            src={
              aircraftImages?.at(randomIndex)?.images.thumbnails[randomIndex]
                .src
            }
            alt="Aircraft"
            className="rounded-md w-24 h-12"
          />
        ) : null}
      </div>
    </div>
  );
};

export default FlightDetails;
