import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import logo from "../../assets/design-eye-catching-financial-logo.jpg";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        window.location.href = "/login";
      })
      .catch((error) => console.log(error));
  };

  // Protected link navigation
  const handleProtectedClick = (path) => {
    if (user) navigate(path);
    else navigate("/login");
  };

  // Navbar Links JSX
  const links = (
    <ul className="flex items-center gap-6 ">
      <li className="font-semibold">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-primary"
              : "text-gray-700 hover:text-primary transition-colors"
          }
        >
          Home
        </NavLink>
      </li>

      <li
        className="font-semibold cursor-pointer"
        onClick={() => handleProtectedClick("/add-transaction")}
      >
        <span className="hover:text-primary transition-colors">
          Add Transaction
        </span>
      </li>

      <li
        className="font-semibold cursor-pointer"
        onClick={() => handleProtectedClick("/my-transactions")}
      >
        <span className="hover:text-primary transition-colors">
          My Transactions
        </span>
      </li>

      <li
        className="font-semibold cursor-pointer"
        onClick={() => handleProtectedClick("/reports")}
      >
        <span className="hover:text-primary transition-colors">
          Reports
        </span>
      </li>

{user && ( <> <li className="font-semibold"> <NavLink to="/myprofile">My Profile </NavLink> </li>  </> )}


    </ul>
  );




  return (
    <div className="navbar bg-gradient-to-r from-primary/20 via-base-200 to-secondary/20 shadow-sm px-4 lg:px-10">
      {/* Left Section */}
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
            <li className="font-semibold">
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary underline"
                    : " hover:text-primary transition-colors"
                }
              >
                Register
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-12 h-12 object-contain py-2" />
          <a className="text-4xl font-bold flex items-center ml-2">
            Fin <span className="text-primary">Ease</span>
          </a>
        </div>
      </div>

      {/* Center Links (Desktop) */}
      <div className="navbar-center hidden lg:flex">{links}</div>

      {/* Right Section */}
      <div className="navbar-end gap-3">
        {user ? (
          <div className="relative">
            {/* Profile Photo */}
            <img
              src={user.photoURL || "https://i.ibb.co/3d8YQfP/default-user.png"}
              alt="User"
              className="w-10 h-10 rounded-full cursor-pointer border border-primary"
              onClick={() => setOpen(!open)}
            />

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-md rounded-xl p-4 border border-gray-100 z-10">
                <div className="text-center mb-2">
                  <p className="font-semibold">{user.displayName || "User"}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <div className="divider my-1"></div>
                <button
                  onClick={handleSignOut}
                  className="btn btn-error w-full text-white"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-outline btn-primary font-semibold"
                  : "btn btn-outline btn-primary font-semibold  "
              }
            >
              Register
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "btn btn-accent text-white font-semibold"
                  : "btn btn-accent text-white font-semibold hover:bg-accent/90 transition-colors"
              }
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
