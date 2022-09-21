import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { useDispatch } from 'react-redux';
import foodforalllogo from '../../assets/image/foodforalllogo.png';
import Footer from '../footer/Footer';

const data = JSON.parse(localStorage.getItem('user'));
const { user } = data || {};

/* eslint-disable */
const Sidebar = ({ sidebarOpen, closeSideBar }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const dispatch = useDispatch();
  const admins = user.role === 'admin' || user.role === 'superadmin';

  const handleLogout = () => {
    // localStorage.removeItem('user');
    // localStorage.removeItem('token');
    // localStorage.removeItem('isLoggedIn');
    // localStorage.removeItem('customer');
    // localStorage.removeItem('image_str');
    // localStorage.removeItem('cardNumber');
    // localStorage.removeItem('tasks:');
    localStorage.clear();
    dispatch({ type: 'LOGGED_OUT' });
    window.history.pushState({}, '', '/');
    window.location.reload();
  };

  const [dropdownCustomer, setDropdownCustomer] = useState(false);
  const [dropdownProduct, setDropdownProduct] = useState(false);
  const [dropdownMarketer, setDropdownMarketer] = useState(false);
  const [dropdownSeason, setDropdownSeason] = useState(false);
  const [dropdownTransaction, setDropdownTransaction] = useState(false);
  const [dropdownContribution, setDropdownContribution] = useState(false);

  const toggleDropdownCustomer = () => {
    setDropdownCustomer(dropdownCustomer ? false : true);
    setDropdownProduct(false);
    setDropdownMarketer(false);
    setDropdownSeason(false);
    setDropdownTransaction(false);
    setDropdownContribution(false);
  };

  const toggleDropdownMarkerter = () => {
    setDropdownCustomer(false);
    setDropdownTransaction(false);
    setDropdownProduct(false);
    setDropdownMarketer(dropdownMarketer ? false : true);
    setDropdownSeason(false);
    setDropdownContribution(false);
  };

  const toggleDropdownTransaction = () => {
    setDropdownCustomer(false);
    setDropdownProduct(false);
    setDropdownTransaction(dropdownTransaction ? false : true);
    setDropdownMarketer(false);
    setDropdownSeason(false);
    setDropdownContribution(false);
  };

  const toggleDropdownProduct = () => {
    setDropdownCustomer(false);
    setDropdownProduct(dropdownProduct ? false : true);
    setDropdownMarketer(false);
    setDropdownSeason(false);
    setDropdownTransaction(false);
    setDropdownContribution(false);
  };

  const toggleDropdownSeason = () => {
    setDropdownCustomer(false);
    setDropdownProduct(false);
    setDropdownSeason(dropdownSeason ? false : true);
    setDropdownMarketer(false);
    setDropdownTransaction(false);
    setDropdownContribution(false);
  };

  const toggleDropdownContribution = () => {
    setDropdownCustomer(false);
    setDropdownProduct(false);
    setDropdownContribution(dropdownContribution ? false : true);
    setDropdownMarketer(false);
    setDropdownTransaction(false);
    setDropdownSeason(false);
  };

  const customerSection = (
    <>
      {!admins && (
        <div className="sidebar__link" onClick={toggleDropdownCustomer}>
          <i className="fa fa-gears" />
          <a href="#">Customer Management</a>
          <i className="fa fa-caret-right" id="toggle-btn" />
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
      )}
    </>
  );

  const seasonSection = (
    <>
      <div className="sidebar__link" onClick={toggleDropdownSeason}>
        <i className="fa fa-gears" />
        <a href="#">Season Management</a>
        <i
          className="fa fa-caret-right"
          // onClick={toggleDropdownSeason}
          id="toggle-btn"
        />
        <ul
          className={!dropdownSeason ? 'dropdown-off' : 'dropdown-on'}
          id="drop-menu"
        >
          <li>
            <NavLink
              to="/addseason"
              style={{ textDecoration: 'none' }}
              onClick={closeSideBar}
            >
              Add New Season
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/seasons"
              style={{ textDecoration: 'none' }}
              onClick={closeSideBar}
            >
              View All Seasons
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );

  const transactionSection = (
    <>
      <div className="sidebar__link" onClick={toggleDropdownTransaction}>
        <i className="fa fa-gears" />
        <a href="#">Transaction Management</a>
        <i
          className="fa fa-caret-right"
          // onClick={toggleDropdownTransaction}
          id="toggle-btn"
        />
        <ul
          className={!dropdownTransaction ? 'dropdown-off' : 'dropdown-on'}
          id="drop-menu"
        >
          <li>
            <NavLink
              to="/addtransaction"
              style={{ textDecoration: 'none' }}
              onClick={closeSideBar}
            >
              Add New Transaction
            </NavLink>
          </li>
          {!admins && (
            <li>
              <NavLink
                to="/transactions"
                style={{ textDecoration: 'none' }}
                onClick={closeSideBar}
              >
                View All Transactions
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </>
  );

  const ContributionSection = (
    <>
      <div className="sidebar__link" onClick={toggleDropdownContribution}>
        <i className="fa fa-gears" />
        <a href="#">Contribution Management</a>
        <i
          className="fa fa-caret-right"
          // onClick={toggleDropdownTransaction}
          id="toggle-btn"
        />
        <ul
          className={!dropdownContribution ? 'dropdown-off' : 'dropdown-on'}
          id="drop-menu"
        >
          <li>
            <NavLink
              to="/searchcontribution"
              style={{ textDecoration: 'none' }}
              onClick={closeSideBar}
            >
              Search Contribution
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );

  const staffSection = (
    <div className="sidebar__link" onClick={toggleDropdownMarkerter}>
      <i className="fa fa-gears" />
      <a href="#">
        {user.role === 'supervisor'
          ? 'Marketer Management'
          : 'Staff Management'}
      </a>
      <i className="fa fa-caret-right" id="toggle-btn" />
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
            {user.role === 'supervisor' ? 'Add New Marketer' : 'Add New Staff'}
          </NavLink>
        </li>
        {user.role === 'superadmin' && (
          <li>
            <NavLink
              to="/users"
              style={{ textDecoration: 'none' }}
              onClick={closeSideBar}
            >
              View All Admins
            </NavLink>
          </li>
        )}
        {user.role === 'admin' && (
          <li>
            <NavLink
              to="/userssupervisors"
              style={{ textDecoration: 'none' }}
              onClick={closeSideBar}
            >
              View All Supervisors
            </NavLink>
          </li>
        )}
        {user.role === 'supervisor' && (
          <li>
            <NavLink
              to="/usersmarketers"
              style={{ textDecoration: 'none' }}
              onClick={closeSideBar}
            >
              View All Marketers
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );

  return (
    <div className={sidebarOpen ? 'sidebar-responsive' : ''} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={foodforalllogo} alt="food for all logo" />
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
          <NavLink to="/" onClick={closeSideBar}>
            Dashboard
          </NavLink>
        </div>
        {admins && (
          <>
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
              <i className="fa fa-gears" />
              <a href="#">Employee Management</a>
            </div>
            {staffSection}
          </>
        )}
        {user.role === 'supervisor' ? staffSection : null}
        {user.role === 'supervisor' ? null : customerSection}
        {user.role === 'supervisor' ? null : transactionSection}
        {admins && (
          <>
            <div className="sidebar__link" onClick={toggleDropdownProduct}>
              <i className="fa fa-gears" />
              <a href="#">Product Management</a>
              <i className="fa fa-caret-right" id="toggle-btn" />
              <ul
                className={!dropdownProduct ? 'dropdown-off' : 'dropdown-on'}
                id="drop-menu"
              >
                <li>
                  <NavLink
                    to="/addproduct"
                    style={{ textDecoration: 'none' }}
                    onClick={closeSideBar}
                  >
                    Add New Item
                  </NavLink>
                </li>
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
            {seasonSection}
            {ContributionSection}

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
              <a href="#">Appy for Loan</a>
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
          </>
        )}
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
