import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';
import MotionElement from '@/components/MotionElement';
import Tilt from 'react-parallax-tilt';

const CTA = () => {
  const handleCalendlyClick = () => {
    window.open('https://eurekaestudiocreativo.com/contacto/', '_blank');
  };

  return (
    <AnimatedSection className="py-20 bg-gradient-to-t from-gray-900/50 to-black" id="cta">
      <div className="container mx-auto px-6 text-center">
        <MotionElement as="h2" className="text-4xl md:text-6xl font-black mb-6">
          <span className="text-cyan-400">Construyamos tu sistema</span><br />
          de crecimiento inteligente
        </MotionElement>
        
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-12 max-w-5xl mx-auto">
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
                <div className="absolute inset-0 bg-black rounded-full" />
                <Tilt
                  className="w-full h-full rounded-full overflow-hidden p-2"
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  perspective={800}
                >
                  <img
                    src="https://eurekaestudiocreativo.com/wp-content/uploads/2023/09/Daniel-Foto.png"
                    alt="Daniel Suárez D. CEO"
                    className="w-full h-full object-cover rounded-full"
                  />
                </Tilt>
            </div>
            <div className="max-w-xl text-center md:text-left md:pl-8">
                 <MotionElement as="p" className="text-xl md:text-2xl text-cyan-400 font-semibold mb-4">
                    Hablemos 15 minutos. Sin compromiso.
                </MotionElement>
                <p className="text-lg text-gray-300 mb-8 max-w-md mx-auto md:mx-0">
                    Te entregaremos un <span className="font-bold text-white">Diagnóstico Estratégico gratuito</span> para mostrarte dónde una combinación de creatividad y automatización puede generar el mayor impacto en tus ventas.
                </p>
                <div className="flex justify-center md:justify-start">
                    <Button 
                        onClick={handleCalendlyClick}
                        className="w-auto bg-cyan-400 hover:bg-cyan-300 text-black text-lg md:text-xl px-8 py-5 rounded-lg hover-glow transition-all duration-300 flex items-center justify-center"
                    >
                        <Calendar className="mr-3 h-6 w-6" />
                        <span className="font-bold whitespace-nowrap">AGENDAR DIAGNÓSTICO</span>
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default CTA;