import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Assets } from "../Assets/Assets";
import { AuthProvider } from "./Contexts/AuthenticationProvider";

export function UserProfileTabLarge() {
  const { userData } = useContext(AuthProvider);

  return (
    <div className="bg-white rounded-md h-max overflow-hidden flex flex-col items-center w-1/5 mr-6">
      <p className="bg-flightResultsBg font-semibold px-5 py-2 w-full">
        Profile
      </p>
      <img
        src={
          userData.picture === null ? Assets.PersonClipArt : userData.picture
        }
        alt="Profile"
        className="rounded-full h-24 w-24 my-5"
      />
      <p className="text-base font-bold">{userData.name}</p>
      <p className="text-xs">{userData.accountType}</p>
      <Link
        className="bg-gray-200 text-xs rounded-full py-2 px-3 font-semibold mt-4 mb-6"
        to={"/profile"}
      >
        Edit profile
      </Link>
    </div>
  );
}
