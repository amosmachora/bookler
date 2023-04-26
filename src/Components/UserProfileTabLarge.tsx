import { faUserGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

export function UserProfileTabLarge({ className }: { className: string }) {
  const { userCredential } = useAuth();
  const user = userCredential?.user;

  return (
    <div
      className={`${className} bg-white rounded-md h-max overflow-hidden flex flex-col items-center`}
    >
      <p className="bg-flightResultsBg font-semibold px-5 py-2 w-full">
        Profile
      </p>
      {user?.photoURL ? (
        <img
          src={user.photoURL}
          alt="Profile"
          className="rounded-full h-24 w-24 my-5"
        />
      ) : (
        <FontAwesomeIcon
          icon={faUserGear}
          className="h-24 w-24 my-5 text-blueBgMain mx-auto"
        />
      )}
      <p className="text-base font-bold">{user?.displayName ?? 'User'}</p>
      <p className="text-xs">User</p>
      <Link
        className="bg-gray-200 text-xs rounded-full py-2 px-3 font-semibold mt-4 mb-6 mx-auto"
        to={'/profile'}
      >
        Edit profile
      </Link>
    </div>
  );
}
