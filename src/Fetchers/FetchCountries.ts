import axios from "axios";

type Countries = {
  name: string;
};

export const fetchCountries = async (): Promise<Countries> => {
  const options = {
    method: "GET",
    url: "https://countries-cities.p.rapidapi.com/location/country/list",
    headers: {
      "X-RapidAPI-Key": "6445ce28c1msh4b2afb9dc1a38bbp17a68bjsn97511bcb4bbf",
      "X-RapidAPI-Host": "countries-cities.p.rapidapi.com",
    },
  };

  const res = await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });

  return res;
};
