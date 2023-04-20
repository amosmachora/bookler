import axios from 'axios';
import { CarRentalData } from '../Types/CarRentals';
import DevCarRentals from '../Util/CarRentals.json';

/**
 * @param pickUpLocation String of the format "JFK"
 * @param returnDate return date string of the format "2022-11-16 13:00:00"
 * @param pickUpDate pick up date of the format "2022-11-15 13:00:00"
 * @param returnLocation return location string of the format "JFK"
 * @returns CarRentalSearchResultsType
 */
export const fetchCarRentals = async (
  pickUpLocation: string,
  returnDate: string,
  pickUpDate: string,
  returnLocation: string
): Promise<CarRentalData> => {
  const options = {
    method: 'GET',
    url: 'https://priceline-com-provider.p.rapidapi.com/v1/cars-rentals/search',
    // url: 'https://fake-url',
    params: {
      location_pickup: pickUpLocation,
      date_time_return: returnDate,
      date_time_pickup: pickUpDate,
      location_return: returnLocation,
    },
    headers: {
      'X-RapidAPI-Key': 'c890ab4a16msh7c633ea6110821ap1e3f64jsn0ed6b1319c46',
      'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };

  return await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
      return DevCarRentals;
    });
};
