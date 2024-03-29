/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import './TeamsCard.css';

const TeamsCard = ({ props }) => {
  return (
    <div className="teams_card">
      {props.map((el) => (
        <div key={el.id} className="cardy">
          <img className="card__img" src={el.name} alt={el.name} />
          <h4 className="head__y team__head">{el.title}</h4>
          <p>{el.desc}</p>
        </div>
      ))}
    </div>
  );
};

TeamsCard.propTypes = {
  props: PropTypes.array.isRequired,
};

export default TeamsCard;
/* eslint-enable */
