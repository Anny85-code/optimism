import React from 'react';
import Login from '../forms/Login';
import './Splash.css';
import foodforall from '../../assets/image/foodforall.jpeg';

const Splash = () => (
  <div className="splash-container">
    <div className="splash__image">
      <img src={foodforall} alt="splash-logo" />
    </div>
    <Login />
  </div>
);

export default Splash;
