import React from 'react';
import { propTypes } from 'prop-types';
import './LandingCard.css';

const LandingCard = (props) => {
  const [props1, props2, props3, props4] = props;
  return (
    <div>
      <img src={props1} alt="cardimage" />
      <h2>{props2}</h2>
      <p>{props3}</p>
      <button type="button">{props4}</button>
    </div>
  )
}

LandingCard.propTypes = {
  props1: propTypes.string.isRequired,
  props2: propTypes.string.isRequired,
  props3: propTypes.string.isRequired,
  props4: propTypes.string.isRequired,
}
export default LandingCard;
