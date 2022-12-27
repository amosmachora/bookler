import React, { useEffect, useContext } from "react";
import { Assets } from "./Assets/Assets";
import BackGround from "./Components/BackGround/BackGround";
import Menu from "./Components/Menu/Menu";
import Options from "./Components/Options";
import Overlay from "./Components/Overlay";
import UserProfileTabSmall from "./Components/UserProfileTabSmall";
import Reach from "./Components/Reach/Reach";
import { fetchAirports } from "./Fetchers/FetchAirports";
import { fetchAirlines } from "./Fetchers/FetchAirlines";
import { fetchCountryList } from "./Fetchers/FetchCountryList";
import { Outlet } from "react-router";
import { MainContext } from "./Components/Contexts/MainAppProvider";
import FlightsProvider from "./Components/Flights/FlightsProvider";
import CarRentalProvider from "./Components/CarRental/CarRentalProvider";
import HotelProvider from "./Components/Hotel/HotelProvider";
import AuthenticationProvider from "./Components/Contexts/AuthenticationProvider";

function App() {
  const {
    setAirports,
    setCountryList,
    setAirlines,
    setIsLoading,
    setMenuWide,
    isLoading,
    menuWide,
    devMode,
  } = useContext(MainContext);

  useEffect(() => {
    const initializeApplication = async () => {
      await fetchAirports().then((res) => setAirports(res));
      await fetchCountryList().then((res) => setCountryList(res));
      await fetchAirlines().then((res) => setAirlines(res));
    };
    if (!devMode) {
      setIsLoading(true);
      initializeApplication();
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[], devMode]);

  return (
    <AuthenticationProvider>
      <FlightsProvider>
        <CarRentalProvider>
          <HotelProvider>
            <div className="App w-full">
              {isLoading && (
                <>
                  <Overlay />
                  <Reach />
                </>
              )}
              <BackGround menuWide={menuWide} />
              <div className="flex relative">
                <Menu menuWide={menuWide} setMenuWide={setMenuWide} />
                <div
                  className={`h-min ${
                    menuWide
                      ? "top-1/4 left-1/4 w-2/3 fixed"
                      : "top-[34px] left-[12%] w-[87%] absolute"
                  } transition-all`}
                >
                  <div className="flex justify-between">
                    <Options menuWide={menuWide} />
                    {menuWide && (
                      <img
                        src={Assets.Plane}
                        alt="Plane"
                        className="w-40 h-14"
                      />
                    )}
                  </div>
                  <Outlet />
                </div>
              </div>
              <div className="flex absolute right-14 top-[34px]">
                <div className="ml-5 rounded-full bg-white/30 backdrop-blur-lg w-44 pr-4 pl-1 pt-1 pb-1 text-white flex items-center justify-between cursor-pointer">
                  <img src={Assets.House} alt="House" />
                  <p className="text-xs">Become A Partner</p>
                  <img src={Assets.DropDown} alt="Drop down" />
                </div>
                <UserProfileTabSmall setMenuWide={setMenuWide} />
              </div>
            </div>
          </HotelProvider>
        </CarRentalProvider>
      </FlightsProvider>
    </AuthenticationProvider>
  );
}

export default App;
