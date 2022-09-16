import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Navbar.css';

const data = JSON.parse(localStorage.getItem('user'));
const { user } = data || {};

/* eslint-disable */
const Navbar = ({ sideBarOpen, openSideBar }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const dispatch = useDispatch();

  const handleLogout = () => {
    // localStorage.removeItem('user');
    // localStorage.removeItem('token');
    // localStorage.removeItem('isLoggedIn');
    localStorage.clear();
    dispatch({ type: 'LOGGED_OUT' });
    window.history.pushState({}, '', '/');
    window.location.reload();
  };

  const [activeA, setActiveA] = useState(false);
  const [activeB, setActiveB] = useState(false);
  const [activeC, setActiveC] = useState(false);
  const [activeD, setActiveD] = useState(false);
  const [activeE, setActiveE] = useState(false);

  const handleActiveA = () => {
    setActiveA(true);
    setActiveB(false);
    setActiveC(false);
    setActiveD(false);
    setActiveE(false);
  };
  const handleActiveB = () => {
    setActiveA(false);
    setActiveB(true);
    setActiveC(false);
    setActiveD(false);
    setActiveE(false);
  };
  const handleActiveC = () => {
    setActiveA(false);
    setActiveB(false);
    setActiveC(true);
    setActiveD(false);
    setActiveE(false);
  };
  const handleActiveD = () => {
    setActiveA(false);
    setActiveB(false);
    setActiveC(false);
    setActiveD(true);
    setActiveE(false);
  };
  const handleActiveE = () => {
    setActiveA(false);
    setActiveB(false);
    setActiveC(false);
    setActiveD(false);
    setActiveE(true);
  };

  const openSearch = () => {
    document.getElementById('search-container1').style.display = 'block';
  };

  const admins = user.role === 'admin' || user.role === 'superadmin';

  return (
    <nav className="navbar">
      <div className="nav-icon" onClick={() => openSideBar()}>
        <i className="fa fa-bars" />
      </div>

      <div className="navbar__left">
        {user.role === 'supervisor' ? null : (
          <NavLink
            to="/customers"
            onClick={handleActiveA}
            className={activeA ? 'active_link' : ''}
          >
            Customers
          </NavLink>
        )}
        {user.role === 'marketer' ? null : (
          <NavLink
            to="/usersmarketers"
            onClick={handleActiveE}
            className={activeE ? 'active_link' : ''}
          >
            Marketers
          </NavLink>
        )}
        {user.role === 'superadmin' && (
          <NavLink
            to="/users"
            onClick={handleActiveB}
            className={activeB ? 'active_link' : ''}
          >
            Admins
          </NavLink>
        )}
        {admins ? (
          <>
            <NavLink
              to="/userssupervisors"
              onClick={handleActiveD}
              className={activeD ? 'active_link' : ''}
            >
              Supervisors
            </NavLink>
            <NavLink
              to="/"
              onClick={handleActiveC}
              className={activeC ? 'active_link' : ''}
            >
              Dashboard
            </NavLink>
          </>
        ) : (
          ''
        )}
      </div>

      <div className="navbar__right">
        <a href="#">
          <i
            className="fa fa-search"
            style={{
              color: '#a5a5a5',
              fontSize: '16px',
              borderRadius: '50px',
              backgroundColor: '#fff',
              boxShadow: '2px 2px 5px #d9d9d9, -2px -2px -5px #000',
              padding: '7px',
            }}
            onClick={() => openSearch()}
          />
        </a>
        <a href="#">
          {isLoggedIn ? (
            <i
              className="fa fa-power-off"
              id="logout-nav"
              onClick={handleLogout}
            />
          ) : (
            ''
          )}
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
