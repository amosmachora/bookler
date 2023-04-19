import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const LoadingScreen = ({ className }: { className?: string }) => {
  return (
    <div className="flex min-h-full w-full justify-center">
      <FontAwesomeIcon icon={faSpinner} spin className="mx-auto my-auto" />
    </div>
  );
};

export default LoadingScreen;
