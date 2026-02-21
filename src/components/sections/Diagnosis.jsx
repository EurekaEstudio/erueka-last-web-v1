import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Link2Off, ThumbsDown, ShoppingCart, Hourglass, Bot, VolumeX, FilterX } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

const Diagnosis = () => {
  const [isRuidoHovered, setIsRuidoHovered] = useState(false);
  const [isFugaHovered, setIsFugaHovered] = useState(false);

  // Variantes para la animación del TÍTULO de RUIDO
  const ruidoTitleVariants = {
    initial: { x: 0 },
    hover: {
      x: [0, -1, 1, -1, 1, 0],
      transition: { duration: 0.4 },
    },
  };

  // Variantes para la animación del TÍTULO de FUGA
  const fugaTitleVariants = {
    initial: { opacity: 1 },
    hover: { opacity: 0.2, transition: { duration: 0.4 } },
  };

  return (
    <AnimatedSection className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl md:text-6xl font-black text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Todo negocio lucha en dos frentes.<br />
          <span className="text-cyan-400">¿Reconoces los tuyos?</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* --- TARJETA EL RUIDO --- */}
          <motion.div
            className="group relative overflow-hidden rounded-3xl border border-gray-800 hover-glow flex flex-col min-h-[450px]"
            onMouseEnter={() => setIsRuidoHovered(true)}
            onMouseLeave={() => setIsRuidoHovered(false)}
          >
            {/* Background Image Setup */}
            <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
              <img src="/noise_bg.png" alt="Digital noise" className="w-full h-full object-cover opacity-40 mix-blend-screen" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
            </div>

            <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
              <div className="flex items-center mb-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <VolumeX className="h-12 w-12 text-cyan-400 mr-6 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                </motion.div>
                <motion.h3
                  className="text-3xl lg:text-4xl font-black text-white uppercase tracking-wider"
                  variants={ruidoTitleVariants}
                  animate={isRuidoHovered ? "hover" : "initial"}
                >
                  El Ruido
                </motion.h3>
              </div>
              <p className="text-xl text-cyan-300 font-semibold mb-6">Problema de Visibilidad</p>

              <ul className="space-y-5 text-gray-200 text-lg flex-grow">
                <li className="flex items-start"><ShieldAlert className="h-6 w-6 text-cyan-400 mr-4 mt-1 flex-shrink-0" /><span>Tu competencia <span className="font-bold text-white">grita más fuerte</span>.</span></li>
                <li className="flex items-start"><Link2Off className="h-6 w-6 text-cyan-400 mr-4 mt-1 flex-shrink-0" /><span>Tus perfiles sociales <span className="font-bold text-white">no conectan</span>.</span></li>
                <li className="flex items-start"><ThumbsDown className="h-6 w-6 text-cyan-400 mr-4 mt-1 flex-shrink-0" /><span>Tu web actual <span className="font-bold text-white">resta valor</span> a tu marca.</span></li>
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-800/50">
                <p className="text-2xl text-white"><span className='font-light text-gray-400'>Resultado:</span> <span className='font-bold text-red-400'>Eres invisible.</span></p>
              </div>
            </div>
          </motion.div>

          {/* --- TARJETA LA FUGA --- */}
          <motion.div
            className="group relative overflow-hidden rounded-3xl border border-gray-800 hover-glow flex flex-col min-h-[450px]"
            onMouseEnter={() => setIsFugaHovered(true)}
            onMouseLeave={() => setIsFugaHovered(false)}
          >
            {/* Background Image Setup */}
            <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105">
              <img src="/leak_bg.png" alt="Time leak" className="w-full h-full object-cover opacity-40 mix-blend-screen" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
            </div>

            <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
              <div className="flex items-center mb-6">
                <motion.div>
                  <FilterX className="h-12 w-12 text-cyan-400 mr-6 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                </motion.div>
                <motion.h3
                  className="text-3xl lg:text-4xl font-black text-white uppercase tracking-wider"
                  variants={fugaTitleVariants}
                  animate={isFugaHovered ? "hover" : "initial"}
                >
                  La Fuga
                </motion.h3>
              </div>
              <p className="text-xl text-cyan-300 font-semibold mb-6">Problema de Conversión</p>

              <ul className="space-y-5 text-gray-200 text-lg flex-grow">
                <li className="flex items-start"><ShoppingCart className="h-6 w-6 text-cyan-400 mr-4 mt-1 flex-shrink-0" /><span>Recibes visitas, pero <span className="font-bold text-white">nadie compra</span>.</span></li>
                <li className="flex items-start"><Hourglass className="h-6 w-6 text-cyan-400 mr-4 mt-1 flex-shrink-0" /><span>Tardas <span className="font-bold text-white">horas en contestar</span> a clientes.</span></li>
                <li className="flex items-start"><Bot className="h-6 w-6 text-cyan-400 mr-4 mt-1 flex-shrink-0" /><span>Pierdes tu tiempo en <span className="font-bold text-white">tareas repetitivas</span>.</span></li>
              </ul>

              <div className="mt-8 pt-6 border-t border-gray-800/50">
                <p className="text-2xl text-white"><span className='font-light text-gray-400'>Resultado:</span> <span className='font-bold text-red-400'>Pierdes dinero.</span></p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Diagnosis;