import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";

import Flights from "./Components/Flights/Flights";
import Hotel from "./Components/Hotel/Hotel";
import Taxi from "./Components/Taxi/Taxi";
import FlightResults from "./Components/Flights/FlightResults";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/flights" element={<Flights />}>
            <Route path="flight-results" element={<FlightResults />} />
          </Route>
          <Route path="/hotels" element={<Hotel />} />
          <Route path="/taxi" element={<Taxi />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
