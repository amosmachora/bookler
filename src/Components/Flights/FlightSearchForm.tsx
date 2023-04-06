import React, { useState } from 'react';
import { Assets } from '../../Assets/Assets';
import { isLinkClickable } from '../../Util/Helpers';
import { TypeOfTrip, useFlightDataContext } from '../../Hooks/useFlightData';
import { AirportPicker } from './AirportPicker';
import OffPageLink from '../OffPageLink';
import { useGlobalData } from '../../Hooks/useGlobalData';
import { DatePicker } from '../DatePicker';
import { MoreButton } from '../MoreButton';
import {
  AirportSearch,
  AirportSearchConfig,
} from '../SearchModals/AirportSearch.flights';

const takeOffLocationConfig: AirportSearchConfig = {
  inputPlaceHolder: 'Search your desired take off location',
  mainText: 'From Airport',
  searching: 'origin-airport',
};
const destinationLocationConfig: AirportSearchConfig = {
  inputPlaceHolder: 'Search your decided landing location',
  mainText: 'To airport',
  searching: 'destination-airport',
};

const FlightSearchForm = () => {
  const { menuWide } = useGlobalData();
  const { userFlightChoices, setUserFlightChoices } = useFlightDataContext();
  const [showSearchModal, setShowSearchModal] = useState(false);

  const [config, setConfig] = useState<AirportSearchConfig>(
    takeOffLocationConfig
  );

  const openFromSearchModal = () => {
    setConfig(takeOffLocationConfig);
    setShowSearchModal(true);
  };

  const openToSearchModal = () => {
    setConfig(destinationLocationConfig);
    setShowSearchModal(true);
  };

  const isClickable: boolean = isLinkClickable(
    userFlightChoices?.departureDate,
    userFlightChoices?.fromAirport,
    userFlightChoices?.toAirport,
    userFlightChoices?.returnDate
  );

  const setUserTypeOfTrip = (str: TypeOfTrip) => {
    setUserFlightChoices((prev) => {
      return {
        ...prev,
        typeOfTrip: str,
      };
    });
  };

  return (
    <div className={`bg-white p-10 rounded-2xl ${menuWide ? 'mt-5' : 'mt-10'}`}>
      {showSearchModal && (
        <AirportSearch config={config} closeFunction={setShowSearchModal} />
      )}
      <div className="flex [&>*]:rounded-full [&>*]:text-sm [&>*]:py-2 [&>*]:px-6 [&>*]:mr-8 [&>*]:cursor-pointer">
        <p
          className={`${
            userFlightChoices?.typeOfTrip === 'one-way' ? 'bg-gray-100' : ''
          }`}
          onClick={() => setUserTypeOfTrip('one-way')}
        >
          One way
        </p>
        <p
          className={`${
            userFlightChoices?.typeOfTrip === 'round-trip' ? 'bg-gray-100' : ''
          }`}
          onClick={() => setUserTypeOfTrip('round-trip')}
        >
          Round Trip
        </p>
        <p
          className={`${
            userFlightChoices?.typeOfTrip === 'multi-city' ? 'bg-gray-100' : ''
          }`}
          onClick={() => setUserTypeOfTrip('multi-city')}
        >
          Multi City
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mt-5 [&>*]:rounded-lg [&>*]:cursor-pointer">
        <AirportPicker
          airport={userFlightChoices.fromAirport}
          name="FROM"
          onClick={openFromSearchModal}
        />
        <AirportPicker
          airport={userFlightChoices.toAirport}
          name="TO"
          onClick={openToSearchModal}
        />
        <div className="flex-grow px-4 py-2 bg-gray-100">
          <div className="flex">
            <img src={Assets.Class} alt="Location Pointer" />
            <p className="text-gray-400 text-xs ml-1">CLASS</p>
          </div>
          <p className="from-location text-base font-bold mb-1">3 Persons</p>
          <div className="from-airport text-xs text-gray-400 w-full flex">
            <p>Business</p>
            <img src={Assets.DropDownGray} alt="Drop down" />
          </div>
        </div>
        <DatePicker
          date={userFlightChoices!.departureDate}
          name="Departure"
          source="Flights"
          type="departure-date"
          className="w-1/5"
        />
        <DatePicker
          date={userFlightChoices!.returnDate}
          name="return"
          source="Flights"
          type="return-date"
        />
        <MoreButton />
        <OffPageLink to="flight-results" isClickable={isClickable}>
          SEARCH FLIGHT
        </OffPageLink>
      </div>
    </div>
  );
};

export default FlightSearchForm;
