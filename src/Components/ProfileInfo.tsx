import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { Assets } from "../Assets/Assets";

type ProfileItemProps = {
  profilePicture: any;
  userName: string;
};

const ProfileInfo = ({ profilePicture, userName }: ProfileItemProps) => {
  return (
    <div className="ml-5 rounded-full bg-white/40 backdrop-blur-lg w-44 pr-4 pl-1 pt-1 pb-1 text-white flex items-center justify-between cursor-pointer">
      <img
        src={profilePicture}
        alt="Profile pic"
        className="w-8 h-8 rounded-full"
      />
      <p className="text-xs">{userName}</p>
      <img src={Assets.DropDown} alt="Drop down" />
    </div>
  );
};

export default ProfileInfo;
