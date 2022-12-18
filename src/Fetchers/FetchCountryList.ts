import axios from "axios";
import { Country } from "../Types/Flights";

export const fetchCountryList = async (): Promise<Country[]> => {
  const options = {
    method: "GET",
    url: "https://country-info.p.rapidapi.com/",
    headers: {
      "X-RapidAPI-Key": "c890ab4a16msh7c633ea6110821ap1e3f64jsn0ed6b1319c46",
      "X-RapidAPI-Host": "country-info.p.rapidapi.com",
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
