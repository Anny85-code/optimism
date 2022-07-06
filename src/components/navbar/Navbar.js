import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
// import food4allmini from '../../assets/image/foodforall.jpeg';

const data = JSON.parse(localStorage.getItem('user'));
const { user } = data || {};

/* eslint-disable */
const Navbar = ({ sideBarOpen, openSideBar }) => {
  const [activeA, setActiveA] = useState(false);
  const [activeB, setActiveB] = useState(false);
  const [activeC, setActiveC] = useState(true);

  const handleActiveA = () => {
    setActiveA(true);
    setActiveB(false);
    setActiveC(false);
  };
  const handleActiveB = () => {
    setActiveA(false);
    setActiveB(true);
    setActiveC(false);
  };
  const handleActiveC = () => {
    setActiveA(false);
    setActiveB(false);
    setActiveC(true);
  };

  return (
    <nav className="navbar">
      <div className="nav-icon" onClick={() => openSideBar()}>
        <i className="fa fa-bars" />
      </div>

      <div className="navbar__left">
        <NavLink
          to="/customers"
          onClick={handleActiveA}
          className={activeA ? 'active_link' : ''}
        >
          Customers
        </NavLink>
        {user.role === 'admin' ? (
          <>
            <NavLink
              to="/users"
              onClick={handleActiveB}
              className={activeB ? 'active_link' : ''}
            >
              Users
            </NavLink>
            <NavLink
              to="/"
              onClick={handleActiveC}
              className={activeC ? 'active_link' : ''}
            >
              Admin
            </NavLink>
          </>
        ) : (
          ''
        )}
      </div>

      <div className="navbar__right">
        <a href="#">
          <i className="fa fa-search" />
        </a>
        <a href="#">
          <i className="fa fa-clock-o" />
        </a>
        <a href="#">
          <img width="30" src={user.avatar} alt="food4all logo" />
        </a>
      </div>
    </nav>
  );
};
/* eslint-enable */
export default Navbar;
