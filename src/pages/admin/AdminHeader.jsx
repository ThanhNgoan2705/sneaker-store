import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaBell, FaMoon, FaTimes, FaBars } from 'react-icons/fa';
import {Link} from "react-router-dom";

const AdminHeader = ({ isSidebarOpen, toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !event.target.closest('.avatar')) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center relative z-10">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-gray-500 text-2xl">
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <h1 className="ml-4 text-xl font-semibold">
          <Link to={'/'} className=" ml-4 text-xl font-semibold">    SHOE STORE</Link>

         </h1>
      </div>
      <div className="flex items-center space-x-4 relative">
        <FaSearch className="text-gray-500 text-xl" />
        <FaBell className="text-gray-500 text-xl" />
        <FaMoon className="text-gray-500 text-xl" />
        <div className="relative">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="avatar w-10 h-10 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          <div
            ref={dropdownRef}
            className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 transform transition-transform duration-300 ${
              isDropdownOpen ? 'scale-100' : 'scale-0'
            } origin-top-right`}
          >
            <div className="px-4 py-2 text-gray-700">
              Tên người dùng
              <hr className="my-2" />
            </div>
            <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</a>
            <a href="/logout" className="block px-4 py-2 text-red-600 hover:bg-gray-100">Log out</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
