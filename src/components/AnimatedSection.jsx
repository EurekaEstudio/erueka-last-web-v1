import React from 'react';
import { motion } from 'framer-motion';

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const AnimatedSection = ({ children, className }) => {
  return (
    <motion.section
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;