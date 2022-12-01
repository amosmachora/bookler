import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { GoogleMapsCenter } from "../../Types/Hotel";

const Map = ({ center }: { center: GoogleMapsCenter }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_GOOGLE_MAPS_API_KEY as string,
  });

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="w-[55%] rounded-md">
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="w-full h-full rounded-md"
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default Map;
