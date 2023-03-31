/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Assets } from './Assets/Assets';
import BackGround from './Components/BackGround/BackGround';
import Menu from './Components/Menu/Menu';
import Options from './Components/Options';
import UserProfileTabSmall from './Components/UserProfileTabSmall';
import { Outlet, useNavigate } from 'react-router';
import { shouldMenuBeWide } from './Util/Helpers';
import { useLocation } from 'react-router';
// import { useAuth } from "./Hooks/useAuth";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const menuWide = shouldMenuBeWide(pathname);
  useEffect(() => {
    const user = localStorage.getItem('userData');
    if (!user) {
      navigate('/login');
    } else {
      navigate('/flights');
    }
  }, []);

  return (
    <div className="App w-full">
      <BackGround />
      <div className="flex z-10 h-screen p-10 relative">
        <Menu />
        <div
          className={`h-full transition-all ml-[5%] flex-grow ${
            menuWide ? '' : ''
          }`}
        >
          <div className="flex items-start w-max ml-auto">
            <div className="ml-5 rounded-full bg-white/30 backdrop-blur-lg w-44 pr-4 pl-1 pt-1 pb-1 text-white flex items-center justify-between cursor-pointer">
              <img src={Assets.House} alt="House" />
              <p className="text-xs">Become A Partner</p>
              <img src={Assets.DropDown} alt="Drop down" />
            </div>
            <UserProfileTabSmall />
          </div>
          <div className="flex justify-between items-center mt-[6%]">
            <Options />
            {menuWide && (
              <img src={Assets.Plane} alt="Plane" className="w-40 h-14" />
            )}
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
