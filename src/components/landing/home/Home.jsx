/* eslint-disable */
import React from 'react';
import { LandingFoot } from '../foot/LandingFoot';
import LandingNav from '../nav/LandingNav';
import './Home.css';

const Home = () => {
  return (
    <div className="landing_app">
      <LandingNav />
      <center className="landing_text" id='landing_text'>
        <h1>Food for all</h1>
        <br />
        <h1>Let's think food!</h1>
      </center>

      {/* lorem4000 */}
      <LandingFoot />
    </div>
  );
};

export default Home;
/* eslint-enable */
