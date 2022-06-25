import './Navbar.css';
import foodforallOptimism from '../../assets/image/foodforallOptimism.jpeg';

const Navbar = ({ sideBarOpen, openSideBar }) => (
  <nav className="navbar">
    <div className="nav-icon" onClick={() => openSideBar()}>
      <i className="fa fa-bars" />
    </div>

    <div className="navbar__left">
      <a href="#">Customers</a>
      <a href="#">Marketers</a>
      <a className="active_link" href="#">Admin</a>
    </div>

    <div className="navbar__right">
      <a href="#">
        <i className="fa fa-search" />
      </a>
      <a href="#">
        <i className="fa fa-clock-o" />
      </a>
      <a href="#">
        <img width="30" src={foodforallOptimism} alt="food4all logo" />
      </a>
    </div>
  </nav>
);

export default Navbar;
