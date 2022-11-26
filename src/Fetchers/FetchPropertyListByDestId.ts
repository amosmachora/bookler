import axios from "axios";
import { PropertyListType } from "../Types/PropertyList";

/**
 * List properties having type of resorts, hotels, motels, hostels, etc as on official site
 * @param arrival_date date of arrival at the target hotel
 * @param departure_date departure date from the target hotel
 * @param guest_qty number of adults
 * @param room_qty number of rooms
 * @param dest_ids destination id
 * @param children_qty number of children
 * @param travel_purpose leisure or business
 * @returns a properties list object
 */
export const fetchPropertyListByDestId = async (
  arrival_date: string | undefined,
  departure_date: string | undefined,
  guest_qty: string,
  room_qty: string,
  dest_ids: string,
  children_qty: string,
  travel_purpose: string,
  sortBy: string
): Promise<PropertyListType> => {
  const options = {
    method: "GET",
    url: "https://apidojo-booking-v1.p.rapidapi.com/properties/list",
    params: {
      offset: "0",
      arrival_date: arrival_date,
      departure_date: departure_date,
      guest_qty: guest_qty,
      dest_ids: dest_ids,
      room_qty: room_qty,
      search_type: "city",
      children_qty: children_qty,
      search_id: "none",
      price_filter_currencycode: "USD",
      order_by: sortBy,
      languagecode: "en-us",
      travel_purpose: travel_purpose,
    },
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
