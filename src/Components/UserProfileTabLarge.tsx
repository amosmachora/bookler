import React, { useContext } from "react";
import { AuthProvider } from "../App";

export function UserProfileTabLarge() {
  const { profilePicture, userName, accountType } = useContext(AuthProvider);

  return (
    <div className="bg-white rounded-md h-max overflow-hidden flex flex-col items-center w-1/5 mr-6">
      <p className="bg-flightResultsBg font-semibold px-5 py-2 w-full">
        Profile
      </p>
      <img
        src={profilePicture as string}
        alt="Profile"
        className="rounded-full h-24 w-24 my-5"
      />
      <p className="text-base font-bold">{userName}</p>
      <p className="text-xs">{accountType}</p>
      <button className="bg-gray-200 text-xs rounded-full py-2 px-3 font-semibold mt-4 mb-6">
        Edit profile
      </button>
    </div>
  );
}
