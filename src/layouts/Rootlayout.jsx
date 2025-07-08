import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Nav/Footer';
import Navbar from '../Nav/Navbar';



const Rootlayout = () => {
    return (
        <div>
          <Navbar></Navbar>
          <Outlet></Outlet>
          <Footer></Footer>
        </div>
    );
};

export default Rootlayout;