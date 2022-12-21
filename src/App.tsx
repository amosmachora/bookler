import React, { useState, useEffect, createContext, useRef } from "react";
import { Assets } from "./Assets/Assets";
import BackGround from "./Components/BackGround/BackGround";
import BecomeAPartner from "./Components/BecomeAPartner";
import FlightResults from "./Components/Flights/FlightResults";
import Menu from "./Components/Menu/Menu";
import Options from "./Components/Options";
import Overlay from "./Components/Overlay";
import ProfileInfo from "./Components/ProfileInfo";
import Reach from "./Components/Reach/Reach";
import SearchForm from "./Components/SearchForm";
import DevAirports from "./Util/Airports.json";
import DevAirportFlightData from "./Util/AirportFlightData.json";
import { Airline, Airport, Country, Departures } from "./Types/Flights";
import { fetchAirportFlightData } from "./Fetchers/FetchAirportFlightData";
import { fetchAirports } from "./Fetchers/FetchAirports";
import {
  HotelSearch,
  MainContextValue,
  FlightSearchParametersContext,
  CarRentalSearch,
} from "./Types/Contexts";
import Airlines from "./Util/Airlines.json";
import { fetchAirlines } from "./Fetchers/FetchAirlines";
import HotelSearchForm from "./Components/Hotel/HotelSearchForm";
import HotelSearchResults from "./Components/Hotel/HotelSearchResults";
import FlightSearchParameters from "./Components/Flights/FlightSearchParameters";
import { TravellerHotelInfo } from "./Types/Hotel";
import { fetchCountryList } from "./Fetchers/FetchCountryList";
import CarRentalSearchForm from "./Components/CarRental/CarRentalSearchForm";
import CarRentalSearchResults from "./Components/CarRental/CarRentalSearchResults";

export const FlightSearchContext = createContext<FlightSearchParametersContext>(
  {
    toAirport: {
      alt: 0,
      city: "",
      country: "",
      countryId: 0,
      iata: "",
      icao: "",
      id: 0,
      lat: 0,
      lon: 0,
      name: "",
      size: 0,
      timezone: null,
    },
    returnDate: null,
    departureDate: null,
    typeOfTrip: "",
    fromAirport: {
      alt: 0,
      city: "",
      country: "",
      countryId: 0,
      iata: "",
      icao: "",
      id: 0,
      lat: 0,
      lon: 0,
      name: "",
      size: 0,
      timezone: null,
    },
    outGoingFlights: [],
  }
);

export const MainContext = createContext<MainContextValue>({
  isLoading: false,
  airports: [],
  airlines: [],
  devMode: false,
  searchAirports: [],
  setSearchAirports: () => {},
  countryList: [],
});

export const HotelSearchContext = createContext<HotelSearch>(null as any);
export const CarRentalSearchContext = createContext<CarRentalSearch>(
  null as any
);

function App() {
  const [activeChoice, setActiveChoice] = useState("flights");
  const [overlay, setOverlay] = useState(false);
  const [airports, setAirports] = useState<Airport[]>(DevAirports.rows);
  const [isLoading, setIsLoading] = useState(false);
  const [menuWide, setMenuWide] = useState(true);
  const [typeOfTrip, setTypeOfTrip] = useState("one-way");
  const [fromAirport, setFromAirport] = useState<Airport>(airports[0]);
  const [toAirport, setToAirport] = useState<Airport>(airports[0]);
  const [departureDate, setDepartureDate] = useState<Date | null>();
  const [returnDate, setReturnDate] = useState<Date | null>();
  const [devMode, setDevMode] = useState(true);
  const [searchAirports, setSearchAirports] = useState<Airport[]>(airports);
  const [searchType, setSearchType] = useState("from");
  const [outGoingFlights, setOutGoingFlights] = useState<Departures[]>(
    DevAirportFlightData.departures
  );
  const [airlines, setAirlines] = useState<Airline[]>(Airlines.rows);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [targetHotelLocation, setTargetHotelLocation] =
    useState<Airport | null>(null);
  // const [countriesList, setCountriesList] = useState<
  //   CountriesWithStateAndCities[]
  // >([]);
  const [travellerHotelInfo, setTravellerHotelInfo] =
    useState<TravellerHotelInfo>({
      Rooms: 1,
      adults: 0,
      kids: 0,
    });
  const travelingForWorkCheckBox = useRef<HTMLInputElement | null>(null);
  const [countryList, setCountryList] = useState<Country[]>([]);

  const [pickUpDate, setPickUpDate] = useState<Date | null>(null);
  const [dropOffDate, setDropOffDate] = useState<Date | null>(null);
  const [pickUpTime, setPickUpTime] = useState<string>("");
  const [dropOffTime, setDropOffTime] = useState<string>("");
  const [dropCarAtDifferentLocation, setDropCarAtDifferentLocation] =
    useState<boolean>(false);

  useEffect(() => {
    const initializeApplication = async () => {
      await fetchAirports().then((res) => setAirports(res));
      await fetchCountryList().then((res) => setCountryList(res));
      // await fetchCountries().then((res) => setCountriesList(res));
      setAirlines(fetchAirlines());
    };
    if (!devMode) {
      setIsLoading(true);
      initializeApplication();
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[], devMode]);

  useEffect(() => {
    if (!devMode) {
      const outGoingFlights = fetchAirportFlightData(fromAirport);
      if (outGoingFlights.length === 0) {
        setDevMode(true);
      } else {
        setOutGoingFlights(outGoingFlights);
      }
    }
  }, [fromAirport, devMode]);

  /**
   * A function to randomly decide a default airport.
   * @Returns A random airport object.
   */
  function getRandomAirport() {
    const min = 0;
    const max = airports.length;
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    const randomAirport = airports[randomNumber];
    return randomAirport;
  }

  useEffect(() => {
    setFromAirport(getRandomAirport());
    setToAirport(getRandomAirport());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [airports.length]);

  const renderTab = (): JSX.Element | undefined => {
    if (activeChoice === "flights") {
      return (
        <FlightSearchContext.Provider
          value={{
            typeOfTrip,
            fromAirport,
            departureDate,
            returnDate,
            toAirport,
            outGoingFlights,
          }}
        >
          <SearchForm
            setMenuWide={setMenuWide}
            menuWide={menuWide}
            setToAirport={setToAirport}
            setFromAirport={setFromAirport}
            setTypeOfTrip={setTypeOfTrip}
            setDepartureDate={setDepartureDate}
            setReturnDate={setReturnDate}
            setSearchType={setSearchType}
            searchType={searchType}
            typeOfTrip={typeOfTrip}
            searchAirports={searchAirports}
            outGoingFlights={outGoingFlights}
          />
        </FlightSearchContext.Provider>
      );
    } else if (activeChoice === "hotel") {
      return (
        <HotelSearchContext.Provider
          value={{
            checkInDate,
            checkOutDate,
            setCheckInDate,
            setCheckOutDate,
            targetHotelLocation,
            setTargetHotelLocation,
            travellerHotelInfo,
            setTravellerHotelInfo,
          }}
        >
          <HotelSearchForm
            toAirport={toAirport}
            setMenuWide={setMenuWide}
            travelingForWorkCheckBox={travelingForWorkCheckBox}
          />
        </HotelSearchContext.Provider>
      );
    } else if (activeChoice === "taxi") {
      return (
        <CarRentalSearchContext.Provider
          value={{
            pickUpDate,
            setPickUpDate,
            dropOffDate,
            setDropOffDate,
            pickUpTime,
            setPickUpTime,
            dropOffTime,
            setDropOffTime,
            dropCarAtDifferentLocation,
            setDropCarAtDifferentLocation,
          }}
        >
          <CarRentalSearchForm setMenuWide={setMenuWide} />
        </CarRentalSearchContext.Provider>
      );
    }
  };

  const renderResults = (): JSX.Element | undefined => {
    if (activeChoice === "flights") {
      return (
        <FlightSearchContext.Provider
          value={{
            typeOfTrip,
            fromAirport,
            departureDate,
            returnDate,
            toAirport,
            outGoingFlights,
          }}
        >
          <FlightSearchParameters />
          <FlightResults />
        </FlightSearchContext.Provider>
      );
    } else if (activeChoice === "hotel") {
      return (
        <HotelSearchContext.Provider
          value={{
            checkInDate,
            checkOutDate,
            setCheckInDate,
            setCheckOutDate,
            targetHotelLocation,
            setTargetHotelLocation,
            travellerHotelInfo,
            setTravellerHotelInfo,
          }}
        >
          <HotelSearchResults
            travelingForWorkCheckBox={travelingForWorkCheckBox}
          />
        </HotelSearchContext.Provider>
      );
    } else if (activeChoice === "taxi") {
      return (
        <CarRentalSearchContext.Provider
          value={{
            pickUpDate,
            setPickUpDate,
            dropOffDate,
            setDropOffDate,
            pickUpTime,
            setPickUpTime,
            dropOffTime,
            setDropOffTime,
            dropCarAtDifferentLocation,
            setDropCarAtDifferentLocation,
          }}
        >
          <CarRentalSearchResults />;
        </CarRentalSearchContext.Provider>
      );
    }
  };

  return (
    <MainContext.Provider
      value={{
        isLoading,
        airports,
        airlines,
        devMode,
        countryList,
        searchAirports,
        setSearchAirports,
      }}
    >
      <div className="App w-full">
        {overlay && <Overlay setOverlay={setOverlay} />}
        {isLoading && (
          <>
            <Overlay setOverlay={setOverlay} />
            <Reach />
          </>
        )}
        <BackGround menuWide={menuWide} />
        <div className="flex relative">
          <Menu menuWide={menuWide} setMenuWide={setMenuWide} />
          <div
            className={`h-min ${
              menuWide
                ? "top-1/4 left-1/4 w-2/3 fixed"
                : "top-[34px] left-[12%] w-[87%] absolute"
            } transition-all`}
          >
            <div className="flex justify-between">
              <Options
                activeChoice={activeChoice}
                setActiveChoice={setActiveChoice}
                menuWide={menuWide}
              />
              {menuWide && (
                <img src={Assets.Plane} alt="Plane" className="w-40 h-14" />
              )}
            </div>
            {menuWide ? renderTab() : renderResults()}
          </div>
        </div>
        <div className="flex absolute right-14 top-[34px]">
          <BecomeAPartner />
          <ProfileInfo
            profilePicture={Assets.ProfilePicture}
            userName="Mansurul Haque"
          />
        </div>
      </div>
    </MainContext.Provider>
  );
}

export default App;
