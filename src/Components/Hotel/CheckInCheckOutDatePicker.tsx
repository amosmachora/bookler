import React from "react";
import { Assets } from "../../Assets/Assets";

type CheckInCheckOutDatePickerProps = {
  date: Date | null;
  setDateFunction: React.Dispatch<React.SetStateAction<Date | null>>;
};

const CheckInCheckOutDatePicker = ({
  date,
  setDateFunction,
}: CheckInCheckOutDatePickerProps) => {
  return (
    <div className="mt-1 relative">
      <input
        type="date"
        defaultValue={date?.toDateString()}
        onChange={(e) => setDateFunction(e.target.valueAsDate)}
        className="w-full py-2 px-6 rounded-full bg-gray-100 cursor-pointer check-in-or-out-picker"
      />
      <img
        src={Assets.Calendar}
        alt="Calendar"
        className="absolute top-1/2 right-6 -translate-y-1/2"
      />
    </div>
  );
};

export default CheckInCheckOutDatePicker;
