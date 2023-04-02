import React from 'react';
import { useCarRentalDataContext } from '../../Hooks/useCarRentalData';

const TimePicker = ({
  name,
  type,
}: {
  name: string;
  type: 'pick-up-time' | 'drop-off-time';
}) => {
  const { setUserCarRentalChoices } = useCarRentalDataContext();
  return (
    <div className="rounded-md bg-gray-100 w-[32%] px-4 py-2">
      <p className="text-gray-300 ml-1 text-sm">{name}</p>
      <input
        className="font-bold mb-1 bg-gray-100"
        type="time"
        onChange={(e) => {
          setUserCarRentalChoices((prev) => {
            return {
              dropOffDate: prev!.dropOffDate,
              dropOffLocation: prev!.dropOffLocation,
              dropOffTime:
                type === 'drop-off-time' ? e.target.value : prev!.dropOffTime,
              pickUpTime:
                type === 'pick-up-time' ? e.target.value : prev!.pickUpTime,
              pickUpDate: prev!.pickUpDate,
              pickUpLocation: prev!.pickUpLocation,
            };
          });
        }}
      />
    </div>
  );
};

export default TimePicker;
