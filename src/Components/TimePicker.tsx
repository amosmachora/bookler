import React from "react";

const TimePicker = ({
  name,
  setTime,
}: {
  name: string;
  setTime: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  return (
    <div className="rounded-md bg-gray-100 w-[32%] px-4 py-2">
      <p className="text-gray-300 ml-1 text-sm">{name}</p>
      <input
        className="font-bold mb-1 bg-gray-100"
        type="time"
        onChange={(e) => setTime(e.target.value)}
      />
    </div>
  );
};

export default TimePicker;
