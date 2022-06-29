import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddCustomer from './components/addCostumer/AddCostumer';
import Customers from './components/customer/Customers';
import Register from './components/forms/Register';
// import Error from './components/Error';
import Main from './components/main/Main';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Splash from './components/splash/Splash';

// const App = () => {
// const [sideBarOpen, setSideBarOpen] = useState(false);
// const isLoggedIn = localStorage.getItem('isLoggedIn');
// const data = JSON.parse(localStorage.getItem('user'));
// const { user } = data || {};

// const openSideBar = () => {
//   setSideBarOpen(true);
// };

// const closeSideBar = () => {
//   setSideBarOpen(false);
// };
// return (
//   <div className="container">
//     <Splash />
// {
/* {isLoggedIn ? (
          <>
      <Navbar sideBarOpen={sideBarOpen} openSideBar={openSideBar} />
      <Routes>
        <Route exact path="/" element={<Splash />} />
          <>
            <Route exact path="/" element={<Main />} />
            <Route path="/addcostumer" element={<AddCustomer />} />
            {user.role === 'admin' && (
              <>
                <Route path="/add-car" element={<Main />} />
                <Route path="/delete" element={<Main />} />
              </>
            )}
            {user.role === 'marketer' && (
              <>
                <Route path="/add-car" element={<Main />} />
                <Route path="/delete" element={<Main />} />
              </>
            )}
          </>
        ) : (
          ''
            <Route path="*" element={<Error />} />
          </Routes>
          <Sidebar sidebarOpen={sideBarOpen} closeSideBar={closeSideBar} />
        )}
      </> */
// }
// </div>
//   );
// };

// export default App;

const App = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  // const data = JSON.parse(localStorage.getItem('user'));
  // const { user } = data || {};

  const openSideBar = () => {
    setSideBarOpen(true);
  };

  const closeSideBar = () => {
    setSideBarOpen(false);
  };

  return (
    <div>
      {/* <Splash /> */}
      {/* {!isLoggedIn && (
        <div>
          <Routes>
            <Route path="/" element={<Splash />} />
          </Routes>
        </div>
      )} */}
      {isLoggedIn ? (
        <div className="container">
          <Navbar sideBarOpen={sideBarOpen} openSideBar={openSideBar} />
          <Routes>
            <Route exact path="/dashboard" element={<Main />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addcostumer" element={<AddCustomer />} />
            <Route path="/custumers" element={<Customers />} />
          </Routes>
          <Sidebar sidebarOpen={sideBarOpen} closeSideBar={closeSideBar} />
        </div>
      ) : (
        <Splash />
      )}
    </div>
  );
};

export default App;
