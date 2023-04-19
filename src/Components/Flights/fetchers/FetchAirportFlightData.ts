import { Airport, Departures } from '../../../Types/Flights';
import axios from 'axios';
import DevAirportFlightData from '../../../Util/AirportFlightData.json';

function getZeroPadded(secondDateHour: number) {
  if (secondDateHour.toString().length !== 2) {
    return 0 + secondDateHour.toString();
  }
  return secondDateHour.toString();
}

/**
 * A function to get the required search dates
 * @Returns [firstDate, secondDate]
 */
const getSearchDates = () => {
  const todaysDate = new Date();
  const firstDate = todaysDate.toISOString().substring(0, 16);

  let secondDateHour = 0;
  if (todaysDate.getUTCHours() >= 12) {
    secondDateHour = todaysDate.getUTCHours() + 12 - 24;
  } else {
    secondDateHour = todaysDate.getUTCHours() + 12;
  }
  const secondDate =
    firstDate.substring(0, 11) +
    getZeroPadded(secondDateHour) +
    firstDate.substring(13);

  return {
    firstDate,
    secondDate,
  };
};

export const fetchAirportFlightData = async (
  fromAirport: Airport
): Promise<Departures[]> => {
  console.log('Searching data for ' + fromAirport.name);
  const options = {
    method: 'GET',
    // url: `https://aerodatabox.p.rapidapi.com/flights/airports/icao/${
    //   fromAirport.icao
    // }/${getSearchDates().firstDate}/${getSearchDates().secondDate}`,
    url: 'https://fakeUrl',
    params: {
      withLeg: 'true',
      withCancelled: 'true',
      withCodeshared: 'true',
      withCargo: 'true',
      withPrivate: 'true',
      withLocation: 'false',
    },
    headers: {
      'X-RapidAPI-Key': 'c890ab4a16msh7c633ea6110821ap1e3f64jsn0ed6b1319c46',
      'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com',
    },
  };

  return await axios
    .request(options)
    .then(function (response) {
      return response.data.departures;
    })
    .catch(function (error) {
      console.error(error);
      return DevAirportFlightData.departures;
    });
};
