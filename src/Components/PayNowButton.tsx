import React from "react";
import { Link } from "react-router-dom";

export function PayNowButton({ linkTo }: { linkTo: string }) {
  return (
    <Link
      className="px-6 py-2 bg-blue-600 rounded-md text-[11px] text-white"
      to={linkTo}
    >
      PAY NOW
    </Link>
  );
}
