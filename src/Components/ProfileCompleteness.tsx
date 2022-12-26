import React from "react";

const ProfileCompleteness = ({ percentage }: { percentage: number }) => {
  return (
    <div
      className={`border-4 relative rounded-[50%] h-24 w-24 ${
        percentage < 50 ? "border-red-300" : "border-profileGreen"
      }`}
    >
      <div className="center-absolutely">
        <p className="text-center text-black text-base">{percentage}%</p>
        <p className="text-[10px] text-gray-400">Completed</p>
      </div>
    </div>
  );
};

export default ProfileCompleteness;
