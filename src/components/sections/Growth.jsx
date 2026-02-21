import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import AbstractGrowthSVG from '@/components/ui/AbstractGrowthSVG';

const rotatingWords = [
  "tu marca",
  "tus ventas",
  "tus redes",
  "tu alcance",
  "tu comunidad",
  "tus resultados",
];

const Growth = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 2000); // Change word every 2 seconds
    return () => clearInterval(interval);
  }, []);

  const handleKnowMore = () => {
    window.open('https://eurekaestudiocreativo.com/contacto/', '_blank');
  };

  const variants = {
    enter: {
      y: 20,
      opacity: 0,
    },
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: {
      zIndex: 0,
      y: -20,
      opacity: 0,
    },
  };

  return (
    <AnimatedSection className="pt-8 pb-20 md:py-32 bg-transparent">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left Column: Text Content */}
        <div className="text-left md:order-1 order-2">
          <h2 className="text-4xl sm:text-5xl md:text-7xl leading-tight mb-6">
            <span className="text-white font-bold">Hacemos crecer</span>
            <div className="relative h-16 sm:h-20 md:h-24 mt-2">
              <AnimatePresence>
                <motion.span
                  key={index}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    y: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.5 }
                  }}
                  className="absolute w-full text-cyan-400 text-glow font-light"
                >
                  {rotatingWords[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </h2>
          <motion.p
            className="text-lg text-gray-300 mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Nos especializamos en convertir ideas creativas en estrategias digitales efectivas que conectan con tu público y le dan vida e identidad a tu marca.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Button
              onClick={handleKnowMore}
              className="bg-cyan-400 text-black font-semibold text-lg py-3 px-8 rounded-lg hover-glow transition-all duration-300"
            >
              Conocer Más
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        {/* Right Column: Abstract SVG Animation */}
        <motion.div
          className="flex justify-center md:order-2 order-1 relative w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <AbstractGrowthSVG />
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default Growth;