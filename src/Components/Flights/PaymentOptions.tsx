import { UserProfileTabLarge } from '../../Components/UserProfileTabLarge';
import React from 'react';

export const PaymentOptions = ({
  className,
  showSmallProfile,
}: {
  className: string;
  showSmallProfile: boolean;
}) => {
  const remainingTime = '0min 5sec';

  return (
    <div className={`flex justify-between gap-x-4 ${className}`}>
      <div className="flex-grow">
        <div className="flex justify-between py-3 px-5 rounded-md bg-flightResultsBg items-center">
          <p className="font-bold text-lg">Payment Options</p>
          <p className="text-gray-500 text-sm">
            The session will expire in{' '}
            <span className="text-sky-700 font-semibold">{remainingTime}</span>
          </p>
        </div>
      </div>
      {showSmallProfile && <UserProfileTabLarge className="w-1/5 mr-6" />}
    </div>
  );
};
