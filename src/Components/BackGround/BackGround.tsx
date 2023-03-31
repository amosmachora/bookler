import React from "react";
import { Assets } from "../../Assets/Assets";
import { useGlobalData } from "../../Hooks/useGlobalData";
import "./BackGround.css";

const BackGround = () => {
  const { menuWide } = useGlobalData();
  return (
    <div
      className={` fixed top-0 left-0 right-0 flex flex-row overflow-hidden w-full z-0 ${
        menuWide ? "h-[50vh] bg-blueBgMain" : "h-[18vh] bg-blueBgMainSm"
      } transition-all`}
    >
      <img
        src={Assets.Cloud_1}
        alt="Cloud"
        className={`absolute ${
          menuWide ? "-top-[37%]" : "-top-[165%]"
        } w-2/3 right-[3%]`}
      />
      <img
        src={Assets.Cloud_2}
        alt="Cloud"
        className={`absolute -left-[20%] w-1/2 ${
          menuWide ? "-top-1/2" : "-top-[165%]"
        }`}
      />
    </div>
  );
};

export default BackGround;
