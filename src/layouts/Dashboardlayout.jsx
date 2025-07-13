import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { FaHome, FaBoxOpen, FaMoneyCheckAlt, FaSearchLocation, FaUserCheck, FaUserClock, FaUserShield, FaMotorcycle, FaTasks, FaCheckCircle, FaWallet } from 'react-icons/fa';
import { AiFillPieChart } from 'react-icons/ai'; // <-- Correct import for AiFillPieChart
import UserRole from '../Hooks/UserRole';


const Dashboardlayout = () => {

    const { role, roleLoading } = UserRole();
    console.log(role);

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>

                </div>
                {/* Page content here */}
                <Outlet></Outlet>
                <div className="card bg-base-100 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
  </div>
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
</div>
                {/* Page content here */}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                
                    <li>
                        <NavLink to="/App">
                            <FaHome className="inline-block mr-2" />
                            Home
                        </NavLink>
                    </li>
                   <li>
                        <NavLink to="/dashboard/MyParcels">
                            <FaBoxOpen className="inline-block mr-2" />
                            My Parcels
                        </NavLink>
                    </li>
                   <li>
                        <NavLink to="/dashboard/Manageitme">
                            <FaMoneyCheckAlt className="inline-block mr-2" />
                          Manageitme
                        </NavLink>
                    </li>
                    <li>
                    <NavLink to="/dashboard/Viewchart">
                        <AiFillPieChart className="inline-block mr-2" />
                        View Chart
                    </NavLink>
                    </li>
                    {/* rider links */}
                    {!roleLoading && role === 'rider' && <>
                       <li>
                            <NavLink to="/dashboard/Addproducts">
                                <FaTasks className="inline-block mr-2" />
                                Add Products
                            </NavLink>
                        </li>
                           <li>
                        <NavLink to="/dashboard/Addadvertisement">
                            <FaSearchLocation className="inline-block mr-2" />
                           Add advertisement
                        </NavLink>
                    </li>
                        <li>
                            <NavLink to="/dashboard/Myadvertisement">
                                <FaCheckCircle className="inline-block mr-2" />
                                My Advertisements
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/my-earnings">
                                <FaWallet className="inline-block mr-2" />
                                My Earnings
                            </NavLink>
                        </li>
                    </>}


                    {/* admin link */}
                    {!roleLoading && role === 'admin' &&
                        <>
                        
                         <li>
                                <NavLink to="/dashboard/Alladvertisement">
                                    <FaMotorcycle className="inline-block mr-2" />
                                    All Advertisements
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/Allorders">
                                    <FaUserCheck className="inline-block mr-2" />
                                  All Orders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="Allusers">
                                    <FaUserClock className="inline-block mr-2" />
                                  All Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/makeAdmin">
                                    <FaUserShield className="inline-block mr-2" />
                                    Make Admin
                                </NavLink>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Dashboardlayout;