import React, { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { titleCase } from "../../../utilities/titleCase";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { truncateString } from "../../../utilities/truncate";
import "./cardside.scss";
function CardSide(props) {
  const date = new Date(
    props.res?.lastEpisodeUpdate
  ).toLocaleDateString();
  // console.log(props.isOutside)
  let cardsideDetails = 'cardside-details';
  cardsideDetails += props.isOutside?' left':" right" 
  return (
    <div className="cardside">
      <div className='cardside-play'>
        <PlayArrowIcon />
      </div>
      <div className={cardsideDetails}>
        <div className="cardside-details__name">
          <p className="name__para">{titleCase(props.res?.slug)}</p>
        </div>
        <div className="cardside-details__desc">
          <p className="desc__para">
            {truncateString(props.res?.description)}
          </p>
        </div>
        <div className="cardside-details__info">
          <div className="info__para">
            <p className="info__para-title">Other Name : </p>
            {props.res?.title?.userPreferred}
          </div>
          <div className="info__para">
            <p className="info__para-title">Score : </p> 5.3
          </div>
          <div className="info__para">
            <p className="info__para-title">Date Aired : </p>
            {date}
          </div>
          <div className="info__para">
            <p className="info__para-title">Status : </p>
            {props.res?.status}
          </div>
          <div className="info__para">
            <p className="info__para-title">Genre : </p>
            {props.res?.genre?.map((gen) => gen + "," + " ")}{" "}
          </div>
        </div>
        <div className="cardside-footer">
          <div className="cardside-footer__play">
            <p>Watch Now</p>
            <PlayArrowIcon />
          </div>
          <div className="cardside-footer__bookmark">
            <BookmarkAddIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSide;
