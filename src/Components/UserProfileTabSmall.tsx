import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Assets } from "../Assets/Assets";
import { useAuth } from "../Hooks/useAuth";
import { useGlobalData } from "../Hooks/useGlobalData";

const UserProfileTabSmall = () => {
  const { user } = useAuth();
  const { setMenuWide } = useGlobalData();
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleLogOut = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <div className="ml-5">
      <div
        className="rounded-full bg-white/40 backdrop-blur-lg w-44 pr-4 pl-1 pt-1 pb-1 text-white flex items-center justify-between cursor-pointer"
        onClick={() => {
          setShowOptions((prev) => !prev);
        }}
      >
        <img
          src={user.picture === null ? Assets.PersonClipArt : user.picture}
          alt="Profile pic"
          className="w-8 h-8 rounded-full"
        />
        <p className="text-xs">{user.name}</p>
        <img src={Assets.DropDown} alt="Drop down" />
      </div>
      {showOptions && (
        <div className="bg-white mt-3 rounded-md py-2">
          <Link
            className="ml-2 text-xs flex items-center cursor-pointer justify-center py-1"
            onClick={() => {
              setMenuWide(false);
              setShowOptions(false);
            }}
            to="profile"
          >
            <p className="text-blue-600 font-semibold">Profile</p>
          </Link>
          <div
            className="ml-2 text-xs flex items-center cursor-pointer justify-center py-1 mt-2"
            onClick={handleLogOut}
          >
            <p className="text-red-600 font-semibold">Log out </p>
            <img src={Assets.LogOut} alt="Log out" className="h-4 w-4 ml-1" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileTabSmall;
