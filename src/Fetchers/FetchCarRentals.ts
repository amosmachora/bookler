import axios from "axios";
import { CarRentalSearchResultsType } from "../Types/CarRentals";

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
): Promise<CarRentalSearchResultsType> => {
  const options = {
    method: "GET",
    url: "https://priceline-com-provider.p.rapidapi.com/v1/cars-rentals/search",
    params: {
      location_pickup: pickUpLocation,
      date_time_return: returnDate,
      date_time_pickup: pickUpDate,
      location_return: returnLocation,
    },
    headers: {
      "X-RapidAPI-Key": "c890ab4a16msh7c633ea6110821ap1e3f64jsn0ed6b1319c46",
      "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
    },
  };

  return await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};
