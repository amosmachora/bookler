import axios from 'axios';
import { Facility } from '../Types/Hotel';
import DevFacilities from '../Util/Facilities.json';

/**
 * @param hotel_id hotel_id of the hotel whose facilities you want to get.
 * @returns Facilities[]
 */
export const fetchHotelFacilities = async (
  hotel_id: string
): Promise<Facility[]> => {
  const options = {
    method: 'GET',
    // url: "https://apidojo-booking-v1.p.rapidapi.com/properties/get-facilities",
    url: 'https://invalid-url',
    params: { hotel_ids: hotel_id, languagecode: 'en-us' },
    headers: {
      'X-RapidAPI-Key': 'c890ab4a16msh7c633ea6110821ap1e3f64jsn0ed6b1319c46',
      'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
    },
  };

  return await axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
      return DevFacilities;
    });
};
