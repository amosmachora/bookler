import axios from 'axios';
import { HotelReviews } from '../../../Types/HotelReviews';
import DevHotelReviews from '../../../Util/HotelReviews.json';

export const fetchHotelReviews = (hotel_id: string): Promise<HotelReviews> => {
  const options = {
    method: 'GET',
    url: 'https://apidojo-booking-v1.p.rapidapi.com/reviews/list',
    params: {
      hotel_ids: hotel_id,
      languagecode: 'en-us',
      user_sort: 'sortscoredesc',
      rows: '5',
      offset: '0',
      filter_language: 'en,nl',
      filter_customer_type: 'couple,family_with_children',
    },
    headers: {
      'X-RapidAPI-Key': 'c890ab4a16msh7c633ea6110821ap1e3f64jsn0ed6b1319c46',
      'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
      return DevHotelReviews;
    });
};
