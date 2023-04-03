import React, { useContext, useRef } from 'react';
import { Adult } from '../../Types/Flights';
import { BookingContext } from './FlightResults';

const TravelerDetails = () => {
  const { setTravelersInfo } = useContext(BookingContext);
  const adultNameInputRef = useRef<HTMLInputElement>(null);
  const { travelersInfo } = useContext(BookingContext);

  const handleAdultNameInput = () => {
    const adult: Adult = {
      name: adultNameInputRef.current?.value,
      category: 'Adult',
    };
    if (adultNameInputRef.current != null) adultNameInputRef.current.value = '';
    setTravelersInfo((prevState) => {
      return {
        ...prevState,
        adultList: [...(prevState?.adultList ?? []), adult],
      };
    });
  };

  const removePerson = (personToBeRemoved: Adult): void => {
    setTravelersInfo((prevState) => {
      const newAdultList = prevState?.adultList?.filter(
        (adult) => adult.name !== personToBeRemoved.name
      );
      return { ...prevState, adultList: newAdultList };
    });
  };

  return (
    <div className="py-7 px-9 bg-white mb-9 grid rounded-lg">
      <p className="font-bold text-lg">Traveler Details</p>
      <div className="flex w-full relative">
        <input
          type="text"
          placeholder="Adult"
          className="w-full border h-12 rounded-md py-2 px-5 text-sm bg-gray-100"
          ref={adultNameInputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAdultNameInput();
            }
          }}
        />
        <p
          className="text-blue-700 absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          onClick={() => handleAdultNameInput()}
        >
          + Add
        </p>
      </div>
      <div className="p-4">
        {travelersInfo?.adultList?.map((adult) => (
          <div className="flex" key={adult.name}>
            <p className="w-full">{adult.name}</p>
            <p
              className="text-blue-700 cursor-pointer"
              onClick={() => removePerson(adult)}
            >
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelerDetails;
