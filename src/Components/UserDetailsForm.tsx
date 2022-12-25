import React from "react";
import { CountryCodeSelector } from "./Hotel/CountryCodeSelector";

export function UserDetailsForm({
  handleCountryCodeSelection,
  text,
}: {
  handleCountryCodeSelection: (x: string) => void;
  text: {
    textA: string;
    textB: string;
  };
}) {
  return (
    <div className="p-10 bg-white mt-1 rounded-md">
      <p className="text-xl font-bold">Your details</p>
      <p className="text-gray-400 leading-5 text-xs w-3/4">
        Whether you are in town for business or leisure, {text.textA} welcomes
        travelers to {text.textB} with exceptional service, spacious
      </p>
      <div className="flex justify-between mt-6">
        <div className="w-1/4">
          <p className="text-sm mb-3">Title</p>
          <select className="w-full bg-flightResultsBg py-3 px-2 rounded-md border text-sm">
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
          </select>
        </div>
        <div className="w-1/3">
          <p className="text-sm mb-3">First Name</p>
          <input
            type="text"
            className="w-full bg-flightResultsBg py-3 px-2 rounded-md border text-sm"
            placeholder="Enter your first name"
          />
        </div>
        <div className="w-1/3">
          <p className="text-sm mb-3">Last Name</p>
          <input
            type="text"
            className="w-full bg-flightResultsBg py-3 px-2 rounded-md border text-sm"
            placeholder="Enter your last name"
          />
        </div>
      </div>
      <div className="mt-6">
        <p>Email</p>
        <input
          type="email"
          className="w-full bg-flightResultsBg py-3 px-2 rounded-md border text-sm"
          placeholder="Email"
        />
      </div>
      <div className="flex mt-6 justify-between">
        <div className="w-1/4">
          <p className="text-sm mb-3">Country Code</p>
          <CountryCodeSelector handleChange={handleCountryCodeSelection} />
        </div>
        <div className="w-2/3">
          <p className="text-sm mb-3">Mobile</p>
          <input
            type="tel"
            className="w-full bg-flightResultsBg py-3 px-2 rounded-md border text-sm"
          />
        </div>
      </div>
      <div className="bg-covidBg py-5 px-4 rounded-md mt-2">
        <div className="flex justify-center items-center w-max">
          <input type="checkbox" className="h-5 w-5 mr-3" />
          <p className="text-sm font-bold">I have a coupon</p>
        </div>
        <input
          type="text"
          placeholder="Enter your coupon number"
          className="border-b text-sm w-5/6 mt-4 bg-covidBg border-black px-4 focus:border-none"
        />
      </div>
    </div>
  );
}
