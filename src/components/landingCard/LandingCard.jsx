import React from 'react';
import './LandingCard.css';

/* eslint-disable */

const LandingCard = (props) => {
 const { image, header, description, button } = props;
  return (
    <div className="landing_card_container">
      <img src={image} alt="cardimage" className="landing_card_image"/>
      <h2 className="landing_card_header_text">{header}</h2>
      <p className="landing_card_des">{description}</p>
      <button type="button" className="landing_card-btn">{button}</button>
    </div>
  )
}

export default LandingCard;
