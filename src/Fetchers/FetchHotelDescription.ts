import axios from "axios";
import { HotelDescription } from "../Types/HotelDescription";

export const fetchHotelDescription = (
  hotel_id: string
): Promise<HotelDescription[]> => {
  const options = {
    method: "GET",
    url: "https://apidojo-booking-v1.p.rapidapi.com/properties/get-description",
    params: { hotel_ids: hotel_id, languagecode: "en-us" },
    headers: {
      "X-RapidAPI-Key": "c890ab4a16msh7c633ea6110821ap1e3f64jsn0ed6b1319c46",
      "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
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
