import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import FlightResults from './Components/Flights/FlightResults';
import FlightSearchForm from './Components/Flights/FlightSearchForm';
import { FlightBookingReview } from './Components/Flights/FlightBookingReview';
import CarRentalSearchForm from './Components/CarRental/CarRentalSearchForm';
import CarDetails from './Components/CarRental/CarDetails';
import CarRentalResults from './Components/CarRental/CarRentalResults';
import CarRentalReview from './Components/CarRental/CarRentalReview';
import HotelSearchForm from './Components/Hotel/HotelSearchForm';
import HotelDetails from './Components/Hotel/HotelDetails';
import { HotelBookingReview } from './Components/Hotel/HotelBookingReview';
import UserProfileForm from './Components/UserProfileForm';
import LogIn from './Components/OnBoarding/LogIn';
import SignUp from './Components/OnBoarding/SignUp';
import { FlightDataProvider } from './Hooks/useFlightData';
import { CarRentalDataContextProvider } from './Hooks/useCarRentalData';
import { HotelDataContextProvider } from './Hooks/useHotelData';
import { HotelSearchResultsProvider } from './Components/Hotel/HotelSearchResultsProvider';
import { CarRentalSearchResultsProvider } from './Components/CarRental/CarRentalSearchResultsProvider';
import { HotelResults } from './Components/Hotel/HotelResults';
import { UserProvider } from './Hooks/useAuth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <FlightDataProvider>
          <CarRentalDataContextProvider>
            <HotelDataContextProvider>
              <CarRentalSearchResultsProvider>
                <HotelSearchResultsProvider>
                  <Routes>
                    <Route path="/" element={<App />}>
                      <Route
                        path="flights"
                        element={<FlightSearchForm />}
                        index
                      />
                      <Route
                        path="flights/flight-results"
                        element={<FlightResults />}
                      />

                      <Route
                        path="/flights/flight-results/:flightId"
                        element={<FlightBookingReview />}
                      />
                      <Route path="hotels" element={<HotelSearchForm />} />
                      <Route
                        element={<HotelResults />}
                        path="hotels/hotel-results"
                      />
                      <Route
                        path="/hotels/hotel-results/hotel-details"
                        element={<HotelDetails />}
                      />
                      <Route
                        path="/hotels/hotel-results/hotel-details/booking-review"
                        element={<HotelBookingReview />}
                      />
                      <Route
                        path="car-rental"
                        element={<CarRentalSearchForm />}
                      />
                      <Route
                        element={<CarRentalResults />}
                        path="car-rental/car-rental-results"
                      />
                      <Route
                        path="/car-rental/car-rental-results/car-details"
                        element={<CarDetails />}
                      />
                      <Route
                        path="/car-rental/car-rental-results/car-details/booking-review"
                        element={<CarRentalReview />}
                      />
                      <Route path="profile" element={<UserProfileForm />} />
                    </Route>
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/onboarding" element={<SignUp />} />
                  </Routes>
                </HotelSearchResultsProvider>
              </CarRentalSearchResultsProvider>
            </HotelDataContextProvider>
          </CarRentalDataContextProvider>
        </FlightDataProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

//FlightResults must have an outlet where <TravelerDetails/> will be rendered
