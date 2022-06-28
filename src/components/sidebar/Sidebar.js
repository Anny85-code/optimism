import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import foodforallOptimism from '../../assets/image/foodforallOptimism.jpeg';

// import AddCostumer from '../addCostumer/AddCostumer';
/* eslint-disable */
const Sidebar = ({ sidebarOpen, closeSideBar }) => {

  return (
    <div className={sidebarOpen ? 'sidebar-responsive' : ''} id="sidebar">
      <div className="sidebar__title">
        <div className="sidebar__img">
          <img src={foodforallOptimism} alt="food for all logo" />
          <h1>Food 4 All</h1>
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
          <NavLink to="/dashboard">Dashboard</NavLink>
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
          <NavLink to="/register">Marketer Management</NavLink>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-wrench" />
          <NavLink to="/addcostumer">Customer Management</NavLink>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-archive" />
          <a href="#">Seasons</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-handshake-o" />
          <a href="#">Contributions</a>
        </div>
        <h2>LEAVE</h2>
        <div className="sidebar__link">
          <i className="fa fa-question" />
          <a href="#">Requests</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-sign-out" />
          <a href="#">Terms and Condition</a>
        </div>
        <div className="sidebar__link">
          <i className="fa fa-calender-check-o" />
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
          <a href="#">Log out</a>
        </div>
      </div>
    </div>
  );
};
/* eslint-enable */
export default Sidebar;
