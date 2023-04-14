/* eslint-disable */
import React from 'react';
import { NavLink } from 'react-router-dom';
import landingLogo from '../../../assets/image/foodforalllogo.png';
import './LandingNav.css';

const LandingNav = () => {
  return (
    <nav className="landing_nav">
      <div>
        <img
          src={landingLogo}
          className="landing_image"
          alt="landing page logo"
        />
      </div>
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
          <li>
            <button type="button">Sign In</button>
          </li>
        </NavLink>
        <NavLink to="/login_new">
          <li>
            <button type="button">Sign In New</button>
          </li>
        </NavLink>
      </ul>
      <div className="search_cont">
        <a href="#">
          <i
            className="fa fa-search"
            style={{
              color: '#a5a5a5',
              fontSize: '26px',
              borderRadius: '50px',
              boxShadow: '2px 2px 5px #d9d9d9, -2px -2px -5px #000',
              padding: '7px',
              margin: '10px',
            }}
            onClick={() => openSearch()}
          />
        </a>
      </div>
    </nav>
  );
};

export default LandingNav;
/* eslint-enable */
