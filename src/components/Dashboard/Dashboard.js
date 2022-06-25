import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Main from '../main/Main';
import SideBar from '../sidebar/Sidebar';

const Dashboard = () => {
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

export default Dashboard;
