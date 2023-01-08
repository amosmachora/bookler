import axios from "axios";
import { SingleFlightData } from "../Types/Flights";
import DevExtraFlightData from "../Util/DevExtraFlightData.json";

export const fetchExtraFlightData = async (
  flightNumber: string
): Promise<SingleFlightData> => {
  const options = {
    method: "GET",
    url: "https://flight-radar1.p.rapidapi.com/flights/get-more-info",
    params: { query: flightNumber, fetchBy: "flight", page: "1", limit: "100" },
    headers: {
      "X-RapidAPI-Key": "6445ce28c1msh4b2afb9dc1a38bbp17a68bjsn97511bcb4bbf",
      "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
    },
  };
  return await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
      return DevExtraFlightData;
    });
};
