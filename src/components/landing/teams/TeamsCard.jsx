/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import './TeamsCard.css';

const TeamsCard = ({ props }) => {
  return (
    <div className="teams_card row">
      {props.map((el) => (
        <div key={el.id} className="column">
          <img src={el.name} alt={el.name} style={{ width: '120px' }} />
          <h4 className="team__head">{el.title}</h4>
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
