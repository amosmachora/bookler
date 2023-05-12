import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Assets } from '../Assets/Assets';
import { useGlobalData } from '../Hooks/useGlobalData';

const menuLinks = [
  {
    to: '/flights',
    imgSrc: Assets.Home,
    name: 'Home',
    isAllowed: true,
  },
  {
    to: '/profile',
    imgSrc: Assets.PersonClipArt,
    name: 'Profile',
    isAllowed: true,
  },
  {
    to: '/wallet',
    imgSrc: Assets.Wallet,
    name: 'Wallet',
    isAllowed: false,
  },
  {
    to: '/booking',
    imgSrc: Assets.Booking,
    name: 'Booking',
    isAllowed: false,
  },
  {
    to: '/business',
    imgSrc: Assets.Business,
    name: 'Business',
    isAllowed: false,
  },
  {
    to: '/explore',
    imgSrc: Assets.Explore,
    name: 'Explore',
    isAllowed: false,
  },
  {
    to: '/support',
    imgSrc: Assets.Support,
    name: 'Support',
    isAllowed: false,
  },
];

const Menu = () => {
  const { pathname } = useLocation();
  const { menuWide } = useGlobalData();

  return (
    <div
      className={`bg-blue-600 text-white text-sm z-0 rounded-xl pt-4 px-5 overflow-hidden transition-all sticky top-0 h-[90vh] ${
        menuWide ? 'w-1/5' : 'w-1/12'
      }`}
    >
      <div className="flex items-center justify-between">
        {menuWide && (
          <img src={Assets.Logo} alt="Logo" className="object-cover" />
        )}
        <Link
          className={`hamburger w-5 h-5 flex flex-col justify-around ${
            menuWide ? `items-end` : `items-start`
          } cursor-pointer`}
          to="/flights"
        >
          <span className="bg-white w-3/4 h-[3px] rounded-sm" />
          <span className="bg-white w-3/4 h-[3px] rounded-sm" />
          <span className="bg-white w-full h-[3px] rounded-sm" />
        </Link>
      </div>
      <div className={`mt-20 ${!menuWide && 'flex flex-col items-center'}`}>
        {menuLinks.map((item, i) => (
          <MenuLink
            pathName={pathname}
            menuItem={item}
            menuWide={menuWide}
            key={i}
          />
        ))}
      </div>
      <div className="bg-white flex items-center justify-between px-5 py-2 rounded-full cursor-pointer z-10 mt-10">
        <img src={Assets.Premium} alt="Premium" className="w-6 h-6" />
        {menuWide && (
          <React.Fragment>
            <div>
              <p className="text-black text-xs font-bold">Get premium</p>
              <p className="text-gray-400 text-[10px]">$39/m</p>
            </div>
            <img src={Assets.PremiumArrow} alt="Arrow" className="" />
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

export const MenuLink = ({
  pathName,
  menuItem,
  menuWide,
}: {
  pathName: string;
  menuItem: {
    to: string;
    imgSrc: string;
    name: string;
    isAllowed: boolean;
  };
  menuWide: boolean;
}) => {
  return (
    <Link
      className={`${
        pathName === menuItem.to ? 'bg-blueTab' : ''
      } px-3 py-2 flex items-center transition-all ${
        !menuItem.isAllowed && 'cursor-not-allowed'
      } ${menuWide ? 'rounded-full' : 'rounded w-max'}`}
      to={menuItem.isAllowed ? menuItem.to : '/flights'}
    >
      <img
        src={menuItem.imgSrc}
        alt="Home"
        className={`h-5 w-5 ${menuWide ? 'mr-2' : 'mx-auto'}`}
      />
      {menuWide && <p>{menuItem.name}</p>}
    </Link>
  );
};
