import React from "react";

const ArtCard = (props) => {
  return (
    <div className="card__wrapper">
      <div className="card__inner">
      <h2> {props.pieceOfArt.title}</h2>
      <div className="card__inner--img"><img src={props.pieceOfArt.imgSrc} alt={props.pieceOfArt.title} title={props.pieceOfArt.title} width='200'></img></div>
      <div className="card__inner--description">{props.pieceOfArt.description}</div>
      <div className="card__inner--artist">By: {props.pieceOfArt.artist}</div> 
    </div>
    </div>
  );
};

export default ArtCard;
