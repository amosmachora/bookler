import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import FlightResults from "./Components/Flights/FlightResults";
import FlightSearchForm from "./Components/Flights/FlightSearchForm";
import TravelerDetails from "./Components/Flights/TravelerDetails";
import FlightsProvider from "./Components/Flights/FlightsProvider";
import MainAppProvider from "./Components/Contexts/MainAppProvider";
import CarRentalSearchForm from "./Components/CarRental/CarRentalSearchForm";
import CarRentalProvider from "./Components/CarRental/CarRentalProvider";
import CarDetails from "./Components/CarRental/CarDetails";
import CarRentalSearchResultsProvider from "./Components/CarRental/CarRentalSearchResultsProvider";
import CarRentalResults from "./Components/CarRental/CarRentalResults";
import CarRentalReview from "./Components/CarRental/CarRentalReview";
import HotelProvider from "./Components/Hotel/HotelProvider";
import HotelSearchForm from "./Components/Hotel/HotelSearchForm";
import HotelSearchResults from "./Components/Hotel/HotelSearchResults";
import HotelDetails from "./Components/Hotel/HotelDetails";
import HotelResults from "./Components/Hotel/HotelResults";
import BookingReview from "./Components/Hotel/BookingReview";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainAppProvider>
        <FlightsProvider>
          <CarRentalProvider>
            <HotelProvider>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route element={<FlightSearchForm />} index />
                  <Route path="flights" element={<FlightSearchForm />} index />
                  <Route
                    path="flights/flight-results"
                    element={<FlightResults />}
                  >
                    <Route path=":flightId" element={<TravelerDetails />} />
                  </Route>
                  <Route path="hotels" element={<HotelSearchForm />} />
                  <Route
                    path="hotels/hotel-results"
                    element={<HotelSearchResults />}
                  >
                    <Route element={<HotelResults />} index />
                    <Route path="hotel-details" element={<HotelDetails />} />
                    <Route
                      path="hotel-details/booking-review"
                      element={<BookingReview />}
                    />
                  </Route>
                  <Route path="car-rental" element={<CarRentalSearchForm />} />
                  <Route
                    path="car-rental/car-rental-results"
                    element={<CarRentalSearchResultsProvider />}
                  >
                    <Route element={<CarRentalResults />} index />
                    <Route path="car-details" element={<CarDetails />} />
                    <Route
                      path="car-details/booking-review"
                      element={<CarRentalReview />}
                    />
                  </Route>
                </Route>
              </Routes>
            </HotelProvider>
          </CarRentalProvider>
        </FlightsProvider>
      </MainAppProvider>
    </BrowserRouter>
  </React.StrictMode>
);

//FlightResults must have an outlet where <TravelerDetails/> will be rendered
