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
