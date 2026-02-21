import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Firefly = ({ x, y, size, duration, delay }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-cyan-400/50"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        boxShadow: '0 0 8px 2px rgba(0, 255, 255, 0.7)',
        filter: 'blur(1.5px)',
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.8, 0],
        x: [0, Math.random() * 20 - 10],
        y: [0, Math.random() * 20 - 10],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: 'loop',
        delay: delay,
        ease: "easeInOut"
      }}
    />
  );
};

const Fireflies = () => {
    const [fireflies, setFireflies] = useState([]);

    useEffect(() => {
        const generateFireflies = () => {
            const newFireflies = Array.from({ length: 25 }).map((_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 2.5 + 1,
                duration: Math.random() * 5 + 5, // 5 to 10 seconds
                delay: Math.random() * 5,
            }));
            setFireflies(newFireflies);
        };
        generateFireflies();
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
            {fireflies.map(f => (
                <Firefly key={f.id} {...f} />
            ))}
        </div>
    );
};

export default Fireflies;