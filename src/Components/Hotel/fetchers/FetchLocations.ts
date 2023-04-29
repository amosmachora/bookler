import axios from 'axios';
import DevLocations from '../../../Util/Locations.json';

export type SuggestedLocations = {
  b_max_los_data: {
    has_extended_los: number;
    is_fullon: number;
    experiment: string;
    default_los: number;
    extended_los: number;
    max_allowed_los: number;
  };
  type: string;
  name: string;
  timezone: string;
  hotels: number;
  cc1: string;
  rtl: number;
  lc: string;
  label: string;
  longitude: number;
  latitude: number;
  city_ufi: null;
  dest_type: string;
  region: string;
  dest_id: string;
  image_url: string;
  nr_hotels: number;
  country: string;
  city_name: string;
};

/**
 * List of suggested locations by countries, cities, districts, places name.
 * @param Location A location string.
 */
export const fetchSuggestedLocations = async (
  Location: string
): Promise<SuggestedLocations[]> => {
  const options = {
    method: 'GET',
    // url: 'https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete',
    url: 'https://fakeurl',
    params: { text: Location, languagecode: 'en-us' },
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
      return DevLocations;
    });
};
