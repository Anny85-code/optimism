/* eslint-disable */
import React from 'react';
import { NavLink } from 'react-router-dom';
import './LandingNav.css';

const LandingNav = () => {
  return (
    <nav>
      <ul className="landing_ul">
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/about_us">
          <li>About Us</li>
        </NavLink>
        <NavLink to="/teams">
          <li>Teams</li>
        </NavLink>
        <NavLink to="/contact_us">
          <li>Contact Us</li>
        </NavLink>
        <NavLink to="/login">
          <button type="button">Sign In</button>
        </NavLink>
      </ul>
    </nav>
  );
};

export default LandingNav;
/* eslint-enable */
