import React from 'react';
import { Link } from 'react-router-dom';

const OffPageLink = ({
  isClickable,
  to,
  children,
}: {
  isClickable: boolean;
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      to={to}
      className={`text-white rounded-lg w-1/4 ml-auto flex items-center justify-center transition-all min-h-[78px] ${
        isClickable
          ? 'bg-red-600 cursor-pointer'
          : 'bg-red-300 cursor-not-allowed'
      }`}
      onClick={(e) => {
        if (!isClickable) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </Link>
  );
};

export default OffPageLink;
