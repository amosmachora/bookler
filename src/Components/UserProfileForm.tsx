import { User } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuth } from '../Hooks/useAuth';
import NonNullUserInput from './NonNullUserInput';
import NullUserFieldInput from './NullUserFieldInput';
import PaymentMethods from './PaymentMethods';
import ProfileCompleteness from './ProfileCompleteness';
import { UserProfileTabLarge } from './UserProfileTabLarge';

const UserProfileForm = () => {
  const { userCredential } = useAuth();
  const user = userCredential?.user;
  const nullUserFields: string[] = getNullUserFields(user);
  const nonNullUserFields: string[] = getNonNullUserFields(user);
  const [showPaymentMethodsModal, setShowPaymentMethodsModal] = useState(false);

  const percentage: string = (
    (nonNullUserFields.length /
      (nullUserFields.length + nonNullUserFields.length)) *
    100
  ).toFixed(0);

  return (
    <div className="mt-10 flex gap-x-4 justify-between relative">
      {showPaymentMethodsModal ? (
        <PaymentMethods
          className="w-4/5"
          setShowPaymentMethodsModal={setShowPaymentMethodsModal}
        />
      ) : (
        <div className="w-4/5">
          <div className="flex px-5 bg-flightResultsBg py-2 rounded-sm mb-1 items-center justify-between">
            <p className="font-bold text-base">Profile</p>
          </div>
          <div className="bg-white rounded-md p-8 text-gray-400 text-xs flex justify-between">
            <div>
              <p className="font-bold text-black text-lg">
                Complete Your Profile
              </p>
              {nullUserFields.map((field, index) => (
                <div className="flex items-center mt-3">
                  <p className="text-white bg-blue-600 px-1 rounded-sm mr-2">
                    {index + 1}
                  </p>
                  <p>{getCompleteYourProfileText(field)}</p>
                </div>
              ))}
            </div>
            <ProfileCompleteness percentage={parseInt(percentage)} />
          </div>
          <div className="bg-white rounded-md p-8 text-xs mt-4">
            <p className="font-bold text-lg">Profile</p>
            <p className="font-normal text-gray-400">
              Basic info, for a faster booking experience
            </p>
            {nonNullUserFields.map((field) => (
              <NonNullUserInput
                defaultValue={user ? user[field] : ''}
                field={field}
                key={field}
              />
            ))}
            {nullUserFields.map((field) => (
              <NullUserFieldInput field={field} key={field} />
            ))}
          </div>
          {!user?.hasOwnProperty('iss') && (
            <div className="bg-white rounded-md p-8 text-xs mt-4">
              <p className="font-bold text-lg">Login details</p>
              <p className="font-normal text-gray-400">
                Manage your email address mobile number and password
              </p>
              {/* {getNullUserFields(userData).map((field) => (
              <NullUserFieldInput field={field} key={field} />
            ))}
            {getNonNullUserFields(userData).map((field) => (
              <NonNullUserInput defaultValue={userData[field]} field={field} />
            ))} */}
            </div>
          )}
        </div>
      )}
      <div className="w-1/5">
        <UserProfileTabLarge className="w-full" />
        <button
          className="py-3 px-2 w-full text-white text-sm cursor-pointer rounded-full bg-blue-800 mt-5"
          onClick={() => setShowPaymentMethodsModal(true)}
        >
          Add Payment Method
        </button>
      </div>
    </div>
  );
};

export default UserProfileForm;

const googleAuthKeys: string[] = [
  'aud',
  'azp',
  'email_verified',
  'exp',
  'family_name',
  'given_name',
  'iat',
  'iss',
  'jti',
  'nbf',
  'sub',
];

const getNullUserFields = (user: User | undefined): string[] => {
  if (!user) {
    return [];
  }
  const keys = Object.keys(user);
  const myArray: string[] = [];
  keys.forEach((key) =>
    user[key] === null && !googleAuthKeys.includes(key)
      ? myArray.push(key)
      : null
  );
  return myArray;
};

const getNonNullUserFields = (user: User | undefined): string[] => {
  if (!user) {
    return [];
  }
  const keys = Object.keys(user);
  const myArray: string[] = [];
  keys.forEach((key) =>
    user[key] !== null && key !== 'picture' && !googleAuthKeys.includes(key)
      ? myArray.push(key)
      : null
  );

  return myArray;
};

const getCompleteYourProfileText = (field: string): string => {
  if (field === 'profilePicture') {
    return 'Upload your profile picture';
  } else if (field === 'birthday') {
    return 'Add your birthday';
  } else if (field === 'gender') {
    return 'Add your gender';
  } else if (field === 'address') {
    return 'Add your address';
  } else {
    return field;
  }
};
