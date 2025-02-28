import React from "react";
import { FaLink, FaShareAlt, FaEdit, FaChartLine } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="lg:px-14 sm:px-8 px-5 min-h-[calc(100vh-64px)] pt-2 bg-gradient-to-br from-[#FFE4F0] via-[#FFF3E0] to-[#E0F7FA] flex items-center justify-center">
      <div className="w-full sm:py-10 py-8 text-gray-800">
        
        {/* Title */}
        <h1 className="sm:text-5xl text-4xl font-bold italic mb-6 text-center text-[#fc6a00] drop-shadow-lg">
          About Trimly ✨
        </h1>
        <p className="text-gray-700 text-lg text-center mb-12 max-w-3xl mx-auto">
          Trimly simplifies URL shortening for effortless and efficient sharing.
          Manage, track, and optimize your links with cutting-edge analytics.
        </p>

        {/* Features Section */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Feature Cards */}
          {[
            {
              title: "Simple URL Shortening",
              icon: <FaLink className="text-blue-500 text-4xl" />,
              desc: "Create short, memorable URLs in just a few clicks with our intuitive and fast URL shortener.",
            },
            {
              title: "Powerful Analytics",
              icon: <FaShareAlt className="text-green-500 text-4xl" />,
              desc: "Track clicks, locations, and referrers with our advanced analytics dashboard to optimize your strategy.",
            },
            {
              title: "Enhanced Security",
              icon: <FaEdit className="text-purple-500 text-4xl" />,
              desc: "All URLs are encrypted and secured, ensuring your data and privacy remain protected.",
            },
            {
              title: "Fast & Reliable",
              icon: <FaChartLine className="text-red-500 text-4xl" />,
              desc: "Experience lightning-fast redirects and 99.9% uptime for seamless accessibility worldwide.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/40 hover:scale-105 transition-all duration-300 hover:shadow-[#fc6a00]/50"
            >
              <div className="flex items-center gap-4">
                {feature.icon}
                <h2 className="text-2xl font-bold text-gray-900">{feature.title}</h2>
              </div>
              <p className="text-gray-700 mt-3">{feature.desc}</p>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default AboutPage;
