import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Assets } from '../../Assets/Assets';
import { getBaseUrl, shouldMenuBeWide } from '../../Util/Helpers';

const menuLinks = [
  {
    to: '/',
    imgSrc: Assets.Home,
    name: 'Home',
  },
  {
    to: '/profile',
    imgSrc: Assets.PersonClipArt,
    name: 'Profile',
  },
  {
    to: '/wallet',
    imgSrc: Assets.Wallet,
    name: 'Wallet',
  },
  {
    to: '/booking',
    imgSrc: Assets.Booking,
    name: 'Booking',
  },
  {
    to: '/business',
    imgSrc: Assets.Business,
    name: 'Business',
  },
  {
    to: '/explore',
    imgSrc: Assets.Explore,
    name: 'Explore',
  },
  {
    to: '/support',
    imgSrc: Assets.Support,
    name: 'Support',
  },
];

const Menu = () => {
  const { pathname } = useLocation();
  const menuWide = shouldMenuBeWide(pathname);

  return (
    <div
      className={`h-[90vh]  bg-blue-600 text-white text-sm z-0 rounded-xl pt-4 pl-7 pr-5 overflow-hidden transition-all relative ${
        menuWide ? 'w-[19%]' : 'w-[5%]'
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
          to={getBaseUrl(pathname)}
        >
          <span className="bg-white w-3/4 h-[3px] rounded-sm" />
          <span className="bg-white w-3/4 h-[3px] rounded-sm" />
          <span className="bg-white w-full h-[3px] rounded-sm" />
        </Link>
      </div>
      <div
        className={`mt-20 [&>*]:flex [&>*]:items-center [&>*]:mb-1 [&>*]:cursor-pointer ${
          menuWide
            ? '[&>*]:rounded-full [&>*]:px-3 [&>*]:py-2'
            : '[&>*]:rounded [&>*]:p-2'
        }`}
      >
        {menuLinks.map((item) => (
          <MenuLink pathName={pathname} menuItem={item} menuWide={menuWide} />
        ))}
      </div>
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
  };
  menuWide: boolean;
}) => {
  return (
    <Link
      className={`${pathName === menuItem.to ? 'bg-blueTab' : ''}`}
      to={menuItem.to}
    >
      <img src={menuItem.imgSrc} alt="Home" className="mr-2 w-5 h-5" />
      {menuWide && <p>{menuItem.name}</p>}
    </Link>
  );
};
