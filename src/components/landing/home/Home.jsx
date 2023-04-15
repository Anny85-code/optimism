/* eslint-disable */
import React from 'react';
import { LandingFoot } from '../foot/LandingFoot';
import LandingNav from '../nav/LandingNav';
import LandingCard from '../../landingCard/LandingCard';
import landingImage from '../../../assets/image/recpie_1.png.webp';
import landingImage2 from '../../../assets/image/recpie_2.png.webp';
import landingImage3 from '../../../assets/image/recpie_3.png.webp';
import landingImage4 from '../../../assets/image/recpie_4.png';
import landingImage5 from '../../../assets/image/recpie_5.png';
import landingImage6 from '../../../assets/image/recpie_6.png';
import './Home.css';
import VideoCard from '../../videoCard/VideoCard';

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
      <div className="landing_card_home">
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
      <div className="landing_card_video">
        <VideoCard />
      </div>
      <div className="landing_card_home">
        <LandingCard
          image={landingImage4}
          header="Quality"
          description="We are committed to providing the best quality food to our customers."
          button="Learn More"
        />
        <LandingCard
          image={landingImage5}
          header="Quality"
          description="We are committed to providing the best quality food to our customers."
          button="Learn More"
        />
        <LandingCard
          image={landingImage6}
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
