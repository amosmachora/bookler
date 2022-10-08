import React from "react";
import { Assets } from "../Assets/Assets";

type propsType = {
  activeChoice: string;
  setActiveChoice: (choice: string) => void;
  menuWide: boolean;
};

const Options = ({ activeChoice, setActiveChoice, menuWide }: propsType) => {
  return (
    <div
      className={`options flex text-white uppercase text-xs [&>*]:mr-6 [&>*]:rounded-lg [&>*]:cursor-pointer [&>*]:transition-all  ${
        menuWide
          ? "[&>*]:h-[73px] [&>*]:p-3 [&>*]:w-[68px]"
          : "[&>*]:h-[46px] [&>*]:p-1 [&>*]:w-[46px]"
      }`}
    >
      <div
        className={`flex flex-col items-center justify-center ${
          activeChoice === "flights" ? "bg-blue-700" : ""
        }`}
        onClick={() => setActiveChoice("flights")}
      >
        <img
          src={Assets.PlaneSmall}
          alt="Plane"
          className={`${menuWide ? "mb-3" : ""} h-6 w-6`}
        />
        {menuWide && <p>Flights</p>}
      </div>
      <div
        className={`flex flex-col items-center justify-center ${
          activeChoice === "hotel" ? "bg-blue-700" : ""
        }`}
        onClick={() => setActiveChoice("hotel")}
      >
        <img
          src={Assets.Hotel}
          alt="Plane"
          className={`${menuWide ? "mb-3" : ""} h-6 w-6`}
        />
        {menuWide && <p>Hotel</p>}
      </div>
      <div
        className={`flex flex-col items-center justify-center ${
          activeChoice === "villa" ? "bg-blue-700" : ""
        }`}
        onClick={() => setActiveChoice("villa")}
      >
        <img
          src={Assets.Villa}
          alt="Plane"
          className={`${menuWide ? "mb-3" : ""} h-6 w-6`}
        />
        {menuWide && <p>Villa</p>}
      </div>
      <div
        className={`flex flex-col items-center justify-center ${
          activeChoice === "taxi" ? "bg-blue-700" : ""
        }`}
        onClick={() => setActiveChoice("taxi")}
      >
        <img
          src={Assets.Taxi}
          alt="Plane"
          className={`${menuWide ? "mb-3" : ""} h-6 w-6`}
        />
        {menuWide && <p>Taxi</p>}
      </div>
    </div>
  );
};

export default Options;
