/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Assets } from './Assets/Assets';
import BackGround from './Components/BackGround/BackGround';
import Menu from './Components/Menu';
import Options from './Components/Options';
import UserProfileTabSmall from './Components/UserProfileTabSmall';
import { Outlet, useNavigate } from 'react-router';
import LoadingScreen from './Components/LoadingScreen';
import { useGlobalData } from './Hooks/useGlobalData';
import { useAuth } from './Hooks/useAuth';
import { useUpdateLogger } from './Hooks/useUpdateLogger';
import { SmallScreenAlert } from './Components/SmallScreenAlert';

export const RESULTS_DIV_HEIGHT = 'h-[58vh]';

function App() {
  const navigate = useNavigate();
  const { menuWide, isLoading } = useGlobalData();
  const { userCredential } = useAuth();
  useUpdateLogger(userCredential, 'userCredential');
  useEffect(() => {
    // const user = localStorage.getItem('userData');
    // if (!user) {
    //   navigate('/login');
    // } else {
    // }
    navigate('/flights');
  }, []);

  return (
    <div className="App w-full h-screen">
      {isLoading && <LoadingScreen />}
      <BackGround />
      <SmallScreenAlert />
      <div className="z-10 gap-x-10 h-screen p-10 relative overflow-y-auto hidden sm:flex">
        <Menu />
        <div
          className={`transition-all flex flex-col flex-grow h-full ${
            menuWide ? 'w-4/5' : 'w-11/12'
          }`}
        >
          <div className="flex justify-between w-full">
            {!menuWide && <Options />}
            <div className="flex items-start w-max ml-auto">
              <div className="ml-5 rounded-full bg-white/30 backdrop-blur-lg w-44 pr-4 pl-1 pt-1 pb-1 text-white flex items-center justify-between cursor-pointer">
                <img src={Assets.House} alt="House" />
                <p className="text-xs">Become A Partner</p>
                <img src={Assets.DropDown} alt="Drop down" />
              </div>
              <UserProfileTabSmall />
            </div>
          </div>
          {menuWide && (
            <div className="flex justify-between items-center mt-[6%]">
              <Options />
              <img src={Assets.Plane} alt="Plane" className="w-40 h-14" />
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
