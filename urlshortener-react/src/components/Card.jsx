import React from "react";
import { motion } from "framer-motion";

const Card = ({ title, desc }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
      className="relative w-[300px] p-6 rounded-xl border border-white/20 bg-[#111827] backdrop-blur-lg shadow-lg
                 transition-all duration-300 hover:shadow-cyan-400/50 hover:border-cyan-400 group"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-transparent to-blue-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

      {/* Content */}
      <h1 className="text-gray-200 text-lg font-extrabold tracking-wide">{title}</h1>
      <p className="text-gray-100 text-sm mt-2">{desc}</p>

      {/* Bottom Light Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
    </motion.div>
  );
};

export default Card;
