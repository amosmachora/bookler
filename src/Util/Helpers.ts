import { FlightPrices } from "../Types/Contexts";
import { TravelerInfo } from "../Types/Flights";

export function getTotalPrice(
  travelersInfo: TravelerInfo | null,
  flightPrice: FlightPrices | null
): number {
  const numberOfAdults =
    travelersInfo?.adultList === undefined
      ? 0
      : travelersInfo?.adultList.length;
  const baseFare =
    flightPrice?.baseFare === undefined ? 0 : flightPrice.baseFare;

  const flightSurcharges = flightPrice!.flightSurCharges;

  return numberOfAdults * baseFare + flightSurcharges;
}

/**
 * Get formatted date.
 * @param date A normal Js Date object
 * @returns date string of the format "Fri Nov 18"
 */
export const getFormattedDate = (date: Date | null | undefined) => {
  return date?.toDateString().substring(0, date.toDateString().length - 4);
};

/**
 *
 * @param date A simple date object
 * @returns A date of the format "2022-11-20"
 */
export const getDateFromIsoString = (date: Date | null): string | undefined => {
  return date?.toISOString().substring(0, 10);
};

export const getDay = (date: Date | null | undefined) => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (date === null || date === undefined) {
    return "Sunday";
  }
  return weekdays[date.getDay()];
};

/**
 * A function to clean the array of strings
 * @param filterBy an array of strings
 * @returns one string of the format string1,string2,string3,
 */
export function cleaned(filterBy: string[]): string {
  let text: string = "";

  filterBy.forEach((filter) => {
    if (filterBy.indexOf(filter) !== filterBy.length - 1) {
      text = text.concat(filter + ",");
    } else {
      text = text.concat(filter);
    }
  });

  return text;
}
