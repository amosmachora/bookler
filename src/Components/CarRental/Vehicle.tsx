import React from "react";
import { VehicleInformation } from "../../Types/CarRentals";

const Vehicle = ({ vehicle }: { vehicle: VehicleInformation }) => {
  console.log(vehicle);

  return (
    <div className="bg-white rounded-md overflow-hidden my-1 flex">
      <img src={vehicle.vehicleInfo.images.SIZE268X144} alt="Car" />
      <div>
        <p>{vehicle.vehicleInfo.vehicleExample}</p>
        <p>{vehicle.vehicleInfo.description}</p>
        <p>
          {
            vehicle.rates[vehicle.transactionCurrencyCode]
              .totalAllInclusivePrice
          }
        </p>
        <p>{vehicle.partnerInfo.gdsName}</p>
        <p>{vehicle.vehicleInfo.peopleCapacity + " seat"}</p>
        <p>{vehicle.vehicleInfo.vehicleClassCode}</p>
        {vehicle.vehicleInfo.automatic ? <p>Automatic</p> : <p>Manual</p>}
      </div>
    </div>
  );
};

export default Vehicle;
