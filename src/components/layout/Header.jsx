import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleButtonClick = () => {
    window.open('https://eurekaestudiocreativo.com/contacto/', '_blank');
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-sm shadow-lg shadow-cyan-500/10' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 md:px-20 flex justify-between items-center h-24 md:h-32">
        <div className="flex-1 flex justify-start">
           <img 
            src="https://eurekaestudiocreativo.com/wp-content/uploads/2023/09/PNG-EUREKA.png" 
            alt="Eureka Estudio Creativo Logo" 
            className="h-20 md:h-32"
          />
        </div>
        
        <div className="flex-1 flex justify-end">
          <motion.button
            onClick={handleButtonClick}
            className="bg-cyan-400 text-black font-semibold text-sm md:text-base tracking-wider py-1.5 px-4 md:py-2 md:px-5 rounded-lg transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(0, 255, 255, 0.7)" }}
            whileTap={{ scale: 0.95 }}
          >
            Agendar Reunión
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;