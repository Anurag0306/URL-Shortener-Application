import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
      <div className="bg-white/60 backdrop-blur-lg shadow-xl rounded-2xl p-8 text-center max-w-md border border-white/40 relative">
        {/* Centered Icon */}
        <div className="flex justify-center">
          <FaExclamationTriangle className="text-7xl text-red-500 drop-shadow-lg" />
        </div>

        <h1 className="text-3xl font-semibold text-gray-800 mt-4">Oops! Something went wrong.</h1>
        <p className="text-gray-600 text-lg mt-2 mb-6">
          {message ? message : "An unexpected error has occurred."}
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-medium shadow-lg hover:scale-105 transition-transform duration-200"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
