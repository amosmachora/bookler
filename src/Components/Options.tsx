import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Assets } from "../Assets/Assets";
import { getBaseUrl } from "../Util/Helpers";

const Options = ({ menuWide }: { menuWide: boolean }) => {
  const { pathname } = useLocation();
  const baseUrl = getBaseUrl(pathname);
  return (
    <div
      className={`options flex text-white uppercase text-xs [&>*]:mr-6 [&>*]:rounded-lg [&>*]:cursor-pointer [&>*]:transition-all  ${
        menuWide
          ? "[&>*]:h-[73px] [&>*]:p-3 [&>*]:w-[68px]"
          : "[&>*]:h-[46px] [&>*]:p-1 [&>*]:w-[46px]"
      }`}
    >
      <Link
        to="/flights"
        className={`flex flex-col items-center justify-center ${
          baseUrl === "/flights" ? "bg-blue-700" : ""
        }`}
      >
        <img
          src={Assets.PlaneSmall}
          alt="Plane"
          className={`${menuWide ? "mb-3" : ""} h-6 w-6`}
        />
        {menuWide && <p>Flights</p>}
      </Link>
      <Link
        className={`flex flex-col items-center justify-center ${
          baseUrl === "/hotels" ? "bg-blue-700" : ""
        }`}
        to="hotels"
      >
        <img
          src={Assets.Hotel}
          alt="Plane"
          className={`${menuWide ? "mb-3" : ""} h-6 w-6`}
        />
        {menuWide && <p>Hotel</p>}
      </Link>
      <Link
        className={`flex flex-col items-center justify-center ${
          baseUrl === "/car-rental" ? "bg-blue-700" : ""
        }`}
        to="car-rental"
      >
        <img
          src={Assets.Taxi}
          alt="Plane"
          className={`${menuWide ? "mb-3" : ""} h-6 w-6`}
        />
        {menuWide && <p>Taxi</p>}
      </Link>
    </div>
  );
};

export default Options;
