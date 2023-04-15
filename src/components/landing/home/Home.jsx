/* eslint-disable */
import React from 'react';
import { LandingFoot } from '../foot/LandingFoot';
import LandingNav from '../nav/LandingNav';
import LandingCard from '../../landingCard/LandingCard';
import landingImage from '../../../assets/image/recpie_1.png.webp';
import landingImage2 from '../../../assets/image/recpie_2.png.webp';
import landingImage3 from '../../../assets/image/recpie_3.png.webp';
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
      </div>
      <div className='landing_card_home'>
        <LandingCard
          image={landingImage}
          header="Quality"
          description="We are committed to providing the best quality food to our customers."
          button="Learn More"
        />
        <LandingCard
          image={landingImage2}
          header="Quality"
          description="We are committed to providing the best quality food to our customers."
          button="Learn More"
        />
        <LandingCard
          image={landingImage3}
          header="Quality"
          description="We are committed to providing the best quality food to our customers."
          button="Learn More"
        />
      </div>

      <LandingFoot />
    </>
  );
};

export default Home;
/* eslint-enable */
