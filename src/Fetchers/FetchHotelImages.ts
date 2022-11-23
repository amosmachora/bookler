import axios from "axios";

export const fetchHotelImages = async (hotel_id: number) => {
  const options = {
    method: "GET",
    url: "https://apidojo-booking-v1.p.rapidapi.com/properties/get-hotel-photos",
    params: { hotel_ids: hotel_id.toString(), languagecode: "en-us" },
    headers: {
      "X-RapidAPI-Key": "6445ce28c1msh4b2afb9dc1a38bbp17a68bjsn97511bcb4bbf",
      "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
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
