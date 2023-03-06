/* eslint-disable */
import React from 'react';
import { LandingFoot } from '../foot/LandingFoot';
import LandingNav from '../nav/LandingNav';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="teams_container">
      <LandingNav />
      <section className="contact_us_head">
        <h3 className="head__y">Contact Us</h3>
        {/* <h3>Chicken Recipes</h3> */}
      </section>
      <LandingFoot />
    </div>
  );
};

export default ContactUs;
/* eslint-enable */
