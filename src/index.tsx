import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Hotel from "./Components/Hotel/Hotel";
import Taxi from "./Components/Taxi/Taxi";
import FlightResults from "./Components/Flights/FlightResults";
import FlightSearchForm from "./Components/Flights/FlightSearchForm";
import TravelerDetails from "./Components/Flights/TravelerDetails";
import FlightsProvider from "./Components/Flights/FlightsProvider";
import MainAppProvider from "./Components/Contexts/MainAppProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainAppProvider>
        <FlightsProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="flights" element={<FlightSearchForm />} />
              <Route path="flights/flight-results" element={<FlightResults />}>
                <Route path=":flightId" element={<TravelerDetails />} />
              </Route>
              <Route path="hotels" element={<Hotel />} />
              <Route path="taxi" element={<Taxi />} />
            </Route>
          </Routes>
        </FlightsProvider>
      </MainAppProvider>
    </BrowserRouter>
  </React.StrictMode>
);

//FlightResults must have an outlet where <TravelerDetails/> will be rendered
