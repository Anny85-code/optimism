/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import './Notice.css';

const Notice = ({ message, role }) => (
  <center className={role}>{message}</center>
);

Notice.propTypes = {
  message: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default Notice;
/* eslint-enable */
