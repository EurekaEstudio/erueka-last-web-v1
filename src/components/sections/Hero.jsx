import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import MotionElement from '@/components/MotionElement';

const Hero = () => {
  return (
    <AnimatedSection className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden" id="hero">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <video
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto object-cover transform -translate-x-1/2 -translate-y-1/2 opacity-60"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://taxbbfzqnvgmrdhgfkmn.supabase.co/storage/v1/object/sign/Eureka%20Web%20Resourves/Supabase%20ready%20v2.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80OWQ2NTc2YS1hZjM2LTQzZjUtYTNkYS1jMGU2OTNmZDVlYTIiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJFdXJla2EgV2ViIFJlc291cnZlcy9TdXBhYmFzZSByZWFkeSB2Mi5tcDQiLCJpYXQiOjE3Njc5MDI4MTIsImV4cCI6NDg4OTk2NjgxMn0.ScAPXgCOQJDcHVi5-BhDMukD1xE3aQLbe0nfatDLf80" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-black opacity-50 z-[1]"></div>
      <div className="relative z-[2] w-full max-w-5xl mx-auto px-6 flex flex-col items-center pt-24">
        <MotionElement as="p" className="text-sm md:text-base font-bold tracking-[0.3em] text-cyan-400 uppercase mb-4">
          Eureka Estudio Creativo
        </MotionElement>

        <MotionElement as="h1" className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-tight text-white drop-shadow-xl text-center">
          Comunica.<br className="md:hidden" /> Transmite.<br className="md:hidden" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Vende.</span>
        </MotionElement>

        <MotionElement as="p" className="text-lg md:text-2xl max-w-3xl text-center text-gray-200 font-light mb-10 leading-relaxed">
          Diseño web premium y estrategias digitales para marcas que exigen <strong className="font-semibold text-white">destacar</strong> y <strong className="font-semibold text-white">multiplicar sus resultados</strong>.
        </MotionElement>

        <MotionElement as="div" className="flex justify-center w-full">
          <button
            onClick={() => window.open('https://eurekaestudiocreativo.com/contacto/', '_blank')}
            className="w-full sm:w-auto bg-cyan-400 text-black font-bold text-lg py-4 px-8 rounded-xl hover:bg-cyan-300 hover:-translate-y-1 transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]"
          >
            Agenda tu Diagnóstico
          </button>
        </MotionElement>
      </div>
    </AnimatedSection>
  );
};

export default Hero;