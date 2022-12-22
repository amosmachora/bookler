import axios from "axios";
import { PickUpOrDropOffLocations } from "../Types/CarRentals";

/***
 * Returns all pickup locations on the target city name.
 * @Param city
 */
export const fetchPickUpOrDropOffLocations = async (
  city: string
): Promise<PickUpOrDropOffLocations> => {
  const options = {
    method: "GET",
    url: "https://priceline-com-provider.p.rapidapi.com/v1/cars-rentals/locations",
    params: { name: "London" },
    headers: {
      "X-RapidAPI-Key": "c890ab4a16msh7c633ea6110821ap1e3f64jsn0ed6b1319c46",
      "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
};
