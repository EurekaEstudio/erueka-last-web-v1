import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);

  return (
    <section className="relative h-[50vh] overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://eurekaestudiocreativo.com/wp-content/uploads/2023/09/JPG-EUREKA-1.jpg')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          y: y,
        }}
      />
      <div className="absolute inset-0 bg-black/70 z-10" />
    </section>
  );
};

export default ParallaxSection;