import React, { useState } from "react";
import Assets from "../../Assets/Assets";
import "./Menu.css";

const Menu = () => {
  const [isLarge, setIsLarge] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  return (
    <div className="menu w-[17.14%] bg-blue-600 text-white z-50 relative ml-[40px] mt-[34px] rounded-xl pt-4 pl-7 pr-5">
      <div className="flex items-center justify-between">
        <img src={Assets.Logo} alt="Logo" className="object-cover" />
        <div
          className={`hamburger w-5 h-5 flex flex-col justify-around ${
            isLarge ? `items-end` : `items-start`
          } cursor-pointer`}
          onClick={() => setIsLarge((prev) => !prev)}
        >
          <span className="bg-white w-3/4 h-[3px] rounded-sm" />
          <span className="bg-white w-3/4 h-[3px] rounded-sm" />
          <span className="bg-white w-full h-[3px] rounded-sm" />
        </div>
      </div>
      <ul className="menu-items mt-20 [&>*]:flex [&>*]:items-center [&>*]:mb-1 [&>*]:cursor-pointer">
        <div className={`${activeTab}`}>
          <img src={Assets.Home} alt="Home" />
          <p>Home</p>
        </div>
        <div>
          <img src={Assets.Wallet} alt="Wallet" />
          <p>Wallet</p>
        </div>
        <div>
          <img src={Assets.Booking} alt="Booking" />
          <p>Booking</p>
        </div>
        <div>
          <img src={Assets.Business} alt="Booking" />
          <p>Business</p>
        </div>
        <div>
          <img src={Assets.Explore} alt="Explore" />
          <p>Explore</p>
        </div>
        <div>
          <img src={Assets.Support} alt="Support" />
          <p>Support</p>
        </div>
      </ul>
    </div>
  );
};

export default Menu;
