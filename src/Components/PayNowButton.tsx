import React from "react";
export function PayNowButton({
  onClick,
  value,
}: {
  onClick: React.Dispatch<React.SetStateAction<string>>;
  value: string;
}) {
  return (
    <button
      className="px-6 py-2 bg-blue-600 rounded-md text-[11px] text-white"
      onClick={() => onClick(value)}
    >
      PAY NOW
    </button>
  );
}
