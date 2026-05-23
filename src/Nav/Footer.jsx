import React from 'react';
import { FaCodepen, FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <>
            <footer className="footer bg-gradient-to-r from-primary/10 via-base-200 to-primary/10 text-base-content border-t-2 border-primary/30 px-6 py-8 mt-auto">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Left Section - Logo & Info */}
                        <div className="flex items-center gap-4">
                            <div className="avatar">
                                <div className="w-16 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100 shadow-lg">
                                    <img
                                        className="rounded-full"
                                        alt="Local Market Logo"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVejFXGUWyODSZM71eFGihY_KX7bvTnVSlQ&s"
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    Local Market Ltd.
                                </p>
                                <p className="text-sm opacity-75 flex items-center gap-1">
                                    Providing reliable tech since 1992 
                                    <span className="text-primary">✦</span>
                                </p>
                            </div>
                        </div>

                        {/* Center Section - Tagline */}
                        <div className="hidden md:block text-center">
                            <p className="text-sm italic opacity-60">
                                "Quality products, trusted service"
                            </p>
                        </div>

                        {/* Right Section - Social Links */}
                        <div className="flex gap-4">
                            <a 
                                href="https://github.com/sayarasara" 
                                className="btn btn-circle btn-md bg-base-100 hover:bg-primary hover:text-primary-content shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                            >
                                <FaGithub className="text-lg" />
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/sayara-sara-8a4a013a0/" 
                                className="btn btn-circle btn-md bg-base-100 hover:bg-primary hover:text-primary-content shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="text-lg" />
                            </a>
                            <a 
                                href="#" 
                                className="btn btn-circle btn-md bg-base-100 hover:bg-primary hover:text-primary-content shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                aria-label="CodePen"
                            >
                                <FaCodepen className="text-lg" />
                            </a>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="divider my-6 before:bg-primary/30 after:bg-primary/30"></div>
                    
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-70">
                        <p className="flex items-center gap-1">
                            © {currentYear} Local Market Ltd. 
                            <span className="hidden md:inline">|</span>
                            <span className="text-xs">All rights reserved.</span>
                        </p>
                        
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-primary transition-colors duration-200">Privacy Policy</a>
                            <a href="#" className="hover:text-primary transition-colors duration-200">Terms of Service</a>
                            <a href="#" className="hover:text-primary transition-colors duration-200">Contact</a>
                        </div>
                        
                        <p className="flex items-center gap-1">
                            Made with <FaHeart className="text-red-500 animate-pulse text-xs" /> for our community
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;




// import React from 'react';
// import { FaCodepen, FaGithub, FaLinkedin } from 'react-icons/fa';
// //import ProFastLogo from '../ProFastLogo/ProFastLogo';

// const Footer = () => {
//     return (
// <>
// <footer className="footer bg-slate-200 italic text-base-content border-base-300 border-t px-10 py-4">
//   <aside className="grid-flow-col items-center">
//             <div className="w-15 rounded-full">
//           <img  className='rounded-full'
//             alt=""
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHVejFXGUWyODSZM71eFGihY_KX7bvTnVSlQ&s
//             "/>
//             </div>
//     <p>
//       Local Market Ltd.
//       <br/>
//       Providing reliable tech since 1992
//     </p>
//   </aside>
//   <nav className="md:place-self-center md:justify-self-end">
//       <div className="flex gap-7">
//                       <a href="https://github.com/sayarasara" className="btn btn-circle btn-sm btn-outline hover:btn-primary">
//                         <FaGithub />
//                       </a>
//                       <a href="https://www.linkedin.com/in/sayara-sara-8a4a013a0/" className="btn btn-circle btn-sm btn-outline hover:btn-primary">
//                         <FaLinkedin />
//                       </a>
//                       <a href="#" className="btn btn-circle btn-sm btn-outline hover:btn-primary">
//                         <FaCodepen />
//                       </a>
//                     </div>
//   </nav>
// </footer>
// </>
//     );
// };

// export default Footer;