/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Assets } from "./Assets/Assets";
import BackGround from "./Components/BackGround/BackGround";
import Menu from "./Components/Menu/Menu";
import Options from "./Components/Options";
import UserProfileTabSmall from "./Components/UserProfileTabSmall";
import { Outlet, useNavigate } from "react-router";
import FlightsProvider from "./Components/Flights/FlightsProvider";
import CarRentalProvider from "./Components/CarRental/CarRentalProvider";
import HotelProvider from "./Components/Hotel/HotelProvider";
import { shouldMenuBeWide } from "./Util/Helpers";
import { useLocation } from "react-router";
// import { useAuth } from "./Hooks/useAuth";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const menuWide = shouldMenuBeWide(pathname);
  useEffect(() => {
    navigate("/flights");
  }, []);

  return (
    <FlightsProvider>
      <CarRentalProvider>
        <HotelProvider>
          <div className="App w-full">
            <BackGround />
            <div className="flex relative">
              <Menu />
              <div
                className={`h-min ${
                  menuWide
                    ? "top-1/4 left-1/4 w-2/3 fixed"
                    : "top-[34px] left-[12%] w-[87%] absolute"
                } transition-all`}
              >
                <div className="flex justify-between">
                  <Options />
                  {menuWide && (
                    <img src={Assets.Plane} alt="Plane" className="w-40 h-14" />
                  )}
                </div>
                <Outlet />
              </div>
            </div>
            <div className="flex absolute right-14 top-[34px] items-start">
              <div className="ml-5 rounded-full bg-white/30 backdrop-blur-lg w-44 pr-4 pl-1 pt-1 pb-1 text-white flex items-center justify-between cursor-pointer">
                <img src={Assets.House} alt="House" />
                <p className="text-xs">Become A Partner</p>
                <img src={Assets.DropDown} alt="Drop down" />
              </div>
              <UserProfileTabSmall />
            </div>
          </div>
        </HotelProvider>
      </CarRentalProvider>
    </FlightsProvider>
  );
}

export default App;
