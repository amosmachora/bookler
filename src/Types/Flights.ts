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

type country = {
  name: string;
  code: string;
  id: number;
};

type aircraftImage = {
  src: string;
  link: string;
  copyright: string;
  source: string;
};

export type SingleFlightData = {
  result: {
    request: {
      callback: null;
      device: string;
      fetchBy: string;
      filterBy: null;
      format: string;
      limit: number;
      olderThenFlightId: null;
      page: number;
      pk: null;
      query: string;
      timestamp: null;
      token: null;
    };
    response: {
      item: {
        current: number;
        total: null;
        limit: number;
      };
      page: {
        current: number;
        total: null;
        limit?: number;
      };
      timestamp: number;
      data: {
        identification: {
          id: null | string;
          row: number;
          number: {
            default: string;
            alternative: null;
          };
          callsign: null | string;
          codeshare: null;
        };
        status: {
          live: boolean;
          text: string;
          icon: null | string;
          estimated: null;
          ambiguous: boolean;
          generic: {
            status: {
              text: string;
              type: string;
              color: string;
              diverted: null;
            };
            eventTime: {
              utc: null | number;
              local: null | number;
            };
          };
        };
        aircraft: {
          model: {
            code: string;
            text: null | string;
          };
          hex: null | string;
          registration: null | string;
          serialNo: null;
          age: null | {
            availability: boolean;
          };
          restricted: null | boolean;
          availability: {
            serialNo: null | boolean;
            age: null | boolean;
          };
        };
        owner: null | { name: string; code: { iata: string; icao: string } };
        airline: {
          name: string;
          code: {
            iata: string;
            icao: string;
          };
        };
        airport: {
          origin: {
            name: string;
            code: {
              iata: string;
              icao: string;
            };
            position: {
              latitude: number;
              longitude: number;
              country: country;
              region: {
                city: string;
              };
            };
          };
          destination: {
            name: string;
            code: {
              iata: string;
              icao: string;
            };
            position: {
              latitude: number;
              longitude: number;
              country: country;
              region: {
                city: string;
              };
            };
            timezone: {
              name: string;
              offset: number;
              abbr: string;
              abbrName: null;
              isDst: boolean;
            };
            visible: boolean;
          };
          real: null;
        };
        time: {
          scheduled: {
            departure: number;
            arrival: number;
          };
          real: {
            departure: null | number;
            arrival: null | number;
          };
          estimated: {
            departure: null | number;
            arrival: null | number;
          };
          other: {
            eta: null | number;
            updated: number;
            duration: null | number;
          };
        };
      }[];
      aircraftInfo: null;
      aircraftImages: {
        registration: string;
        images: {
          thumbnails: aircraftImage[];
          medium: aircraftImage[];
          large: aircraftImage[];
        };
      }[];
    };
  };
};
