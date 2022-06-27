import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddCostumer from './components/addCostumer/AddCostumer';
import Main from './components/main/Main';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';

const App = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

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
        <Route path="/addcostumer" element={<AddCostumer />} />
      </Routes>
      <Sidebar sidebarOpen={sideBarOpen} closeSideBar={closeSideBar} />
    </div>
  );
};

export default App;
