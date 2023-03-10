/* eslint-disable */
import React from 'react';
import { LandingFoot } from '../foot/LandingFoot';
import LandingNav from '../nav/LandingNav';
import { teams } from '../teams/Teams';
import TeamsCard from '../teams/TeamsCard';
import ContactForm from './ContactForm';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="teams_container">
      <LandingNav />
      <section className="contact_us_head">
        <h3 className="head__y">Contact Us</h3>
      </section>
      <ContactForm />
      <LandingFoot />
    </div>
  );
};

export default ContactUs;
/* eslint-enable */
