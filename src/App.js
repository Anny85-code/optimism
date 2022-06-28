import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddCustomer from './components/addCostumer/AddCostumer';
import Main from './components/main/Main';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';

const App = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};

  const openSideBar = () => {
    setSideBarOpen(true);
  };

  const closeSideBar = () => {
    setSideBarOpen(false);
  };
  return (
    <div className="container">
      <Navbar sideBarOpen={sideBarOpen} openSideBar={openSideBar} />
      <Routes>
        <Route exact path="/" element={<Main />} />
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Main />} />
            <Route path="/addcostumer" element={<AddCustomer />} />
            {user.role === 'admin' && (
              <>
                <Route path="/add-car" element={<AddCar />} />
                <Route path="/delete" element={<DeleteCar car={car} />} />
              </>
            )}
            {user.role === 'marketer' && (
              <>
                <Route path="/add-car" element={<AddCar />} />
                <Route path="/delete" element={<DeleteCar car={car} />} />
              </>
            )}
          </>
        ) : (
          ''
        )}
        <Route path="*" element={<Error />} />
      </Routes>
      <Sidebar sidebarOpen={sideBarOpen} closeSideBar={closeSideBar} />
    </div>
  );
};

export default App;
