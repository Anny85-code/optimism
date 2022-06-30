import React from 'react';
import { NavLink } from 'react-router-dom';
import './Splash.css';
import './Splashlogo.css';
import foodforall from '../../assets/image/foodforall.jpeg';

const Splash = () => (
  <div className="splash-container">
    <div className="splash__image">
      <img src={foodforall} alt="splash-logo" />
      <div className="splashcontainer">
        <div className="ring" />
        <div className="ring" />
        <div className="ring" />
        <div className="ring" />
      </div>
    </div>
    <h2 className="splash-text">..Never2Late</h2>
    <div className="login btn1">
      <button type="button" className="splash-btn">
        <NavLink to="/login" style={{ textDecoration: 'none' }}>
          Login
        </NavLink>
      </button>
    </div>
  </div>
);

export default Splash;
