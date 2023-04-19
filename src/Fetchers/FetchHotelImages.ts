import axios from 'axios';
import { DirtyHotelImages, HotelImage, tags } from '../Types/Hotel';
import BackedUpImages from '../Util/HotelImages.json';

/**
 * @JsDoc
 * The fetchHotelImages function is an async function that sends a GET request to the
 *  https://apidojo-booking-v1.p.rapidapi.com/properties/get-hotel-photos endpoint using the axios library.
 *  It takes a single argument, hotel_id, which is a number representing the ID of the hotel for which you want to fetch images.
 *  The function returns a Promise that resolves with an array of HotelImage objects.
 */
export const fetchHotelImages = async (
  hotel_id: number
): Promise<HotelImage[]> => {
  const options = {
    method: 'GET',
    // url: 'https://apidojo-booking-v1.p.rapidapi.com/properties/get-hotel-photos',
    url: 'https://invalid-url',
    params: { hotel_ids: hotel_id.toString(), languagecode: 'en-us' },
    headers: {
      'X-RapidAPI-Key': '6445ce28c1msh4b2afb9dc1a38bbp17a68bjsn97511bcb4bbf',
      'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com',
    },
  };

  try {
    let response: DirtyHotelImages = await axios
      .request(options)
      .then(function (response) {
        return response.data;
      });

    return getCleanedArrayOfImageObjects(response, hotel_id.toString());
  } catch (error) {
    console.error(error);
    return getCleanedArrayOfImageObjects(BackedUpImages, '25924');
  }
};

/**
 *  The getCleanedArrayOfImageObjects function takes a single argument, hotelImages,
 *  which is an object with a structure defined by the DirtyHotelImages type.
 *  It returns an array of HotelImage objects after cleaning up the data from the hotelImages argument and filtering out any objects with an undefined tag_name property.
 *  The getTagName function is used to extract the tag_name from the input data.
 */
export const getCleanedArrayOfImageObjects = (
  hotelImages: DirtyHotelImages,
  hotelId: string
): HotelImage[] => {
  if (!hotelImages || !hotelImages.data || !hotelImages.data[hotelId]) {
    return [];
  }
  return hotelImages.data[hotelId]
    .map((hotelImage) => {
      return {
        tag_name: getTagName(hotelImage[1]),
        img_url_large: hotelImages.url_prefix + hotelImage[4],
        img_url_small: hotelImages.url_prefix + hotelImage[5],
        img_url_medium: hotelImages.url_prefix + hotelImage[6],
        img_url_tiny: hotelImages.url_prefix + hotelImage[7],
      };
    })
    .filter((hotelImage) => hotelImage.tag_name !== undefined);
};

const getTagName = (
  hotelImage: string | number | tags[]
): string | null | undefined => {
  if (
    Array.isArray(hotelImage) &&
    hotelImage.length > 0 &&
    hotelImage[0] !== undefined
  ) {
    return hotelImage[0].tag_name;
  }
};
