/* eslint-disable */
import React from 'react';
import './Notice.css';

const Notice = ({ message, role }) => (
  <center className={role}>{message}</center>
);

export default Notice;
/* eslint-enable */
