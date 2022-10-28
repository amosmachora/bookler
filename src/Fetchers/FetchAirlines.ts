import axios from "axios";
import { Airline } from "../Types/Flights";

export const fetchAirlines = (): Airline[] => {
  let airlines: Airline[] = [];
  const options = {
    method: "GET",
    url: "https://flight-radar1.p.rapidapi.com/airlines/list",
    headers: {
      "X-RapidAPI-Key": "39b85f4a1dmshdbcb94e8d46577cp135d67jsnbf6f8c6f5894",
      "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      airlines = response.data.rows;
    })
    .catch(function (error) {
      console.error(error);
    });

  return airlines;
};
