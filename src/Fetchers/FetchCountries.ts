import axios from "axios";
import { Country } from "../Types/Flights";

export const fetchCountries = async (): Promise<Country[]> => {
  const options = {
    method: "GET",
    url: "https://restcountries.com/v3.1/all",
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw new Error();
  }
};
