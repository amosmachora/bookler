import axios from "axios";

export const fetchDestinationsByLocations = async (
  location: string
): Promise<any> => {
  const options = {
    method: "GET",
    url: "https://hotels-com-provider.p.rapidapi.com/v1/destinations/search",
    params: {
      query: location.charAt(0).toUpperCase() + location.slice(1).toLowerCase(),
      currency: "USD",
      locale: "en_US",
    },
    headers: {
      "X-RapidAPI-Key": "c890ab4a16msh7c633ea6110821ap1e3f64jsn0ed6b1319c46",
      "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
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
