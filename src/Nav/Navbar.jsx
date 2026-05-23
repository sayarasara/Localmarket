// Navbar.jsx - Fixed version
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../Hooks/useAuth';

const Navbar = () => {
    const auth = useAuth();
    const user = auth?.user;
    const logOut = auth?.logOut;
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogOut = () => {
        logOut()
            .then(result => { console.log(result) })
            .catch(error => console.log(error))
    }

    // Define nav items as an array for easy mapping
    const navItems = [
        { path: "/", label: "Home" },
       // { path: "/signIn", label: "Register" }, 
        { path: "/Datacard", label: "All Products" },
        { path: "/MyEarnings", label: "Offers" },
        ...(user ? [
            { path: "/dashboard", label: "Dashboard" },
            { path: "/Profile", label: "Profile" }
        ] : [ { path: "/signIn", label: "Register" }])
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/30 backdrop-blur-md shadow-lg py-2' : 'bg-white/80 backdrop-blur-sm shadow-md py-4'}`}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex justify-between items-center">
                        {/* Logo and Brand */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shadow-md border-2 border-green-500">
                                <img
                                    className="w-full h-full object-cover"
                                    alt="Local Market Logo"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVejFXGUWyODSZM71eFGihY_KX7bvTnVSlQ&s"
                                />
                            </div>
                            <Link to="/" className="text-xl md:text-2xl font-bold">
                                <span className="text-green-700">Local</span>
                                <span className="text-orange-600">Market</span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            <ul className="flex items-center gap-1 mr-4">
                                {navItems.map((item, index) => (
                                    <li key={index}>
                                        <NavLink 
                                            to={item.path} 
                                            className={({ isActive }) => 
                                                `px-4 py-2 rounded-lg transition-colors font-medium ${
                                                    isActive 
                                                        ? 'text-green-700 bg-green-50' 
                                                        : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                                                }`
                                            }
                                        >
                                            {item.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                            {user ? (
                                <button 
                                    onClick={handleLogOut} 
                                    className="px-5 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-medium hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
                                >
                                    Log Out
                                </button>
                            ) : (
                                <Link 
                                    to="/login" 
                                    className="px-5 py-2 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white font-medium hover:from-green-700 hover:to-green-800 transition-all shadow-md hover:shadow-lg"
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-black/50 z-40 transition-all duration-300 lg:hidden ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setMobileMenuOpen(false)} />
            
            {/* Mobile Menu Panel */}
            <div className={`fixed top-0 left-0 w-72 h-full bg-white shadow-2xl z-50 transition-transform duration-300 transform lg:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="p-6 border-b">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
                                <img className="w-full h-full object-cover" alt="Logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVejFXGUWyODSZM71eFGihY_KX7bvTnVSlQ&s" />
                            </div>
                            <div>
                                <div className="text-xl font-bold">
                                    <span className="text-green-700">Local</span>
                                    <span className="text-orange-600">Market</span>
                                </div>
                                <p className="text-xs text-gray-500">Fresh & Organic</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <ul className="flex-1 p-4 space-y-2">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <NavLink 
                                    to={item.path} 
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                            isActive 
                                                ? 'bg-green-50 text-green-700' 
                                                : 'text-gray-700 hover:bg-green-50'
                                        }`
                                    }
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="text-xl">
                                        {item.label === "Home" && "🏠"}
                                        {item.label === "Sign In" && "📝"}
                                   
                                        {item.label === "All Products" && "🛒"}
                                        {item.label === "Offers" && "🏷️"}
                                        {item.label === "Dashboard" && "📊"}
                                        {item.label === "Profile" && "👤"}
                                    </span>
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className="p-4 border-t">
                        {user ? (
                            <button 
                                onClick={() => { handleLogOut(); setMobileMenuOpen(false); }}
                                className="w-full py-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-medium"
                            >
                                Log Out
                            </button>
                        ) : (
                            <Link 
                                to="/login" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="block w-full py-3 text-center rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white font-medium"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;










// import React from 'react';
// import { Link, NavLink } from 'react-router';
// import useAuth from '../Hooks/useAuth';


// const Navbar = () => {
//     const auth = useAuth();
//     const user = auth?.user;
//     const logOut = auth?.logOut;

//     const handleLogOut = () => {
//         logOut()
//             .then(result => { console.log(result) })
//             .catch(error => console.log(error))
//     }

//     const navItems = <>
//         <li><NavLink to="/">Home</NavLink></li>
//         <li><NavLink to="/signIn">SignIn</NavLink></li>
//         <li><NavLink to="/Login">LogIn</NavLink></li>

//         {
//             user && <>
//     <li><NavLink to="/dashboard">Dashboard</NavLink></li>
//     <li><NavLink to="/Profile">profile</NavLink></li>
//             </>
//         }

//         <li><NavLink to="/Datacard">All Products</NavLink></li>
//         <li><NavLink to="/MyEarnings">Offers</NavLink></li>
//     </>
//     return (
//         <div className="navbar bg-slate-200 italic shadow-sm">
//             <div className="navbar-start">
//                 <div className="dropdown">
//                     <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
//                     </div>
//                     <ul
//                         tabIndex={0}
//                         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
//                         {navItems}
//                     </ul>
//                 </div>
//                  <div className="w-15 rounded-full">
//           <img  className='rounded-full'
//             alt=""
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVejFXGUWyODSZM71eFGihY_KX7bvTnVSlQ&s
//             "/>
//             </div>
//             </div>
//             <div className="navbar-center hidden lg:flex">
//                 <ul className="menu menu-horizontal px-1">
//                     {navItems}
//                 </ul>
//             </div>
//             <div className="navbar-end">
//                 {user ?
//                     <button onClick={handleLogOut} className='btn bg-slate-400 text-black'>Log Out</button>
//                     :
//                     <Link to="/login" className='btn bg-slate-400 text-black'>Login</Link>}
//             </div>
//         </div>
//     );
// };

// export default Navbar;