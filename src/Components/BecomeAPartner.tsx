import React from "react";
import { Assets } from "../Assets/Assets";

const BecomeAPartner = () => {
  return (
    <div className="ml-5 rounded-full bg-white/30 backdrop-blur-lg w-44 pr-4 pl-1 pt-1 pb-1 text-white flex items-center justify-between cursor-pointer">
      <img src={Assets.House} alt="House" />
      <p className="text-xs">Become A Partner</p>
      <img src={Assets.DropDown} alt="Drop down" />
    </div>
  );
};

export default BecomeAPartner;
