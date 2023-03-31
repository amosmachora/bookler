import React from "react";
import { getFormattedDate } from "../../Util/Helpers";
import { RedSearchButton } from "../RedSearchButton";
import { useUserCarRentalData } from "./useUserCarRentalData";

const TaxiSearchParameters = () => {
  const {
    pickUpDate,
    pickUpTime,
    dropOffDate,
    dropOffTime,
    dropCarAtDifferentLocation,
  } = useUserCarRentalData();

  //TODO remember to fix location
  const pickUpLocation = "London , United Kingdom";
  const dropOffLocation = "London , United Kingdom";

  return (
    <div className="bg-white rounded-b-lg flex justify-between mt-10 py-4 px-5 items-center">
      <div>
        <p className="text-xs text-gray-400">FROM</p>
        <div className="rounded-full bg-gray-200 text-sm py-1 px-2">
          {pickUpLocation}
        </div>
      </div>
      {dropCarAtDifferentLocation && (
        <div>
          <p className="text-xs text-gray-400">TO</p>
          <p className="rounded-full bg-gray-200 text-sm py-1 px-2">
            {dropOffLocation}
          </p>
        </div>
      )}
      <div>
        <p className="text-xs text-gray-400">PICK UP DATE</p>
        <p className="rounded-full bg-gray-200 text-sm py-1 px-2">
          {getFormattedDate(pickUpDate)}
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-400">PICK UP TIME</p>
        <p className="rounded-full bg-gray-200 text-sm py-1 px-2">
          {pickUpTime}
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-400">DROP OFF DATE</p>
        <p className="rounded-full bg-gray-200 text-sm py-1 px-2">
          {getFormattedDate(dropOffDate)}
        </p>
      </div>
      <div>
        <p className="text-xs text-gray-400">DROP OFF TIME</p>
        <p className="rounded-full bg-gray-200 text-sm py-1 px-2">
          {dropOffTime}
        </p>
      </div>
      <RedSearchButton text="Search Cars" />
    </div>
  );
};

export default TaxiSearchParameters;
