import React from "react";
import { Assets } from "../../Assets/Assets";
import { Facility } from "../../Types/Hotel";

const LittleFacilityDisplay = ({ facility }: { facility: Facility }) => {
  return (
    <div className="flex mr-5 items-center">
      <img
        src={Assets.StarBlue}
        alt="Test"
        className="mx-2 h-3 w-3 object-cover"
      />
      <p className="text-xs text-gray-400">{facility.facility_name}</p>
    </div>
  );
};

export default LittleFacilityDisplay;
