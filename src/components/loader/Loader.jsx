import React from 'react';
// import { Audio, Grid, Puff, Rings, ThreeDots } from 'react-loader-spinner';
import { ThreeDots } from 'react-loader-spinner';

const Loader = () => (
  <div>
    {/* <Audio color="#9ec234" height={80} width={80} />
  <Grid color="#f10d0d" height={80} width={80} />
  <Puff color="#47906d" height={280} width={280} />
  <Rings color="#f10d0d" height={250} width={250} /> */}
    <ThreeDots color="#15a715" height={200} width={200} />
  </div>
);

export default Loader;
