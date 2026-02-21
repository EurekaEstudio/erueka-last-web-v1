import React from 'react';
import { motion } from 'framer-motion';

const AbstractGrowthSVG = () => {
    return (
        <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center">
            {/* Background glow */}
            <div className="absolute inset-0 bg-cyan-500/20 blur-[80px] rounded-full mix-blend-screen animate-pulse duration-3000" />

            <svg
                viewBox="0 0 400 400"
                className="w-full h-full relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
                        <stop offset="50%" stopColor="#0891b2" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#164e63" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="blueGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.2" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                {/* Outer Orbiting Ring 1 */}
                <motion.circle
                    cx="200"
                    cy="200"
                    r="160"
                    stroke="url(#blueGrad)"
                    strokeWidth="2"
                    strokeDasharray="10 20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "200px 200px" }}
                />

                {/* Outer Orbiting Ring 2 */}
                <motion.circle
                    cx="200"
                    cy="200"
                    r="140"
                    stroke="url(#cyanGrad)"
                    strokeWidth="3"
                    strokeDasharray="40 80"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "200px 200px" }}
                />

                {/* Central Complex Geometry - Hexagon Base */}
                <motion.path
                    d="M200 80 L304 140 L304 260 L200 320 L96 260 L96 140 Z"
                    stroke="url(#cyanGrad)"
                    strokeWidth="4"
                    fill="rgba(34, 211, 238, 0.05)"
                    filter="url(#glow)"
                    animate={{
                        scale: [1, 1.05, 1],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ transformOrigin: "200px 200px" }}
                />

                {/* Inner Connecting Lines representing Network/Growth */}
                <g stroke="rgba(34,211,238,0.4)" strokeWidth="2">
                    <motion.line
                        x1="200" y1="80" x2="200" y2="320"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    />
                    <motion.line
                        x1="96" y1="140" x2="304" y2="260"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    />
                    <motion.line
                        x1="96" y1="260" x2="304" y2="140"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    />
                </g>

                {/* Pulsing Core */}
                <motion.circle
                    cx="200"
                    cy="200"
                    r="30"
                    fill="url(#cyanGrad)"
                    filter="url(#glow)"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Floating Data Nodes */}
                {[
                    { cx: 96, cy: 140, r: 6, delay: 0 },
                    { cx: 304, cy: 140, r: 8, delay: 0.5 },
                    { cx: 304, cy: 260, r: 6, delay: 1 },
                    { cx: 96, cy: 260, r: 8, delay: 1.5 },
                    { cx: 200, cy: 80, r: 10, delay: 2 },
                    { cx: 200, cy: 320, r: 10, delay: 2.5 }
                ].map((node, i) => (
                    <motion.circle
                        key={i}
                        cx={node.cx}
                        cy={node.cy}
                        r={node.r}
                        fill="#fff"
                        filter="url(#glow)"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 2,
                            delay: node.delay,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}

                {/* Upward Growth Particles */}
                {Array.from({ length: 15 }).map((_, i) => {
                    const startX = 100 + Math.random() * 200;
                    const startY = 350 + Math.random() * 50;
                    return (
                        <motion.circle
                            key={`particle-${i}`}
                            r={Math.random() * 3 + 1}
                            fill="#22d3ee"
                            initial={{ x: startX, y: startY, opacity: 0 }}
                            animate={{
                                y: startY - (150 + Math.random() * 150),
                                opacity: [0, 1, 0],
                                x: startX + (Math.random() * 40 - 20)
                            }}
                            transition={{
                                duration: 3 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                                ease: "linear"
                            }}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

export default AbstractGrowthSVG;
