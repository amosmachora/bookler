import { useContext } from "react";
import { MainContext } from "../../App";

export const HotelLocationPicker = () => {
  const { countriesList } = useContext(MainContext);
  const test = () => {
    for (const key in countriesList) {
      console.log(key);
    }
    // console.log("yes");
  };
  return (
    <div
      className="absolute top-0 right-1/2 translate-x-1/2 bg-white"
      onClick={() => test()}
    >
      Choose your target Location
    </div>
  );
};
