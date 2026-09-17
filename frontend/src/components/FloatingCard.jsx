import React from 'react';
import { motion } from 'framer-motion';

const FloatingCard = ({ title, content }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.05, rotateY: 10 }}
      className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl text-white relative overflow-hidden group"
    >
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-cyan-400/20 rounded-full blur-3xl group-hover:bg-purple-500/40 transition-all duration-500"></div>
      <h3 className="text-2xl font-bold mb-3 text-cyan-400">{title}</h3>
      <div className="text-gray-300 leading-relaxed whitespace-pre-line">
        {content}
      </div>
    </motion.div>
  );
};

export default FloatingCard;
