import React from 'react';
import { NavLink } from 'react-router';
import logo from "../../assets/design-eye-catching-financial-logo.jpg"
const Navbar = () => {

 const links = <> 
     <li className='font-semibold'>  <NavLink to="/"> Home </NavLink> </li>    
     <li  className='font-semibold'>  <NavLink to="/addTransaction"> Add Transaction </NavLink> </li>    
     <li  className='font-semibold'>  <NavLink to="/mytransactions"> My Transactions  </NavLink> </li> 
     <li  className='font-semibold'>  <NavLink to="/reports"> Reports  </NavLink> </li> 

   
 </>

    return (
  <div className="navbar bg-gradient-to-r from-primary/20 via-base-200 to-secondary/20 shadow-sm ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
        
    <div className="flex items-center ">
  <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
  <a className="btn btn-ghost text-4xl font-bold flex items-center">
    Fin <span className="text-primary">Ease</span>
  </a>
</div>

    
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>

       
    );
};

export default Navbar;