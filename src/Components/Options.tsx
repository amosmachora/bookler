import React, { useState } from "react";
import { Assets } from "../Assets/Assets";

const Options = () => {
  const [activeChoice, setActiveChoice] = useState("flights");
  return (
    <div className="options flex text-white uppercase text-xs [&>*]:mr-6 [&>*]:p-3 [&>*]:rounded-lg [&>*]:cursor-pointer [&>*]:transition-all [&>*]:w-[68px] [&>*]:h-[73px]">
      <div
        className={`flex flex-col items-center ${
          activeChoice === "flights" ? "bg-blue-700" : ""
        }`}
        onClick={() => setActiveChoice("flights")}
      >
        <img src={Assets.PlaneSmall} alt="Plane" />
        <p>Flights</p>
      </div>
      <div
        className={`flex flex-col items-center ${
          activeChoice === "hotel" ? "bg-blue-700" : ""
        }`}
        onClick={() => setActiveChoice("hotel")}
      >
        <img src={Assets.Hotel} alt="Plane" />
        <p>Hotel</p>
      </div>
      <div
        className={`flex flex-col items-center ${
          activeChoice === "villa" ? "bg-blue-700" : ""
        }`}
        onClick={() => setActiveChoice("villa")}
      >
        <img src={Assets.Villa} alt="Plane" />
        <p>Villa</p>
      </div>
      <div
        className={`flex flex-col items-center ${
          activeChoice === "taxi" ? "bg-blue-700" : ""
        }`}
        onClick={() => setActiveChoice("taxi")}
      >
        <img src={Assets.Taxi} alt="Plane" />
        <p>Taxi</p>
      </div>
    </div>
  );
};

export default Options;
