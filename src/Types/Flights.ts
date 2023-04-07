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

export type ExtraFlightData = {
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

export interface Country {
  name: Name;
  tld?: string[];
  cca2: string;
  ccn3?: string;
  cca3: string;
  cioc?: string;
  independent?: boolean;
  status: Status;
  unMember: boolean;
  currencies?: Currencies;
  idd: Idd;
  capital?: string[];
  altSpellings: string[];
  region: Region;
  subregion?: string;
  languages?: { [key: string]: string };
  translations: { [key: string]: Translation };
  latlng: number[];
  landlocked: boolean;
  borders?: string[];
  area: number;
  demonyms?: Demonyms;
  flag: string;
  maps: Maps;
  population: number;
  gini?: { [key: string]: number };
  fifa?: string;
  car: Car;
  timezones: string[];
  continents: Continent[];
  flags: Flags;
  coatOfArms: CoatOfArms;
  startOfWeek: StartOfWeek;
  capitalInfo: CapitalInfo;
  postalCode?: PostalCode;
}

export interface CapitalInfo {
  latlng?: number[];
}

export interface Car {
  signs?: string[];
  side: Side;
}

export enum Side {
  Left = 'left',
  Right = 'right',
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}

export enum Continent {
  Africa = 'Africa',
  Antarctica = 'Antarctica',
  Asia = 'Asia',
  Europe = 'Europe',
  NorthAmerica = 'North America',
  Oceania = 'Oceania',
  SouthAmerica = 'South America',
}

export interface Currencies {
  GTQ?: Aed;
  SGD?: Aed;
  BAM?: BAM;
  MVR?: Aed;
  EUR?: Aed;
  AUD?: Aed;
  JOD?: Aed;
  BDT?: Aed;
  USD?: Aed;
  DZD?: Aed;
  BTN?: Aed;
  INR?: Aed;
  STN?: Aed;
  XAF?: Aed;
  XPF?: Aed;
  NOK?: Aed;
  TVD?: Aed;
  KHR?: Aed;
  MUR?: Aed;
  CDF?: Aed;
  PAB?: Aed;
  NIO?: Aed;
  SLL?: Aed;
  BBD?: Aed;
  ILS?: Aed;
  MAD?: Aed;
  MRU?: Aed;
  XCD?: Aed;
  RWF?: Aed;
  TRY?: Aed;
  MZN?: Aed;
  NGN?: Aed;
  RUB?: Aed;
  CUC?: Aed;
  CUP?: Aed;
  GBP?: Aed;
  JEP?: Aed;
  CRC?: Aed;
  CKD?: Aed;
  NZD?: Aed;
  PGK?: Aed;
  HNL?: Aed;
  MOP?: Aed;
  TTD?: Aed;
  GMD?: Aed;
  MMK?: Aed;
  EGP?: Aed;
  LBP?: Aed;
  KES?: Aed;
  PHP?: Aed;
  KZT?: Aed;
  ARS?: Aed;
  TJS?: Aed;
  AZN?: Aed;
  RON?: Aed;
  CLP?: Aed;
  CVE?: Aed;
  BGN?: Aed;
  UYU?: Aed;
  MKD?: Aed;
  AFN?: Aed;
  BWP?: Aed;
  CAD?: Aed;
  QAR?: Aed;
  YER?: Aed;
  SOS?: Aed;
  SEK?: Aed;
  CHF?: Aed;
  SHP?: Aed;
  MGA?: Aed;
  UAH?: Aed;
  IRR?: Aed;
  PLN?: Aed;
  VUV?: Aed;
  PEN?: Aed;
  SZL?: Aed;
  ZAR?: Aed;
  DJF?: Aed;
  HTG?: Aed;
  SYP?: Aed;
  GIP?: Aed;
  MXN?: Aed;
  ISK?: Aed;
  FJD?: Aed;
  KPW?: Aed;
  SBD?: Aed;
  GNF?: Aed;
  BHD?: Aed;
  GEL?: Aed;
  RSD?: Aed;
  XOF?: Aed;
  MNT?: Aed;
  DKK?: Aed;
  ETB?: Aed;
  LYD?: Aed;
  NAD?: Aed;
  MDL?: Aed;
  BOB?: Aed;
  DOP?: Aed;
  ANG?: Aed;
  IDR?: Aed;
  BYN?: Aed;
  LRD?: Aed;
  AMD?: Aed;
  ALL?: Aed;
  SSP?: Aed;
  GGP?: Aed;
  AED?: Aed;
  CZK?: Aed;
  PKR?: Aed;
  JMD?: Aed;
  KMF?: Aed;
  FKP?: Aed;
  TMT?: Aed;
  BND?: Aed;
  GHS?: Aed;
  KWD?: Aed;
  ERN?: Aed;
  ZWL?: Aed;
  TZS?: Aed;
  BZD?: Aed;
  SAR?: Aed;
  COP?: Aed;
  MYR?: Aed;
  BMD?: Aed;
  WST?: Aed;
  UGX?: Aed;
  NPR?: Aed;
  PYG?: Aed;
  FOK?: Aed;
  ZMW?: Aed;
  IMP?: Aed;
  KGS?: Aed;
  HKD?: Aed;
  VND?: Aed;
  JPY?: Aed;
  BRL?: Aed;
  GYD?: Aed;
  CNY?: Aed;
  AWG?: Aed;
  LAK?: Aed;
  VES?: Aed;
  HUF?: Aed;
  TOP?: Aed;
  IQD?: Aed;
  THB?: Aed;
  TND?: Aed;
  BIF?: Aed;
  KID?: Aed;
  SDG?: BAM;
  UZS?: Aed;
  LKR?: Aed;
  SRD?: Aed;
  AOA?: Aed;
  KYD?: Aed;
  LSL?: Aed;
  MWK?: Aed;
  BSD?: Aed;
  SCR?: Aed;
  TWD?: Aed;
  KRW?: Aed;
  OMR?: Aed;
}

export interface Aed {
  name: string;
  symbol: string;
}

export interface BAM {
  name: string;
}

export interface Demonyms {
  eng: Eng;
  fra?: Eng;
}

export interface Eng {
  f: string;
  m: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

export interface Idd {
  root?: string;
  suffixes?: string[];
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName?: { [key: string]: Translation };
}

export interface Translation {
  official: string;
  common: string;
}

export interface PostalCode {
  format: string;
  regex?: string;
}

export enum Region {
  Africa = 'Africa',
  Americas = 'Americas',
  Antarctic = 'Antarctic',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
}

export enum StartOfWeek {
  Monday = 'monday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}

export enum Status {
  OfficiallyAssigned = 'officially-assigned',
  UserAssigned = 'user-assigned',
}

export type Adult = {
  name: string | undefined;
  category: string;
};

export type TravelerInfo = {
  adultList?: Adult[];
  country?: Country;
  mobile?: string;
  email?: string;
};
