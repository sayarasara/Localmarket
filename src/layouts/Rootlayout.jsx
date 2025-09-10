import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Nav/Footer';
import Navbar from '../Nav/Navbar';
import Marketadd from '../Marquee/Marketadd';



const Rootlayout = () => {
    return (
        <div>
          <Navbar></Navbar>
          <Outlet></Outlet>
          <Marketadd></Marketadd>
          <Footer></Footer>
        </div>
    );
};

export default Rootlayout;