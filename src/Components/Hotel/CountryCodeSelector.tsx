import React from "react";
import { useGlobalData } from "../../Hooks/useGlobalData";

export function CountryCodeSelector({
  handleChange,
}: {
  handleChange: (value: string) => void;
}) {
  const { countries } = useGlobalData();
  return (
    <select
      name="select-telephone"
      id="select-telephone"
      className="font-medium border bg-gray-100 py-3 px-3 rounded-md w-full text-xs"
      onChange={(e) => handleChange(e.target.value)}
    >
      {countries
        .sort((a, b) => {
          if (a.name.common < b.name.common) {
            return -1;
          }
          if (a.name.common > b.name.common) {
            return 1;
          }
          return 0;
        })
        .map((country, i) => (
          <option value={country.cioc} key={i} className="bg-gray-200">
            +{country.cioc} {country.name.common}
          </option>
        ))}
    </select>
  );
}
