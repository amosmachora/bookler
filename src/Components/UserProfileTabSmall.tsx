import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Assets } from '../Assets/Assets';
import { useAuth } from '../Hooks/useAuth';
import { useGlobalData } from '../Hooks/useGlobalData';

const UserProfileTabSmall = () => {
  const { userCredential } = useAuth();
  const user = userCredential?.user;
  const { setMenuWide } = useGlobalData();
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleLogOut = () => {
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <div className="ml-5 relative">
      <div
        className="rounded-full bg-white/40 backdrop-blur-lg w-44 pr-4 pl-1 pt-1 pb-1 text-white flex items-center justify-between cursor-pointer"
        onClick={() => {
          setShowOptions((prev) => !prev);
        }}
      >
        <img
          src={user ? user.photoURL! : Assets.PersonClipArt}
          alt="Profile pic"
          className="w-8 h-8 rounded-full"
        />
        <p className="text-xs">
          {user ? 'Hello ' + user.displayName : 'Hello User'}
        </p>
        <img
          src={Assets.DropDown}
          alt="Drop down"
          className={`${showOptions && 'rotate-180'} transition-all`}
        />
      </div>
      {showOptions && (
        <div className="bg-white mt-3 rounded-md py-2 absolute right-0 left-0 z-50">
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
