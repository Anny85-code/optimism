import React from 'react';
import { NavLink } from 'react-router-dom';
// import Login from '../forms/Login';
import './Splash.css';
import foodforall from '../../assets/image/foodforall.jpeg';

const Splash = () => (
  <div className="splash-container">
    <div className="splash__image">
      <img src={foodforall} alt="splash-logo" />
    </div>
    <div className="login btn">
      <button type="button">
        <NavLink to="/login">Login</NavLink>
      </button>
    </div>
  </div>
);

export default Splash;
