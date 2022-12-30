import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Assets } from "../Assets/Assets";
import { AuthProvider } from "./Contexts/AuthenticationProvider";

const UserProfileTabSmall = ({
  setMenuWide,
}: {
  setMenuWide: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { userData } = useContext(AuthProvider);

  return (
    <>
      <Link
        className="ml-5 rounded-full bg-white/40 backdrop-blur-lg w-44 pr-4 pl-1 pt-1 pb-1 text-white flex items-center justify-between cursor-pointer"
        onClick={() => {
          setMenuWide(false);
        }}
        to="profile"
      >
        <img
          src={
            userData.picture === null ? Assets.PersonClipArt : userData.picture
          }
          alt="Profile pic"
          className="w-8 h-8 rounded-full"
        />
        <p className="text-xs">{userData.name}</p>
        <img src={Assets.DropDown} alt="Drop down" />
      </Link>
    </>
  );
};

export default UserProfileTabSmall;
