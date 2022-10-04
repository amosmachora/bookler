import React, { useState } from "react";
import { Assets } from "../Assets/Assets";
import FromModal from "./FromModal";

type SearchFormProps = {
  setOverlay: (c: boolean) => void;
};

const SearchForm = ({ setOverlay }: SearchFormProps) => {
  const [typeOfTrip, setTypeOfTrip] = useState("one-way");
  const [fromModal, setFromModal] = useState(false);

  const openModal = (name: string) => {
    setOverlay(true);
    if (name === "from-modal") {
      setFromModal(true);
    }
  };
  return (
    <div className="bg-white p-10 rounded-2xl mt-5">
      <form action="">
        <div className="type-of-trip flex [&>*]:rounded-full [&>*]:text-sm [&>*]:py-2 [&>*]:px-6 [&>*]:mr-8 [&>*]:cursor-pointer">
          <p
            className={`${typeOfTrip === "one-way" ? "bg-gray-100" : ""}`}
            onClick={() => setTypeOfTrip("one-way")}
          >
            One way
          </p>
          <p
            className={`${typeOfTrip === "round-trip" ? "bg-gray-100" : ""}`}
            onClick={() => setTypeOfTrip("round-trip")}
          >
            Round Trip
          </p>
          <p
            className={`${typeOfTrip === "multi-city" ? "bg-gray-100" : ""}`}
            onClick={() => setTypeOfTrip("multi-city")}
          >
            Multi City
          </p>
        </div>
        <div className="flex mt-5 [&>*]:bg-gray-100 [&>*]:rounded-lg [&>*]:cursor-pointer [&>*]:border [&>*]:px-4 [&>*]:py-2 justify-between">
          <div
            className="Option w-[32.8%]"
            onClick={() => openModal("from-modal")}
          >
            <div className="flex">
              <img src={Assets.LocationPointer} alt="Location Pointer" />
              <p className="text-gray-400 text-xs ml-1">FROM</p>
            </div>
            <p className="from-location text-base font-bold mb-1">
              Dhaka, Bangladesh
            </p>
            <p className="from-airport text-xs text-gray-400">
              Usmani airport, Sylhet
            </p>
          </div>
          <div className="Option w-[32.8%]">
            <div className="flex">
              <img src={Assets.LocationPointer} alt="Location Pointer" />
              <p className="text-gray-400 text-xs ml-1">TO</p>
            </div>
            <p className="from-location text-base font-bold mb-1">
              Delhi, India
            </p>
            <p className="from-airport text-xs text-gray-400">
              Shuvas chandra bosu airport
            </p>
          </div>
          <div className="Option w-1/4">
            <div className="flex">
              <img src={Assets.Class} alt="Location Pointer" />
              <p className="text-gray-400 text-xs ml-1">CLASS</p>
            </div>
            <p className="from-location text-base font-bold mb-1">3 Persons</p>
            <div className="from-airport text-xs text-gray-400 w-full flex justify-between">
              <p>Business</p>
              <img src={Assets.DropDownGray} alt="Drop down" />
            </div>
          </div>
        </div>
        <div className="flex mt-5 justify-between">
          <div className="w-[25%] bg-gray-100 border py-2 px-4 rounded-lg cursor-pointer">
            <div className="flex justify-between">
              <div className="flex">
                <img src={Assets.Calendar} alt="Calendar" />
                <p className="text-xs ml-1 text-gray-400">Departure</p>
              </div>
              <img src={Assets.DropDownGray} alt="Drop down" />
            </div>
            <p className="font-bold text-base mb-1">21 Aug 2020</p>
            <p className="text-xs text-gray-400">Sunday</p>
          </div>
          <div className="w-[25%] bg-gray-100 border py-2 px-4 rounded-lg cursor-pointer">
            <div className="flex justify-between">
              <div className="flex">
                <img src={Assets.Calendar} alt="Calendar" />
                <p className="text-xs ml-1 text-gray-400">Return</p>
              </div>
              <img src={Assets.DropDownGray} alt="Drop down" />
            </div>
            <p className="font-bold text-base mb-1">29 Aug’20</p>
            <p className="text-xs text-gray-400">Sunday</p>
          </div>
          <div className="w-[14%] bg-gray-100 border py-2 px-4 rounded-lg cursor-pointer">
            <div className="flex justify-between">
              <div className="flex">
                <img src={Assets.Calendar} alt="Calendar" />
                <p className="text-xs ml-1 text-gray-400">Return</p>
              </div>
              <img src={Assets.DropDownGray} alt="Drop down" />
            </div>
            <p className="font-bold text-base mb-1">More</p>
            <div>...</div>
          </div>
          <input
            type="submit"
            value="SEARCH FLIGHT"
            className="bg-red-600 text-white rounded-lg w-[22.4%] cursor-pointer"
          />
        </div>
      </form>
      {fromModal && <FromModal />}
    </div>
  );
};

export default SearchForm;
