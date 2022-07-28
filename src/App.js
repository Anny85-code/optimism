import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddCustomer from './components/addCostumer/AddCostumer';
import Login from './components/forms/Login';
import Customer from './components/customer/Customer';
import Customers from './components/customer/Customers';
import Register from './components/forms/Register';
import Error from './components/Error';
import Main from './components/main/Main';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Splash from './components/splash/Splash';
import EditCustomer from './components/customer/EditCustomer';
import Users from './components/user/Users';
import User from './components/user/User';
import EditUser from './components/user/EditUser';
import EditProduct from './components/items/products/EditProduct';
// import AddItemCustomer from './components/addCostumer/addItemCustomer/AddItemCustomer';
import AddProduct from './components/items/products/AddProducts';
import ViewItems from './components/items/ViewItems';
import Search from './components/search/Search';
import AddSeason from './components/season/AddSeason';
import Seasons from './components/season/Seasons';
import Season from './components/season/Season';
import AddTransaction from './components/transaction/AddTransaction';
import Contribution from './components/transaction/Contribution';
import Transactions from './components/transaction/Transactions';
import Transaction from './components/transaction/transaction';
import AddItemToCustomer from './components/addCostumer/AddItemToCustomer';
import SearchContribution from './components/transaction/SearchContribution';
import CustomerTransacts from './components/customer/CustomerTransacts';
import Product from './components/items/products/Product';
import UserTransacts from './components/user/UserTransacts';
import MyFood from './components/myfood/MyFood';
import CustomerPreview from './components/addCostumer/CustomerPreview';

const App = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const body = document.querySelector('body');

  const openSideBar = () => {
    setSideBarOpen(true);
    body.style.overflow = 'hidden';
  };

  const closeSideBar = () => {
    setSideBarOpen(false);
    body.style.overflow = 'auto';
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="container">
          <Navbar sideBarOpen={sideBarOpen} openSideBar={openSideBar} />
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<Customer />} />
            <Route path="/addcustomer" element={<AddCustomer />} />
            {/* <Route path="/additemcustomer" element={<AddItemCustomer />} /> */}
            <Route path="/addtransaction" element={<AddTransaction />} />
            <Route path="/contribution" element={<Contribution />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/:id" element={<Transaction />} />
            <Route path="/addproducts" element={<AddItemToCustomer />} />
            <Route path="/custumers" element={<Customers />} />
            <Route path="/customers/:id/myfood" element={<MyFood />} />
            <Route
              path="/searchcontribution"
              element={<SearchContribution />}
            />
            <Route path="/customerpreview" element={<CustomerPreview />} />
            {user.role === 'admin' && (
              <>
                <Route path="/register" element={<Register />} />
                <Route path="/customers/:id/edit" element={<EditCustomer />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="/products/:id/edit" element={<EditProduct />} />
                <Route path="/users/:id/edit" element={<EditUser />} />
                <Route
                  path="/customers/:id/transactions"
                  element={<CustomerTransacts />}
                />
                <Route
                  path="/users/:id/transactions"
                  element={<UserTransacts />}
                />
                <Route path="/products" element={<ViewItems />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/addseason" element={<AddSeason />} />
                <Route path="/seasons" element={<Seasons />} />
                <Route path="/season/:id" element={<Season />} />
                <Route path="/products/:id" element={<Product />} />
              </>
            )}
          </Routes>
          <Sidebar sidebarOpen={sideBarOpen} closeSideBar={closeSideBar} />
          <Search />
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
