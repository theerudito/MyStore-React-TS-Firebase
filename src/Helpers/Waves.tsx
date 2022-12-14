import React from "react";

export const Waves_Top = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      className="wavesTop"
    >
      <path
        fill="#0099ff"
        d="M0,32L48,53.3C96,75,192,117,288,133.3C384,149,480,139,576,122.7C672,107,768,85,864,69.3C960,53,1056,43,1152,58.7C1248,75,1344,117,1392,138.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
      ></path>
    </svg>
  );
};

export const Waves_Button = ({ children }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 320"
      className="wavesButton"
    >
      <path
        fill="#0099ff"
        d="M0,128L48,122.7C96,117,192,107,288,96C384,85,480,75,576,69.3C672,64,768,64,864,69.3C960,75,1056,85,1152,96C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  );
};
