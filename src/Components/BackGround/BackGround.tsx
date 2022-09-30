import React from "react";
import { Assets } from "../../Assets/Assets";
import "./BackGround.css";

const BackGround = () => {
  return (
    <div className="background-main fixed top-0 left-0 right-0 flex flex-row overflow-hidden w-full z-0">
      <img
        src={Assets.Cloud_1}
        alt="Cloud"
        className="absolute -top-[37%] right-[3%] w-2/3"
      />
      <img
        src={Assets.Cloud_2}
        alt="Cloud"
        className="absolute -left-[20%] w-1/2 -top-1/2"
      />
    </div>
  );
};

export default BackGround;
