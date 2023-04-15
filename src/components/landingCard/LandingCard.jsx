import React from 'react';
// import { propTypes } from 'prop-types';
import './LandingCard.css';

/* eslint-disable */

const LandingCard = ({ image, header, description, button }) => {
 
  return (
    <div className="landing_card_container">
      <img src={image} alt="cardimage" className="landing_card_image"/>
      <h2 className="landing_card_header_text">{header}</h2>
      <p className="landing_card_des">{description}</p>
      <button type="button" className="landing_card-btn">{button}</button>
    </div>
  )
}

// LandingCard.propTypes = {
//   image: propTypes.string.isRequired,
//   header: propTypes.string.isRequired,
//   description: propTypes.string.isRequired,
//   button: propTypes.string.isRequired,
// }
export default LandingCard;
