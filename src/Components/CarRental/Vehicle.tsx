import React from 'react';
import { Link } from 'react-router-dom';
import { Assets } from '../../Assets/Assets';
import { Images, VehicleInformation } from '../../Types/CarRentals';
import { Rating } from '../Rating';
import { useCarRentalSearchResults } from './CarRentalSearchResultsProvider';

const Vehicle = ({ vehicle }: { vehicle: VehicleInformation }) => {
  const { setActiveVehicle } = useCarRentalSearchResults();
  return (
    <div className="bg-white rounded-md overflow-hidden mb-1 flex relative py-2 w-full">
      <img
        src={getLargestPossibleImage(vehicle.vehicleInfo.images)}
        alt="Car"
      />
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
            <p>{vehicle.vehicleInfo.peopleCapacity + ' seat'}</p>
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
          <Link
            className="bg-blue-600 text-xs hover:bg-blue-400 transition-all text-white px-5 py-3 rounded-md font-semibold transition-all"
            onClick={() => {
              setActiveVehicle(vehicle);
            }}
            to="car-details"
          >
            View Details
          </Link>
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

const getLargestPossibleImage = (vehicleImages: Images): string => {
  return vehicleImages.SIZE268X144;
};
