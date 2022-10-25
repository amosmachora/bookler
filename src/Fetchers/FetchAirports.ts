import { Airport } from "../Types/Flights";

export const fetchAirports = async (): Promise<Airport[]> => {
  let airports: Airport[] = [];

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "c890ab4a16msh7c633ea6110821ap1e3f64jsn0ed6b1319c46",
      "X-RapidAPI-Host": "flight-radar1.p.rapidapi.com",
    },
  };

  return fetch("https://flight-radar1.p.rapidapi.com/airports/list", options)
    .then((response) => response.json())
    .then((response) => {
      return (airports = response.rows);
    })
    .catch((err) => {
      console.error(err);
    });
};
