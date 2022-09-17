// import { auto } from '@popperjs/core';
import React from 'react';
// import { Audio, Grid, Puff, Rings, ThreeDots } from 'react-loader-spinner';
import { Grid } from 'react-loader-spinner';
import './Loader.css';

const Loader = () => (
  <div className="loader">
    {/* <Audio color="#9ec234" height={80} width={80} />
  <Grid color="#f10d0d" height={80} width={80} />
  <Puff color="#47906d" height={280} width={280} />
  <Rings color="#f10d0d" height={250} width={250} /> */}
    <Grid color="crimson" height={100} width={100} />
  </div>
);

export default Loader;
