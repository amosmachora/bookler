import React, { useContext, useRef } from "react";
import { Adult, TravelerInfo } from "../../Types/Flights";
import { BookingContext } from "./FlightResults";
import { CountryCodeSelector } from "../Hotel/CountryCodeSelector";
import { MainContext } from "../../App";

type TravelerDetailsProps = {
  travelersInfo: TravelerInfo | null;
  setTravelersInfo: React.Dispatch<React.SetStateAction<TravelerInfo | null>>;
};

const TravelerDetails = ({ setTravelersInfo }: TravelerDetailsProps) => {
  const adultNameInputRef = useRef<HTMLInputElement>(null);
  const { travelersInfo } = useContext(BookingContext);
  const { countryList } = useContext(MainContext);

  const handleAdultNameInput = () => {
    const adult: Adult = {
      name: adultNameInputRef.current?.value,
      category: "Adult",
    };
    if (adultNameInputRef.current != null) adultNameInputRef.current.value = "";
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

  const handleCountrySelection = (currentSelection: string) => {
    setTravelersInfo((prevState) => {
      return {
        ...prevState,
        country: countryList.find(
          (country) => country.code === currentSelection
        ),
      };
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
            if (e.key === "Enter") {
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
      <div className="flex justify-between">
        <CountryCodeSelector handleChange={handleCountrySelection} />
        <div className="w-1/3">
          <p className="font-medium text-sm my-4 mx-2">Mobile</p>
          <input
            type="tel"
            name="tel"
            id="tel"
            className="border bg-gray-100 py-4 px-3 text-xs rounded-md w-full"
            placeholder="+8801 4454 4544"
            onChange={(e) => {
              setTravelersInfo((prevState) => {
                return { ...prevState, mobile: e.target.value };
              });
            }}
          />
        </div>
        <div className="w-1/3">
          <p className="font-medium text-sm my-4 mx-2">Email</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="font-medium text-xs border bg-gray-100 py-4 px-3 rounded-md w-full"
            onChange={(e) =>
              setTravelersInfo((prevState) => {
                return { ...prevState, email: e.target.value };
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default TravelerDetails;
