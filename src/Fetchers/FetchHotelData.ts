import axios from "axios";

export const fetchHotelData = async (
  destinationId: string,
  checkInDate: string | undefined,
  checkOutDate: string | undefined
): Promise<any> => {
  const options = {
    method: "GET",
    url: "https://hotels-com-provider.p.rapidapi.com/v1/hotels/search",
    params: {
      checkin_date: checkInDate,
      checkout_date: checkOutDate,
      sort_order: "STAR_RATING_HIGHEST_FIRST",
      destination_id: destinationId,
      adults_number: "1",
      locale: "en_US",
      currency: "USD",
    },
    headers: {
      "X-RapidAPI-Key": "6445ce28c1msh4b2afb9dc1a38bbp17a68bjsn97511bcb4bbf",
      "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
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
