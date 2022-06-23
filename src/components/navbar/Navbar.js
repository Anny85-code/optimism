import './Navbar.css';
import foodforallOptimism from '../../assets/image/foodforallOptimism.jpeg';

const Navbar = ({sideBarOpen, openSideBar}) => {
  return (
    <nav className='navbar'>
      <div className='nav-icon' onClick={() => openSideBar()}>
        <i className='fa fa-bars'></i>
      </div>

      <div className='navbar__left'>
        <a href="#">Customers</a>
        <a href="#">Marketers</a>
        <a className="active_link" href="#">Admin</a>
      </div>

      <div className='navbar__right'>
        <a href="#">
          <i className='fa fa-search'></i>
        </a>
        <a href="#">
          <i className='fa fa-clock-o'></i>
        </a>
        <a href="#">
          <img width="30" src={foodforallOptimism} alt="food4all logo" />
        </a>
      </div>
    </nav>
  )

}

export default Navbar;