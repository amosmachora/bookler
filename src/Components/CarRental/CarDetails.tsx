import React, { useContext } from "react";
import { Assets } from "../../Assets/Assets";
import {
  Airport,
  Images,
  PartnerLocation,
  VehicleInformation,
} from "../../Types/CarRentals";
import Map from "../Hotel/Map";
import { PayNowButton } from "../PayNowButton";
import {
  CarRentalSearchResultsContext,
  getPartnerLocation,
} from "./CarRentalSearchResultsProvider";
import { useUserCarRentalData } from "./useUserCarRentalData";

const CarDetails = () => {
  const { activeVehicle, carRentalData } = useContext(
    CarRentalSearchResultsContext
  );

  const image: string = getLargestPossibleImage(
    activeVehicle?.vehicleInfo.images
  );
  const partnerLocation: PartnerLocation = getPartnerLocation(
    carRentalData.partnerLocations,
    activeVehicle?.partnerCode
  );
  const pickUpLocation: Airport =
    carRentalData.airports[
      activeVehicle!.partnerInfo.pickupLocationId.substring(3)
    ];
  const dropOffLocation: Airport =
    carRentalData.airports[
      activeVehicle!.partnerInfo.returnLocationId.substring(3)
    ];

  const { dropCarAtDifferentLocation } = useUserCarRentalData();
  const trueKeys: string[] = getTrueKeys(activeVehicle);

  return (
    <div className="mt-4">
      <div className="flex px-5 bg-flightResultsBg py-2 rounded-sm mb-1 items-center justify-between">
        <p className="font-bold">Car Details</p>
        <p className="rounded-full py-1 mx-3 px-3 cursor-pointer transition-all bg-blue-900 text-white text-sm">
          Info and price
        </p>
      </div>
      <div className="flex bg-white rounded-md overflow-hidden justify-between py-3 px-5">
        <img src={image} alt="car" />
        <div className="ml-2 w-1/2">
          <p className="text-3xl font-bold">
            {activeVehicle?.vehicleInfo.vehicleExample}
          </p>
          <p className="text-sm">{pickUpLocation.displayName}</p>
          <div className="bg-blue-900 rounded-sm flex items-center text-white px-1 w-max text-sm py-1 my-2">
            <p>{activeVehicle?.vehicleInfo.vehicleClassRank}</p>
            <img src={Assets.Star} alt="Car" className="ml-2" />
          </div>
          <p className="font-bold text-base mt-4">Popular service</p>
          <div className="flex text-xs text-gray-400 my-1">
            {activeVehicle!.vehicleInfo.automatic ? (
              <p>Automatic</p>
            ) : (
              <p>Manual</p>
            )}
            <div className="flex">
              <img src={Assets.Class} alt="Class" className="mr-1 ml-3" />
              <p>{activeVehicle!.vehicleInfo.peopleCapacity + " seat"}</p>
            </div>
            {activeVehicle!.vehicleInfo.airConditioning && (
              <>
                <img src={Assets.AC} alt="AC" className="mr-1 ml-3" />
                <p>AC</p>
              </>
            )}
          </div>
          <div className="h-[1px] bg-gray-400 my-5" />
          <div className="flex">
            {trueKeys.map((key) => (
              <>
                <input type="checkbox" className="mr-2 h-4 w-4" checked />
                <p className="text-xs font-semibold mr-5">{key}</p>
              </>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-3xl font-bold mb-2">
            {
              activeVehicle?.rates[activeVehicle.posCurrencyCode]
                .totalAllInclusivePrice
            }
            <span className="text-gray-400 font-normal uppercase text-xs">
              {activeVehicle?.posCurrencyCode}
            </span>
          </p>
          <PayNowButton linkTo="booking-review" />
        </div>
      </div>
      <div className="flex bg-white py-3 px-5 rounded-md justify-between mt-4">
        <div>
          <p className="font-bold text-2xl">Supplier Location</p>
          <div className="flex my-6">
            <img src={Assets.PickUpLocation} alt="pick up" />
            <div className="ml-4">
              <p className="font-semibold text-base">Pick Up & Drop Off</p>
              <p className="text-xs font-normal text-gray-400">
                {dropCarAtDifferentLocation && "Pick Up: "}
                {pickUpLocation.fullDisplayName + ", " + pickUpLocation.city}
              </p>
              {dropCarAtDifferentLocation && (
                <p className="text-xs font-normal text-gray-400">
                  Drop Off:{" "}
                  {dropOffLocation.displayName + ", " + dropOffLocation.city}
                </p>
              )}
            </div>
          </div>
          <div className="flex">
            <img src={Assets.OpeningHours} alt="Opening hours" />
            <div className="ml-4">
              <p className="font-semibold text-base">Address</p>
              <p className="text-xs font-normal text-gray-400">
                {partnerLocation.address.addressLine1 +
                  ", " +
                  partnerLocation.address.cityName +
                  ", " +
                  partnerLocation.address.countryName}
              </p>
            </div>
          </div>
        </div>
        <Map
          center={{
            lat: partnerLocation.latitude!,
            lng: partnerLocation.longitude!,
          }}
          width="w-[30%]"
        />
      </div>
    </div>
  );
};

export default CarDetails;

const getLargestPossibleImage = (images: Images | undefined): string => {
  if (images?.SIZE536X288 !== undefined) {
    return images.SIZE536X288;
  } else if (images?.SIZE335X180 !== undefined) {
    return images.SIZE335X180;
  } else {
    return images!.SIZE268X144;
  }
};

const getTrueKeys = (activeVehicle: VehicleInformation | null): string[] => {
  const keys: string[] = Object.keys(activeVehicle!);
  const myArray: string[] = [];
  keys.forEach((key) => {
    const currentValue = activeVehicle![key];
    if (typeof currentValue === "boolean" && currentValue === true) {
      myArray.push(getNormalCaseString(key));
    }
  });

  return myArray;
};

const getNormalCaseString = (key: string): string => {
  const normalCaseString = key.replace(
    /[A-Z]/g,
    (match) => ` ${match.toLowerCase()}`
  );

  return normalCaseString.charAt(0).toUpperCase() + normalCaseString.slice(1);
};
