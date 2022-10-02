import React, { useState } from "react";
import "./App.css";
import { Assets } from "./Assets/Assets";
import BackGround from "./Components/BackGround/BackGround";
import BecomeAPartner from "./Components/BecomeAPartner";
import Menu from "./Components/Menu/Menu";
import Options from "./Components/Options";
import ProfileInfo from "./Components/ProfileInfo";
import SearchForm from "./Components/SearchForm";

function App() {
  const [activeChoice, setActiveChoice] = useState("flights");

  return (
    <div className="App w-full">
      <BackGround />
      <div className="flex relative">
        <Menu />
        <div className="z-50 h-min absolute top-1/4 left-1/4 w-2/3">
          <div className="flex justify-between">
            <Options
              activeChoice={activeChoice}
              setActiveChoice={setActiveChoice}
            />
            <img src={Assets.Plane} alt="Plane" className="w-40 h-14" />
          </div>
          {activeChoice === "flights" ? <SearchForm /> : null}
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
  );
}

export default App;
