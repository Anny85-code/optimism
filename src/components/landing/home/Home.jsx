/* eslint-disable */
import React from 'react';
import { LandingFoot } from '../foot/LandingFoot';
import LandingNav from '../nav/LandingNav';
import LandingCard from '../../landingCard/LandingCard';
import landingImage from '../../../assets/image/recpie_1.png.webp';
import './Home.css';

const Home = () => {
  return (
    <>
      <div className="landing_app">
        <LandingNav />
        <center className="landing_text" id="landing_text">
          <h1>Food for all</h1>
          <br />
          <h1>Let's talk food!</h1>
        </center>
        {/* <div className='landing_card_home'> */}
        {/* </div> */}
        {/* lorem4000 */}
      </div>
        <LandingCard
          image={landingImage}
          header="Quality"
          description="We are committed to providing the best quality food to our customers."
          button="Learn More"
        />
        <LandingFoot />
    </>
  );
};

export default Home;
/* eslint-enable */
