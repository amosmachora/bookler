import React from "react";
import { Assets } from "../Assets/Assets";

export function Rating({
  mapShown,
  rating,
}: {
  mapShown: boolean;
  rating: number | string;
}) {
  return (
    <div
      className={`${
        mapShown
          ? "rounded font-semibold"
          : "rounded-tl-md rounded-bl-md font-bold right-0 absolute top-[15%]"
      } text-white bg-blue-900`}
    >
      <div className="flex items-center px-3 py-1">
        <p className={mapShown ? "text-xs" : ""}>{rating}</p>
        <img src={Assets.Star} alt="Star" className="ml-2" />
      </div>
      {mapShown ? null : <div className="w-full h-6 bg-white rounded-tr-3xl" />}
    </div>
  );
}
