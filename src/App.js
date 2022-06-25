import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Main from './components/main/Main';
import SideBar from './components/sidebar/Sidebar';

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
      <Main />
      <SideBar sidebarOpen={sideBarOpen} closeSideBar={closeSideBar} />
    </div>
  );
};

export default App;
