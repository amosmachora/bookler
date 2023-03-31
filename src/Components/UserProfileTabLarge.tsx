import React from "react";
import { Link } from "react-router-dom";
import { Assets } from "../Assets/Assets";
import { useAuth } from "../Hooks/useAuth";

export function UserProfileTabLarge() {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-md h-max overflow-hidden flex flex-col items-center w-1/5 mr-6">
      <p className="bg-flightResultsBg font-semibold px-5 py-2 w-full">
        Profile
      </p>
      <img
        src={user.picture === null ? Assets.PersonClipArt : user.picture}
        alt="Profile"
        className="rounded-full h-24 w-24 my-5"
      />
      <p className="text-base font-bold">{user.name}</p>
      <p className="text-xs">{user.accountType}</p>
      <Link
        className="bg-gray-200 text-xs rounded-full py-2 px-3 font-semibold mt-4 mb-6"
        to={"/profile"}
      >
        Edit profile
      </Link>
    </div>
  );
}
