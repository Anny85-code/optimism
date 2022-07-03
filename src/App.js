import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddCustomer from './components/addCostumer/AddCostumer';
import Login from './components/forms/Login';
import Customer from './components/customer/Customer';
import Customers from './components/customer/Customers';
import Register from './components/forms/Register';
// import Error from './components/Error';
import Main from './components/main/Main';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Splash from './components/splash/Splash';
// import Marketers from './components/marketer/Marketers';
import EditCustomer from './components/customer/EditCustomer';
import Users from './components/user/Users';
import User from './components/user/User';
import EditUser from './components/user/EditUser';
import AddItems from './components/items/AddItems';
import AddItemCustomer from './components/addCostumer/addItemCustomer/AddItemCustomer';
import AddProduct from './components/items/products/AddProducts';

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
            <Route path="/addcustomer" element={<AddCustomer />} />
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
            <Route exact path="/" element={<Main />} />
            <Route path="/register" element={<Register />} />
            <Route path="/customers/:id/edit" element={<EditCustomer />} />
            <Route path="/customers/:id" element={<Customer />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/users/:id/edit" element={<EditUser />} />
            <Route path="/addcustomer" element={<AddCustomer />} />
            <Route path="/custumers" element={<Customers />} />
            <Route path="/additems" element={<AddItems />} />
            <Route path="/additemcustomer" element={<AddItemCustomer />} />
            <Route path="/addproduct" element={<AddProduct />} />
          </Routes>
          <Sidebar sidebarOpen={sideBarOpen} closeSideBar={closeSideBar} />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
