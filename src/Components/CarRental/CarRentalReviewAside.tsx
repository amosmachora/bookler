import React from 'react';
import { Assets } from '../../Assets/Assets';
import { CarRentalData, VehicleInformation } from '../../Types/CarRentals';
import { getPartnerLocation } from './CarRentalSearchResultsProvider';

export const CarRentalReviewSummary = ({
  selectedVehicle,
  carRentalData,
}: {
  selectedVehicle: VehicleInformation | null;
  carRentalData: CarRentalData;
}) => {
  const partnerLocation = getPartnerLocation(
    carRentalData.partnerLocations,
    selectedVehicle?.partnerCode
  );

  return (
    <div className="overflow-hidden w-1/4 rounded-md bg-white">
      <p className="font-bold text-lg bg-flightResultsBg py-2 px-5">
        Fare Summary
      </p>
      <img src={selectedVehicle?.vehicleInfo.images.SIZE268X144} alt="Car" />
      <div className="p-5">
        <p className="font-semibold">
          {selectedVehicle?.vehicleInfo.vehicleExample}
        </p>
        <div className="flex">
          <img src={Assets.LocationPointerBlue} alt="LocationPointerBlue" />
          <p className="text-xs ml-2">
            {partnerLocation.address.addressLine1 +
              ', ' +
              partnerLocation.address.cityName +
              ', ' +
              partnerLocation.address.countryName}
          </p>
        </div>
        <p className="text-sm mt-7 mb-5">Base Fare</p>
        <p className="py-2 rounded-md text-right px-3 font-bold border text-sm">
          $
          {
            selectedVehicle?.rates[selectedVehicle.posCurrencyCode]
              .totalAllInclusivePrice
          }
        </p>
        <p className="text-sm mt-7 mb-5">Others</p>
        <div className="flex justify-between py-2 rounded-md px-3 border">
          <p className="text-xs text-gray-400  font-normal items-center">
            Others service
          </p>
          <p className="font-bold text-sm">$30</p>
        </div>
        <p className="text-3xl font-bold mt-7 text-right">
          {parseFloat(
            selectedVehicle!.rates[selectedVehicle!.posCurrencyCode]
              .totalAllInclusivePrice
          ) + 30}
          <span className="text-xs font-normal text-gray-400 ml-2">
            {selectedVehicle?.posCurrencyCode}
          </span>
        </p>
      </div>
    </div>
  );
};
