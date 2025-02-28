import React from "react";
import Card from "./Card";
import { motion } from "framer-motion";

const LandingPage = () => {
  let desc =
    "Generate short, memorable links with ease using Trimly’s intuitive interface. Share URLs effortlessly across platforms. Optimize your sharing strategy with Linklytics. Track clicks and manage your links seamlessly to enhance your online presence.";

  return (
    <div className="bg-[#fff7f9] min-h-[calc(100vh-64px)] lg:px-14 sm:px-8 px-4">
      {/* Hero Section */}
      <div className="lg:flex-row flex-col lg:py-5 pt-16 lg:gap-10 gap-8 flex justify-between items-center">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
        <motion.h1
            initial={{ opacity: 0, y: -80 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-extrabold font-sans text-transparent bg-clip-text bg-gradient-to-r from-[#eb412e] via-[#db1567] to-[#9b4343] md:text-6xl sm:text-5xl text-4xl md:leading-[65px] sm:leading-[50px] leading-10"
            >
            Trimly Shorten. Share. Track.
          </motion.h1>
          <h3 className="font-bold font-roboto text-slate-900 md:text-4xl sm:text-3xl text-2xl mt-2">
            Simplify Your Links Like Never Before!
          </h3>

          <p className="text-slate-700 text-sm my-5 leading-relaxed md:w-[80%]">
            Trimly streamlines the process of URL shortening, making sharing
            links effortless and efficient. With its user-friendly interface,
            Trimly allows you to generate concise, easy-to-share URLs in
            seconds.
          </p>

          {/* Buttons */}
          <div className="flex justify-center lg:justify-start items-center gap-4">
          <motion.button
              initial={{ opacity: 0, y: 80 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-orange-500 to-red-400 hover:scale-105 transition-all duration-300 text-white w-44 rounded-lg py-3 shadow-lg"
                >
                Manage Links
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 80 }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="border border-red-300 hover:bg-gradient-to-r from-orange-500 to-red-400 hover:text-white transition-all duration-300 w-44 text-blue-500 rounded-lg py-3 shadow-md"
              >
                Create Short Link
            </motion.button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center">
          <img
            className="sm:w-[480px] w-[400px] object-cover rounded-xl"
            src="/Images/trimlylogo.png"
            alt="Trimly Logo"
          />
        </div>
      </div>

      {/* Trusted Section */}
      <div className="sm:pt-12 pt-7">
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
            className="text-slate-800 font-roboto font-bold lg:w-[60%] md:w-[70%] sm:w-[80%] mx-auto text-3xl text-center"
          >
            Trusted by individuals and teams at the world’s best companies.
        </motion.p>

        {/* Cards Grid */}
        <div className="pt-4 pb-7 grid lg:gap-7 gap-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-4">
          <Card
            title="Simple URL Shortening"
            desc="Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface and quick setup process ensure you can start shortening URLs without any hassle."
          />
          <Card
            title="Powerful Analytics"
            desc="Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, geographical data, and referral sources to optimize your marketing strategies."
          />
          <Card
            title="Enhanced Security"
            desc="Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe and secure."
          />
          <Card
            title="Fast and Reliable"
            desc="Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available and responsive, ensuring a seamless experience for your users."
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
