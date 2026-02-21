import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Tilt from 'react-parallax-tilt';

const ParallaxCta = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['-25%', '25%']);

  const handleButtonClick = () => {
    const ctaSection = document.getElementById('cta');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[80vh] md:h-[90vh] overflow-hidden flex items-center justify-center">
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://eurekaestudiocreativo.com/wp-content/uploads/2023/09/JPG-EUREKA-1.jpg')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          y: y,
        }}
      />
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="relative z-20 container mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12 text-center md:text-left">
        <Tilt
          className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-cyan-400 shadow-2xl shadow-cyan-500/30"
          tiltMaxAngleX={10}
          tiltMaxAngleY={10}
          perspective={800}
        >
          <img
            src="https://eurekaestudiocreativo.com/wp-content/uploads/2023/09/Daniel-Foto.png"
            alt="Daniel Suárez D. CEO"
            className="w-full h-full object-cover"
          />
        </Tilt>
        <div className="max-w-xl">
          <motion.h2
            className="text-4xl md:text-6xl font-semibold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            ¿Agendamos una reunión?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ahorra el tiempo que pierdes respondiendo las mismas preguntas básicas por WhatsApp todos los días. Vamos al grano: Me cuentas hacia dónde quieres llegar con tu negocio y yo te ayudo a hacer el mapa para conseguirlo.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              onClick={handleButtonClick}
              className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xl px-10 py-7 rounded-lg hover-glow transition-all duration-300"
            >
              Conversemos
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxCta;