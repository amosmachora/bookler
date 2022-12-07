import React, { useContext } from "react";
import { HotelSearchContext } from "./Hotel";

/**
 * @param closeModalFunction a function to close the modal
 * @returns Jsx for a pop up modal that lets the user select number of people, children e.t.c
 */
const TravellerSelector = ({
  closeModalFunction,
}: {
  closeModalFunction: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { travellerHotelInfo, setTravellerHotelInfo } =
    useContext(HotelSearchContext);
  const circle =
    "rounded-[50%] border px-2 border-gray-500 cursor-pointer hover:border-sky-500 transition-all mx-2 my-1";
  return (
    <div className="absolute -top-1 right-1/3 -translate-y-full bg-white w-1/3 shadow-md rounded-md p-4 cursor-auto z-10">
      <p className="font-bold text-md">Travellers</p>
      <p className="font-semibold">Room 1</p>
      <div className="flex justify-between items-center my-3">
        <p className="text-xs text-gray-500">Adults</p>
        <div className="flex items-center">
          <p
            className={circle}
            onClick={() =>
              setTravellerHotelInfo((prev) => {
                return {
                  ...prev,
                  adults: prev.adults === 0 ? 0 : prev.adults - 1,
                };
              })
            }
          >
            -
          </p>
          <p>{travellerHotelInfo.adults}</p>
          <p
            className={circle}
            onClick={() =>
              setTravellerHotelInfo((prev) => {
                return {
                  ...prev,
                  adults: prev.adults + 1,
                };
              })
            }
          >
            +
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center my-3">
        <p className="text-xs text-gray-500">
          Children <br />
          Ages 0 to 17
        </p>
        <div className="flex items-center">
          <p
            className={circle}
            onClick={() =>
              setTravellerHotelInfo((prev) => {
                return {
                  ...prev,
                  kids: prev.kids === 0 ? 0 : prev.kids - 1,
                };
              })
            }
          >
            -
          </p>
          <p>{travellerHotelInfo.kids}</p>
          <p
            className={circle}
            onClick={() =>
              setTravellerHotelInfo((prev) => {
                return {
                  ...prev,
                  kids: prev.kids + 1,
                };
              })
            }
          >
            +
          </p>
        </div>
      </div>
      <button
        className="w-full bg-sky-500 text-white rounded-full h-8 mt-2"
        onClick={() => closeModalFunction(false)}
      >
        Done
      </button>
    </div>
  );
};

export default TravellerSelector;
