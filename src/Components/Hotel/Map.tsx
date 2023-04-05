import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { GoogleMapsCenter } from '../../Types/Hotel';

const Map = ({
  center,
  width,
}: {
  center: GoogleMapsCenter;
  width: string;
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  });

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className={`${width} rounded-md`}>
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
