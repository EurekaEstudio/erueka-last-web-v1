import React from 'react';
import { motion } from 'framer-motion';
import { Target, MessageCircle, BarChart, Zap, Plus, Bot, Link } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import MotionElement from '@/components/MotionElement';

const ServiceItem = ({ icon, text }) => (
  <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors duration-300">
    <div className="p-2 bg-cyan-950/50 rounded-lg text-cyan-400 border border-cyan-800/50">
      {icon}
    </div>
    <span className="text-lg text-gray-200 font-medium">{text}</span>
  </div>
);

const Formula = () => {
  return (
    <AnimatedSection className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none transform -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none transform -translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <MotionElement as="p" className="text-sm font-bold tracking-widest text-cyan-400 uppercase mb-4">La Fórmula del Crecimiento</MotionElement>
          <MotionElement as="h2" className="text-4xl md:text-5xl lg:text-6xl font-black">
            No se trata de elegir.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Se trata de integrar.</span>
          </MotionElement>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4 relative">

          {/* Card 1: La Base Sólida */}
          <MotionElement className="w-full lg:w-[45%] bg-black/40 backdrop-blur-xl p-10 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gray-800 text-white mb-6">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-white">La Base Sólida</h3>
              <p className="text-xl text-cyan-400 font-semibold mb-8">Visibilidad Extrema</p>
              <div className="space-y-2">
                <ServiceItem icon={<Link className="h-5 w-5" />} text="Diseño Web Orientado a Conversión" />
                <ServiceItem icon={<MessageCircle className="h-5 w-5" />} text="Contenido Viral en Redes" />
                <ServiceItem icon={<BarChart className="h-5 w-5" />} text="Tráfico Calificado (Anuncios)" />
              </div>
            </div>
          </MotionElement>

          {/* Plus Icon Connect */}
          <motion.div
            className="hidden lg:flex items-center justify-center bg-gray-900 border border-gray-700 shadow-[0_0_30px_rgba(34,211,238,0.2)] rounded-full p-4 z-20"
            variants={{
              hidden: { scale: 0, rotate: -180 },
              show: { scale: 1, rotate: 0, transition: { delay: 0.5, type: 'spring', stiffness: 200 } }
            }}
          >
            <Plus className="h-8 w-8 text-cyan-400" />
          </motion.div>
          <div className="block lg:hidden text-cyan-400 my-4 bg-gray-900/50 p-3 rounded-full border border-gray-800">
            <Plus className="h-6 w-6" />
          </div>

          {/* Card 2: El Motor Inteligente */}
          <MotionElement className="w-full lg:w-[45%] bg-black/40 backdrop-blur-xl p-10 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden group mt-0">
            <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gray-800 text-white mb-6">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2 text-white">Motor Inteligente</h3>
              <p className="text-xl text-cyan-400 font-semibold mb-8">Eficiencia Implacable</p>
              <div className="space-y-2">
                <ServiceItem icon={<Bot className="h-5 w-5" />} text="Chatbots de IA 24/7" />
                <ServiceItem icon={<Zap className="h-5 w-5" />} text="Sistemas Automatizados" />
                <ServiceItem icon={<BarChart className="h-5 w-5" />} text="Data Analysis Predictivo" />
              </div>
            </div>
          </MotionElement>

        </div>
      </div>
    </AnimatedSection>
  );
};

export default Formula;
