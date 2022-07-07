import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import food4allmini from '../../assets/image/foodforall.jpeg';
// import Modal from '../modal/Modal';

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

  // const [modal, setModal] = useState(false);

  // const toggleModal = () => {
  //   setModal(!modal);
  // };

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
      </div>

      <div className="navbar__right">
        <a href="#">
          <NavLink to="/search">
            <i className="fa fa-search" style={{color: '#a5a5a5', fontSize: '16px', borderRadius: '50px', backgroundColor: '#fff', boxShadow: '2px 2px 5px #d9d9d9, -2px -2px -5px #000',
  padding: '7px'}} />
          </NavLink>
        </a>
        <a href="#">
          <i className="fa fa-clock-o" />
        </a>
        <a href="#">
          <img width="30" src={food4allmini} alt="food4all logo" />
        </a>
      </div>
    </nav>
  );
};;
/* eslint-enable */
export default Navbar;
