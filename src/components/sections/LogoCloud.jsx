import React from 'react';
import AnimatedSection from '@/components/AnimatedSection';

const logos = [
    "https://eurekaestudiocreativo.com/wp-content/uploads/2025/10/8.png",
    "https://eurekaestudiocreativo.com/wp-content/uploads/2025/10/9.png",
    "https://eurekaestudiocreativo.com/wp-content/uploads/2025/10/7.png",
    "https://eurekaestudiocreativo.com/wp-content/uploads/2025/10/6.png",
    "https://eurekaestudiocreativo.com/wp-content/uploads/2025/10/5.png",
    "https://eurekaestudiocreativo.com/wp-content/uploads/2025/10/4.png",
    "https://eurekaestudiocreativo.com/wp-content/uploads/2026/01/FPS-cliente.png",
    "https://eurekaestudiocreativo.com/wp-content/uploads/2026/01/IP-cliente.png",
    "https://eurekaestudiocreativo.com/wp-content/uploads/2026/01/Ruky-cliente.png"
];

// Duplicamos los logos para asegurar el scroll infinito sin cortes bruscos
const allLogos = [...logos, ...logos];

const LogoCloud = () => {
    return (
        <AnimatedSection className="w-full max-w-[1400px] mx-auto py-20 px-4 md:px-8 font-sans overflow-hidden">

            {/* Estilos inyectados directamente para mantener la lógica CSS solicitada por el usuario */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .logo-slider-track {
          display: flex;
          gap: 80px;
          animation: logo-scroll 90s linear infinite;
          width: fit-content;
          align-items: center;
        }

        .logo-slider-track:hover {
          animation-play-state: paused;
        }

        @keyframes logo-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          .logo-slider-track {
            gap: 20px;
            animation: logo-scroll 35s linear infinite; 
          }
        }
      `}} />

            <div className="text-center mb-10 md:mb-16">
                <h2 className="text-[42px] md:text-[76px] font-bold text-white m-0 mb-4 leading-[1.1]">
                    Marcas con las que <span className="text-cyan-400">colaboramos</span>
                </h2>
                <p className="text-[15px] md:text-[18px] text-gray-400 font-normal m-0">
                    Proyectos que crecieron junto a nosotros
                </p>
            </div>

            <div className="relative overflow-hidden py-4 md:py-12">
                {/* Gradientes laterales para efecto de difuminado (fade) */}
                <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

                <div className="logo-slider-track">
                    {allLogos.map((src, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 flex items-center justify-center opacity-100 h-[100px] md:h-[120px] w-[60vw] md:w-auto"
                        >
                            <img
                                src={src}
                                alt="Cliente Eureka"
                                className="h-full w-auto max-h-full max-w-full md:min-w-[120px] md:max-w-[250px] object-contain block brightness-110 opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

export default LogoCloud;
