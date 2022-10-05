import React from "react";

type OverlayProps = {
  setOverlay: (state: boolean) => void;
};

const Overlay = ({ setOverlay }: OverlayProps) => {
  return (
    <div
      className="overlay fixed top-0 left-0 w-full h-screen bg-black z-20 opacity-30 transition-all"
      onClick={() => setOverlay(false)}
    />
  );
};

export default Overlay;
