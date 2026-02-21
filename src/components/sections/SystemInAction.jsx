import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Globe, Bot, Mail, ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

const iconVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

const Step = ({ icon, title, description, isLast = false, index }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="flex items-start md:flex-col md:items-center md:text-center relative md:flex-1">
      <div className="flex md:flex-col items-center w-full">
        <motion.div
          className="bg-gray-800 border-2 border-cyan-400 rounded-full p-4 mr-6 md:mr-0 md:mb-6 z-10"
          custom={index}
          variants={isMobile ? {} : iconVariants}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          {icon}
        </motion.div>
        <motion.div 
          className="flex-grow"
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
        >
          <h3 className="text-2xl font-bold text-cyan-400 mb-0 md:mb-2">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </motion.div>
      </div>
      
      {!isLast && (
        <div className="absolute top-20 left-8 md:top-10 md:left-1/2 md:right-auto h-[calc(100%-4rem)] md:h-auto md:w-[calc(100%+2rem)] border-l-2 md:border-l-0 md:border-t-2 border-dashed border-gray-600 z-0">
           <ArrowRight className="hidden md:block absolute top-1/2 left-full -translate-x-1/2 -translate-y-1/2 text-cyan-400 bg-gray-900/50 p-1 rounded-full" />
        </div>
      )}
    </div>
  );
};


const SystemInAction = () => {
  return (
    <AnimatedSection className="py-20 bg-gray-900/50 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl md:text-6xl font-black text-center mb-20"
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5 }}
        >
          De un extraño en internet<br />
          <span className="text-cyan-400">a un cliente fiel.</span>
        </motion.h2>
        
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-stretch space-y-16 md:space-y-0 md:space-x-8">
          <Step 
            icon={<Megaphone className="h-10 w-10 text-cyan-400" />}
            title="ATRACCIÓN"
            description="Un anuncio creativo en Meta."
            index={0}
          />
          <Step 
            icon={<Globe className="h-10 w-10 text-cyan-400" />}
            title="IMPRESIÓN"
            description="Aterriza en tu página web profesional."
            index={1}
          />
          <Step 
            icon={<Bot className="h-10 w-10 text-cyan-400" />}
            title="CONEXIÓN"
            description="Un Chatbot IA obtiene sus datos."
            index={2}
          />
          <Step 
            icon={<Mail className="h-10 w-10 text-cyan-400" />}
            title="CONVERSIÓN"
            description="La Automatización notifica a ventas."
            isLast={true}
            index={3}
          />
        </div>
      </div>
    </AnimatedSection>
  );
};

export default SystemInAction;