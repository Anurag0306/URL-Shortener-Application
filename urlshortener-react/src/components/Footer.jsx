import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="w-full min-h-[120px] border-t-4 border-[#fc6a00] shadow-[0px_-5px_20px_rgba(0,0,0,0.3)] flex items-center"
      style={{
        background: "linear-gradient(to right, #fde2e4, #f9dcdc, #f7cfdc)",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center w-full px-6">
        {/* Branding Section */}
        <div className="text-center lg:text-left">
          <h2 className="text-4xl font-extrabold text-[#fc6a00] tracking-wide">
            Trimly
          </h2>
          <p className="text-gray-800">Simplifying URL shortening for effortless sharing.</p>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6">
          <a href="#" className="hover:text-[#fc6a00] transition-transform duration-300 transform hover:scale-110">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="hover:text-[#fc6a00] transition-transform duration-300 transform hover:scale-110">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="hover:text-[#fc6a00] transition-transform duration-300 transform hover:scale-110">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="hover:text-[#fc6a00] transition-transform duration-300 transform hover:scale-110">
            <FaLinkedin size={24} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-gray-800">
          &copy; {new Date().getFullYear()} Trimly. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

