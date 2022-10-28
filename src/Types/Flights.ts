type timezone = {
  abbr: string;
  abbrName: string | null;
  isDst: boolean;
  name: string;
  offset: number | null;
  offsetHours: string;
};

export type Airport = {
  alt: number | string;
  city: string;
  country: string;
  countryId: number;
  iata: string;
  icao: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
  size: number;
  timezone: timezone | null;
};

type aircraft = {
  reg?: string | undefined;
  modeS?: string | undefined;
  model: string;
};

type airline = {
  name: string;
};

type airportMin = {
  iata?: string | undefined;
  icao?: string;
  name: string;
};

type arrival = {
  actualTimeLocal?: string | undefined;
  actualTimeUtc?: string | undefined;
  baggageBelt?: string;
  gate?: string | undefined;
  quality: Array<string>;
  runwayTimeLocal?: string | undefined;
  scheduledTimeLocal?: string;
  scheduledTimeUtc?: string;
  terminal?: string | undefined;
};

type departure = {
  airport: airportMin;
  quality: Array<string>;
  actualTimeLocal?: string;
  actualTimeUtc?: string;
  gate?: string | undefined;
  scheduledTimeLocal?: string;
  scheduledTimeUtc?: string;
  terminal?: string;
};

export type Arrival = {
  aircraft: aircraft;
  airline: airline;
  arrival: arrival;
  codeshareStatus: string;
  departure: departure;
  isCargo: boolean;
  number: string;
  status: string;
};

type departure2 = {
  actualTimeLocal?: string | undefined;
  actualTimeUtc?: string;
  checkInDesk?: string | undefined;
  gate?: string | undefined;
  quality: Array<string>;
  scheduledTimeLocal?: string;
  scheduledTimeUtc?: string;
  terminal?: string | undefined;
};

type arrival2 = {
  airport: airportMin;
  quality: Array<string>;
};

export type Departures = {
  aircraft: aircraft;
  airline: airline;
  arrival: arrival2;
  departure: departure2;
  isCargo: boolean;
  number: string;
  status: string;
};

export type Airline = {
  Name: string;
  Code: string;
  ICAO: string;
};
