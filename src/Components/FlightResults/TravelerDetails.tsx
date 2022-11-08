import React, { useEffect, useState } from "react";
import axios from "axios";
type Country = {
  code: string;
  continent: string;
  currencyCode: string;
  dialCode: string;
  flag: string;
  name: string;
};

const TravelerDetails = () => {
  const [countryList, setCountryList] = useState<Country[]>([]);

  const fetchCountryCode = () => {
    const options = {
      method: "GET",
      url: "https://country-info.p.rapidapi.com/",
      headers: {
        "X-RapidAPI-Key": "c890ab4a16msh7c633ea6110821ap1e3f64jsn0ed6b1319c46",
        "X-RapidAPI-Host": "country-info.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setCountryList(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchCountryCode();
  }, []);

  return (
    <div className="py-7 px-9 bg-white mb-9 grid rounded-lg">
      <p className="font-bold text-lg">Traveler Details</p>
      <div className="flex w-full relative">
        <input
          type="text"
          placeholder="Adult"
          className="w-full border h-12 rounded-md py-2 px-5 text-sm bg-gray-100"
        />
        <p
          className="text-blue-700 absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          onClick={() => console.log("Yoh bitch!")}
        >
          + Add
        </p>
      </div>
      <div className="flex justify-between">
        <div className="w-1/4">
          <p className="font-medium text-sm my-4 mx-2">Country-Code</p>
          <select
            name="select-telephone"
            id="select-telephone"
            className="font-medium border bg-gray-100 py-4 px-3 rounded-md w-full text-xs"
          >
            {countryList.map((country) => (
              <option value={country.code} className="bg-gray-200">
                +{country.code} ({country.name})
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/3">
          <p className="font-medium text-sm my-4 mx-2">Mobile</p>
          <input
            type="tel"
            name="tel"
            id="tel"
            className="border bg-gray-100 py-4 px-3 text-xs rounded-md w-full"
            placeholder="+8801 4454 4544"
          />
        </div>
        <div className="w-1/3">
          <p className="font-medium text-sm my-4 mx-2">Email</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="font-medium text-xs border bg-gray-100 py-4 px-3 rounded-md w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TravelerDetails;
