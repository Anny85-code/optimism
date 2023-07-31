/* eslint-disable */
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import { FiMenu } from 'react-icons/fi';
import landingLogo from '../../../assets/image/quality.png';
import './LandingNav.css';

const LandingNav = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const body = document.querySelector('body');
  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
    document.querySelector('.menuNav').style.display = 'block';
    body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    setNavbarOpen(false);
    body.style.overflow = 'auto';
  };

  window.onscroll = function () {
    scrollFunction();
  };

  const windowSize = window.innerWidth;

  const scrollFunction = () => {
    if (windowSize > 450) {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        document.getElementById('landing_navbar').style.top = '0';
        document.querySelector('.landing_nav').style.background = '#000';
        document.querySelector('.landing_nav').style.paddingTop = '10px';
        document.getElementById('land_li').style.color = '#fff';
        document.getElementById('land_li').style.color = '#fff';
        document.getElementById('land_li1').style.color = '#fff';
        document.getElementById('land_li2').style.color = '#fff';
        document.getElementById('land_li3').style.color = '#fff';
        document.getElementById('land_li4').style.color = '#fff';
        document.getElementById('land_li5').style.color = '#fff';
      } else {
        document.getElementById('landing_navbar').style.top = '0';
        document.querySelector('.landing_nav').style.background = 'transparent';
        document.getElementById('land_li').style.color = '#000';
        document.getElementById('land_li1').style.color = '#000';
        document.getElementById('land_li2').style.color = '#000';
        document.getElementById('land_li3').style.color = '#000';
        document.getElementById('land_li4').style.color = '#000';
        document.getElementById('land_li5').style.color = '#000';
      }
    }
  };

  const links = [
    {
      id: 1,
      path: '/',
      text: 'Home',
    },

    {
      id: 2,
      path: '/about_us',
      text: 'About Us',
    },

    {
      id: 3,
      path: '/teams',
      text: 'Teams',
    },

    {
      id: 4,
      path: '/contact_us',
      text: 'Contact Us',
    },

    {
      id: 5,
      path: '/login',
      text: 'Sign In',
    },
    {
      id: 6,
      path: '/login_new',
      text: 'Sign In New',
    },
  ];
  return (
    <nav className="landing_nav" id="landing_navbar">
      <div>
        <img
          src={landingLogo}
          className="landing_image"
          alt="landing page logo"
        />
      </div>
      <ul className="landing_ul">
        <NavLink activeClass="active" to="/" spy={true} smooth={true}>
          <li id="land_li">Home</li>
        </NavLink>
        <NavLink activeClass="active" to="/about_us" spy={true} smooth={true}>
          <li id="land_li1">About Us</li>
        </NavLink>
        <NavLink activeClass="active" to="/teams" spy={true} smooth={true}>
          <li id="land_li2">Teams</li>
        </NavLink>
        <NavLink activeClass="active" to="/contact_us" spy={true} smooth={true}>
          <li id="land_li3">Contact Us</li>
        </NavLink>
        <NavLink to="/login" spy={true} smooth={true}>
          <li className="sign_btn_green" id="land_li4">
            Sign In
          </li>
        </NavLink>
        <NavLink to="/login_new" spy={true} smooth={true}>
          <li className="sign_btn" id="land_li5">
            Sign In New
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
      <button className="btn-nav" type="button">
        {navbarOpen ? (
          <IoMdClose
            className="toggleClose"
            style={{
              color: '#000',
              width: '40px',
              height: '40px',
            }}
            onClick={() => closeMenu()}
          />
        ) : (
          <FiMenu
            style={{
              color: '#fff',
              width: '40px',
              marginTop: '30px',
              height: '40px',
            }}
            onClick={handleToggle}
          />
        )}
      </button>
      <ul className={`menuNav ${navbarOpen ? ' showMenu' : ''}`}>
        {links.map((link) => (
          <li key={link.id}>
            <Link
              to={link.path}
              activeclassname="active-link"
              onClick={() => closeMenu()}
              spy={true}
              smooth={true}
              exact
              id="menu-link"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LandingNav;
/* eslint-enable */
