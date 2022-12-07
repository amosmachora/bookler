import React, { SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { Assets } from "../../Assets/Assets";
import "./Menu.css";

interface menuProps {
  menuWide: boolean;
  setMenuWide: React.Dispatch<SetStateAction<boolean>>;
}

const Menu = ({ menuWide, setMenuWide }: menuProps) => {
  const [activeTab, setActiveTab] = useState("home");
  // const { pathname } = useLocation();
  // console.log(pathname);
  //TODO fix the base url link

  return (
    <div
      className={`menu ${
        menuWide ? `w-[17.14%]` : `w-[5.71%]`
      } bg-blue-600 text-white z-0 fixed top-0 ml-[40px] mt-[34px] rounded-xl pt-4 pl-7 pr-5 overflow-hidden transition-all`}
    >
      <div className="flex items-center justify-between">
        {menuWide && (
          <img src={Assets.Logo} alt="Logo" className="object-cover" />
        )}
        <Link
          className={`hamburger w-5 h-5 flex flex-col justify-around ${
            menuWide ? `items-end` : `items-start`
          } cursor-pointer`}
          onClick={() => setMenuWide((prev) => !prev)}
          to="/flights"
        >
          <span className="bg-white w-3/4 h-[3px] rounded-sm" />
          <span className="bg-white w-3/4 h-[3px] rounded-sm" />
          <span className="bg-white w-full h-[3px] rounded-sm" />
        </Link>
      </div>
      <ul
        className={`menu-items mt-20 [&>*]:flex [&>*]:items-center [&>*]:mb-1 [&>*]:cursor-pointer ${
          menuWide
            ? "large-menu [&>*]:rounded-full"
            : "small-menu [&>*]:rounded"
        }`}
      >
        <div
          className={`${activeTab === "home" ? "active" : ""}`}
          onClick={() => setActiveTab("home")}
        >
          <img src={Assets.Home} alt="Home" className="tab-icon" />
          {menuWide && <p>Home</p>}
        </div>
        <div
          className={`${activeTab === "wallet" ? "active" : ""}`}
          onClick={() => setActiveTab("wallet")}
        >
          <img src={Assets.Wallet} alt="Wallet" className="tab-icon" />
          {menuWide && <p>Wallet</p>}
        </div>
        <div
          className={`${activeTab === "booking" ? "active" : ""}`}
          onClick={() => setActiveTab("booking")}
        >
          <img src={Assets.Booking} alt="Booking" className="tab-icon" />
          {menuWide && <p>Booking</p>}
        </div>
        <div
          className={`${activeTab === "business" ? "active" : ""}`}
          onClick={() => setActiveTab("business")}
        >
          <img src={Assets.Business} alt="Business" className="tab-icon" />
          {menuWide && <p>Business</p>}
        </div>
        <div
          className={`${activeTab === "explore" ? "active" : ""}`}
          onClick={() => setActiveTab("explore")}
        >
          <img src={Assets.Explore} alt="Explore" className="tab-icon" />
          {menuWide && <p>Explore</p>}
        </div>
        <div
          className={`${activeTab === "support" ? "active" : ""}`}
          onClick={() => setActiveTab("support")}
        >
          <img src={Assets.Support} alt="Support" className="tab-icon" />
          {menuWide && <p>Support</p>}
        </div>
      </ul>
      <div className="get-premium bg-white flex items-center rounded-full absolute w-48 h-11 pr-4 cursor-pointer bottom-10 z-10">
        <img
          src={Assets.Premium}
          alt="Premium"
          className="w-14 h-14 absolute left-0 top-[4px]"
        />
        {menuWide && (
          <React.Fragment>
            <div className="ml-auto -mr-3">
              <p className="text-black text-xs font-bold">Get premium</p>
              <p className="text-gray-400 text-[10px]">$39/m</p>
            </div>
            <img src={Assets.PremiumArrow} alt="Arrow" className="ml-9" />
          </React.Fragment>
        )}
      </div>
      <img
        src={Assets.Cloud_2}
        alt="Cloud"
        className="absolute bottom-12 left-0 z-0 opacity-20"
      />
    </div>
  );
};

export default Menu;
