import axios from "axios";
import { Airport } from "../Types/Flights";
import DevAirports from "../Util/Airports.json";

export const fetchAirports = async (): Promise<Airport[]> => {
  const options = {
    method: "GET",
    url: "https://flight-radar1.p.rapidapi.com/airports/list",
    headers: {
      "X-RapidAPI-Key": "6445ce28c1msh4b2afb9dc1a38bbp17a68bjsn97511bcb4bbf",
      "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
    },
  };

  return await axios
    .request(options)
    .then(function (response) {
      return response.data.rows;
    })
    .catch(function (error) {
      console.error(error);
      return DevAirports.rows;
    });
};
