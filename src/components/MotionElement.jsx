import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const MotionElement = ({ children, as = 'div', className }) => {
  const Component = motion[as];
  return (
    <Component variants={fadeInUp} className={className}>
      {children}
    </Component>
  );
};

export default MotionElement;