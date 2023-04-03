import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const AuthErrorMessage = ({
  message,
  setErrorMessage,
}: {
  message: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  return (
    <div className="py-3 px-2 border-2 border-red-300 absolute top-3 flex justify-between">
      <p className="text-xs">{message}</p>
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="text-red-500 ml-2 cursor-pointer"
        onClick={() => setErrorMessage(null)}
      />
    </div>
  );
};
