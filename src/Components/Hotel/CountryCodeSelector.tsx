import React from 'react';
import { useGlobalData } from '../../Hooks/useGlobalData';

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
      className="font-medium bg-gray-100 p-3 border-b border-gray-400 w-full text-xs outline-none"
      onChange={(e) => handleChange(e.target.value)}
      placeholder="country"
    >
      <option value="null">Country</option>
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
