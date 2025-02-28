import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <div className="h-16 z-50 flex items-center sticky top-0 bg-[#FFF3E0] shadow-md border-b-2 border-[#fc6a00]">
      <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/">
          <h1 className="font-bold text-3xl italic sm:mt-0 mt-2 text-[#fc6a00] tracking-wide">
            Trimly
          </h1>
        </Link>

        {/* Navigation Links */}
        <ul
          className={`flex sm:gap-10 gap-4 sm:items-center sm:mt-1 sm:pt-0 pt-3 text-[#222] sm:static absolute left-0 top-[62px] sm:shadow-none shadow-lg ${
            navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
          } transition-all duration-200 sm:h-fit bg-[#FFF3E0] sm:bg-transparent sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0 rounded-md`}
        >
          <li className="font-medium transition-all duration-200">
            <Link
              className={`${
                path === "/" ? "text-[#fc6a00] font-semibold" : "text-gray-700"
              } hover:text-[#fc6a00] transition-all duration-200`}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="font-medium transition-all duration-200">
            <Link
              className={`${
                path === "/about" ? "text-[#fc6a00] font-semibold" : "text-gray-700"
              } hover:text-[#fc6a00] transition-all duration-200`}
              to="/about"
            >
              About
            </Link>
          </li>

          {/* SignUp Button - Modern Gradient Color */}
          <Link to="/register">
            <li className="sm:ml-0 -ml-1 bg-gradient-to-r from-[#FF6B6B] to-[#D72691] text-white cursor-pointer w-24 text-center font-semibold px-3 py-2 rounded-md hover:scale-105 transition-all duration-200 shadow-md hover:shadow-pink-300/50 border border-[#fc6a00]">
              SignUp
            </li>
          </Link>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden flex items-center sm:mt-0 mt-2"
        >
          {navbarOpen ? (
            <RxCross2 className="text-[#222] text-3xl" />
          ) : (
            <IoIosMenu className="text-[#222] text-3xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
