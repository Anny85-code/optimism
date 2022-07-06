import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { useDispatch } from 'react-redux';
import foodforallOptimism from '../../assets/image/foodforallOptimism.jpeg';
import Footer from '../footer/Footer';

const data = JSON.parse(localStorage.getItem('user'));
const { user } = data || {};

/* eslint-disable */
const Sidebar = ({ sidebarOpen, closeSideBar }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    dispatch({ type: 'LOGGED_OUT' });
    window.history.pushState({}, '', '/');
    window.location.reload();
  };

  const [dropdownCustomer, setDropdownCustomer] = useState(false);
  const [dropdownProduct, setDropdownProduct] = useState(false);
  const [dropdownMarketer, setDropdownMarketer] = useState(false);

  const toggleDropdownCustomer = () => {
    setDropdownCustomer(dropdownCustomer ? false : true);
    setDropdownProduct(false);
    setDropdownMarketer(false);
  };

  const toggleDropdownMarkerter = () => {
    setDropdownCustomer(false);
    setDropdownProduct(false);
    setDropdownMarketer(dropdownMarketer ? false : true);
  };

  const toggleDropdownProduct = () => {
    setDropdownCustomer(false);
    setDropdownProduct(dropdownProduct ? false : true);
    setDropdownMarketer(false);
  };

  return (
    <div className={sidebarOpen ? 'sidebar-responsive' : ''} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={foodforallOptimism} alt="food for all logo" />
          <h1>Optimist</h1>
        </div>
        <i
          className="fa fa-times"
          id="sidebarIcon"
          onClick={() => closeSideBar()}
        />
      </div>
      <div className="sidebar__menu">
        <div className="sidebar__link active_menu_link">
          <i className="fa fa-home" />
          <NavLink to="/">Dashboard</NavLink>
        </div>
        <h2>MNG</h2>
        <div className="sidebar__link">
          <i className="fa fa-user-secret" />
          <a href="#">Admin Management</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-building-o" />
          <a href="#">Company Management</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-wrench" />
          <a href="#">Employee Management</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-wrench" />
          <a href="#">Marketer Management</a>
          <i
            className="fa fa-caret-right"
            onClick={toggleDropdownMarkerter}
            id="toggle-btn"
          />
          <ul
            className={!dropdownMarketer ? 'dropdown-off' : 'dropdown-on'}
            id="drop-menu"
          >
            <li>
              <NavLink
                to="/register"
                style={{ textDecoration: 'none' }}
                onClick={closeSideBar}
              >
                Add New Marketer
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                style={{ textDecoration: 'none' }}
                onClick={closeSideBar}
              >
                View All Marketers
              </NavLink>
            </li>
          </ul>
        </div>
        {user.role === 'marketer' && (
          <>
            <div className="sidebar__link">
              <i className="fa fa-wrench" />
              <a href="#">Customer Management</a>
              <i
                className="fa fa-caret-right"
                onClick={toggleDropdownCustomer}
                id="toggle-btn"
              />
              <ul
                className={!dropdownCustomer ? 'dropdown-off' : 'dropdown-on'}
                id="drop-menu"
              >
                <li>
                  <NavLink
                    to="/addcustomer"
                    style={{ textDecoration: 'none' }}
                    onClick={closeSideBar}
                  >
                    Add New Customer
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/customers"
                    style={{ textDecoration: 'none' }}
                    onClick={closeSideBar}
                  >
                    View All Customers
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        )}
        <div className="sidebar__link">
          <i className="fa fa-wrench" />
          <a href="#">Product Management</a>
          <i
            className="fa fa-caret-right"
            onClick={toggleDropdownProduct}
            id="toggle-btn"
          />
          <ul
            className={!dropdownProduct ? 'dropdown-off' : 'dropdown-on'}
            id="drop-menu"
          >
            {/* <li>
              <NavLink
                to="/addproduct"
                style={{ textDecoration: 'none' }}
                onClick={closeSideBar}
              >
                Add New Item
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="/products"
                style={{ textDecoration: 'none' }}
                onClick={closeSideBar}
              >
                View All Products
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-archive" />
          <a href="#">Seasons</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-handshake-o" />
          <a href="#">Contributions</a>
        </div>
        <h2>PAYMENT</h2>
        <div className="sidebar__link">
          <i className="fa fa-question" />
          <a href="#">Requests</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-sign-out" />
          <a href="#">Terms and Condition</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-calendar-check-o" />
          <a href="#">Special Days</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-files-o" />
          <a href="#">Appy for Contribution</a>
        </div>
        <h2>PAYROLL</h2>
        <div className="sidebar__link">
          <i className="fa fa-money" />
          <a href="#">Payroll</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-briefcase" />
          <a href="#">Paygrade</a>
        </div>
        <div className="sidebar__logout">
          <i className="fa fa-power-off" />
          {isLoggedIn ? <a onClick={handleLogout}>Logout</a> : ''}
        </div>
        <Footer />
      </div>
    </div>
  );
};
/* eslint-enable */
export default Sidebar;
