import React from "react";
import { Assets } from "../../Assets/Assets";
import { getFormattedDate } from "../../Util/Helpers";

type CheckInCheckOutDatePickerProps = {
  date: Date | null;
  setDateFunction: React.Dispatch<React.SetStateAction<Date | null>>;
};

const CheckInCheckOutDatePicker = ({
  date,
  setDateFunction,
}: CheckInCheckOutDatePickerProps) => {
  return (
    <div className="mt-1 relative flex bg-gray-100 rounded-full py-2 px-4">
      <p>{getFormattedDate(date)}</p>
      <img src={Assets.Calendar} alt="Calendar" className="ml-3" />
    </div>
  );
};

export default CheckInCheckOutDatePicker;
