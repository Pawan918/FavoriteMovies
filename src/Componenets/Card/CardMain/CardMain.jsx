import React from "react";
import { titleCase } from "../../../utilities/titleCase";
import "./cardmain.scss";
function CardMain({ res }) {
  return (
    <div className="cardmain" >
      <div className="cardmain-logo">
        <img src={res?.coverImage} alt={titleCase(res?.slug)} />
      </div>
      <div className="cardmain-info">
        <p>SUB {res?.currentEpisode}</p>
      </div>
      <div className="cardmain-name">
        <p>{titleCase(res?.slug)}</p>
      </div>
      <div className="cardmain-format">
        <p>{res?.format}</p>
      </div>
    </div>
  );
}

export default CardMain;
