import React from "react";

type GoButtonProps = {
  setShowPayments: React.Dispatch<React.SetStateAction<boolean>>;
};

const GoButton = ({ setShowPayments }: GoButtonProps) => {
  return (
    <button
      className="w-28 h-9 bg-blue-700 text-white rounded-sm cursor-pointer ml-auto mr-auto block mt-4 hover:scale-110 transition-all"
      onClick={() => {
        setShowPayments(true);
      }}
    >
      Lets go 🚀
    </button>
  );
};

export default GoButton;
