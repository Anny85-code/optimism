import { useState } from 'react';
import Navbar from '../src/components/navbar/Navbar';
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
    <div className='container'>
      <Navbar sideBarOpen={sideBarOpen} openSideBar={openSideBar} />
      <h1>Optimistic dashboard</h1>
      <SideBar sidebarOpen={sideBarOpen} closeSideBar={closeSideBar} />
    </div>
  );
};

export default App;
