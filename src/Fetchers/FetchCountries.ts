import axios from "axios";
import { type } from "os";

export type CountriesWithStateAndCities = {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  subregion: string;
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
  states: {
    id: number;
    name: string;
    country_id: 1;
    country_code: string;
    state_code: string;
    latitude: string;
    longitude: string;
  }[];
  timezones: {
    zoneName: string;
    gmtOffset: string;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
    country_id: 1;
  }[];
  translations: {
    kr: string;
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    cn: string;
  }[];
  cities: {
    id: 50;
    name: string;
    state_id: string;
    state_code: string;
    country_id: string;
    country_code: string;
    latitude: string;
    longitude: string;
  }[];
};

type FetchResponse = {
  data: {
    code: number;
    errors: null;
    message: string;
    result: {
      current_page: number;
      data: CountriesWithStateAndCities[];
      from: number;
      last_page: number;
      next_page_url: string;
      path: string;
      per_page: number;
      prev_page_url: string | null;
      to: number;
      total: number;
    };
  };
  status: boolean;
};

export const fetchCountries = async (): Promise<
  CountriesWithStateAndCities[]
> => {
  const options = {
    method: "GET",
    url: "https://countries-states-cities-dataset.p.rapidapi.com/list-countries-states-cities",
    headers: {
      "X-RapidAPI-Key": "6445ce28c1msh4b2afb9dc1a38bbp17a68bjsn97511bcb4bbf",
      "X-RapidAPI-Host": "countries-states-cities-dataset.p.rapidapi.com",
      "access-control-allow-origin": "*",
    },
  };

  let finalDataSet: CountriesWithStateAndCities[] = [];

  const firstCallResults: FetchResponse = await axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });

  let lastPage: number = firstCallResults.data.result.last_page;
  let currentPage: number = firstCallResults.data.result.current_page;
  let url: string = firstCallResults.data.result.next_page_url;
  finalDataSet = finalDataSet.concat(firstCallResults.data.result.data);

  while (currentPage !== lastPage) {
    await fetchNextResults(url).then((res) => {
      finalDataSet = finalDataSet.concat(res.data.result.data);
      currentPage = res.data.result.current_page;
      url = res.data.result.next_page_url;
    });
  }

  return finalDataSet;
};

const fetchNextResults = async (url: string): Promise<FetchResponse> => {
  const options = {
    method: "GET",
    url: url,
    headers: {
      "X-RapidAPI-Key": "6445ce28c1msh4b2afb9dc1a38bbp17a68bjsn97511bcb4bbf",
      "X-RapidAPI-Host": "countries-states-cities-dataset.p.rapidapi.com",
      "access-control-allow-origin": "*",
    },
  };
  const res: FetchResponse = await axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });

  return res;
};
