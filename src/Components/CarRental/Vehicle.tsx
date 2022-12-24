import React from "react";
import { Assets } from "../../Assets/Assets";
import { VehicleInformation } from "../../Types/CarRentals";
import { Rating } from "../Rating";

const Vehicle = ({
  vehicle,
  setStage,
  setActiveVehicle,
}: {
  vehicle: VehicleInformation;
  setStage: React.Dispatch<React.SetStateAction<string>>;
  setActiveVehicle: React.Dispatch<
    React.SetStateAction<VehicleInformation | null>
  >;
}) => {
  return (
    <div className="bg-white rounded-md overflow-hidden my-1 flex relative py-2 w-full">
      <img src={vehicle.vehicleInfo.images.SIZE268X144} alt="Car" />
      <div className="flex-grow ml-2">
        <p className="text-lg font-bold">
          {vehicle.vehicleInfo.vehicleExample}
        </p>
        <p className="text-xs font-semibold">
          {vehicle.vehicleInfo.description}
        </p>
        <div className="flex text-xs text-gray-400 my-5">
          {vehicle.vehicleInfo.automatic ? <p>Automatic</p> : <p>Manual</p>}
          <div className="flex">
            <img src={Assets.Class} alt="Class" className="mr-1 ml-3" />
            <p>{vehicle.vehicleInfo.peopleCapacity + " seat"}</p>
          </div>
          {vehicle.vehicleInfo.airConditioning && (
            <>
              <img src={Assets.AC} alt="AC" className="mr-1 ml-3" />
              <p>AC</p>
            </>
          )}
        </div>
        <div className="flex justify-between pr-6">
          <p className="font-extrabold text-xl">
            $
            {
              vehicle.rates[vehicle.transactionCurrencyCode]
                .totalAllInclusivePrice
            }
          </p>
          <div className="flex text-xs">
            <button
              className="bg-gray-300 hover:bg-gray-400 px-5 mr-4 rounded-md font-semibold transition-all"
              onClick={() => {
                setStage("Details");
                setActiveVehicle(vehicle);
              }}
            >
              View Details
            </button>
            <button className="bg-blue-600 text-white px-5 hover:bg-blue-400 rounded-md transition-all py-3">
              Book Now
            </button>
          </div>
        </div>
        <Rating
          mapShown={false}
          rating={vehicle.vehicleInfo.vehicleClassCode}
        />
      </div>
    </div>
  );
};

export default Vehicle;
