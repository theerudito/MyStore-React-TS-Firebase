import React from "react";
import {
  imgBrowser,
  imgEmail,
  imgFacebook,
  imgInstagram,
  imgLinkedin,
  imgTwitter,
  imgWhatsaap,
} from "../../Helpers/imgControls";
import { Waves_Button } from "../../Helpers/Waves";

export const Footer = () => {
  return (
    <div className="containerFooter">
      <Waves_Button />
      <p>All rights reserved 2022   By Erudito </p>

      <div className="socialMedia">
        <img src={imgFacebook} alt="" />
        <img src={imgInstagram} alt="" />
        <img src={imgWhatsaap} alt="" />
        <img src={imgBrowser} alt="" />
        <img src={imgEmail} alt="" />
        <img src={imgTwitter} alt="" />
        <img src={imgLinkedin} alt="" />
      </div>
    </div>
  );
};
