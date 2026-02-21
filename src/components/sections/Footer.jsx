import React from 'react';

const Footer = () => {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="bg-black border-t border-gray-800 pt-16">
      <div className="container mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
        
        <div className="font-light">
          <p className="text-gray-300 mb-6">
            En Eureka sabemos que tu tiempo vale oro y tu inversión en marketing debe dar resultados reales. Por eso hacemos que tu cliente ideal te encuentre y entienda cómo puedes solucionar su problema. ¿Cuándo empezamos?
          </p>
          <a href="#" onClick={scrollToTop} className="text-gray-400 hover:text-cyan-400 transition-colors">Eureka Estudio Creativo</a>
        </div>

        <div>
          <p className="font-bold text-white text-xl mb-4">Servicios</p>
          <ul className="space-y-2 font-light text-gray-300">
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Estrategia de contenido</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Email Marketing</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Anuncios en Google</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Anuncios en Redes Sociales</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Desarrollo página web</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Chatbots IA</a></li>
            <li><a href="#" className="hover:text-cyan-400 transition-colors">Consultoría en N8N</a></li>
          </ul>
        </div>

        <div>
          <p className="font-bold text-white text-xl mb-4">Contacto</p>
          <div className="font-light text-gray-300 space-y-3">
            <p><a href="mailto:info@eurekaestudiocreativo.com" className="hover:text-cyan-400 transition-colors">info@eurekaestudiocreativo.com</a></p>
            <p>Hernando de Aguirre 128, Of. 904 – Providencia, Región Metropolitana, Chile</p>
          </div>
          <div className="mt-8">
            <img 
              src="https://eurekaestudiocreativo.com/wp-content/uploads/2023/09/PNG-EUREKA.png" 
              alt="Eureka Logo" 
              className="h-24 opacity-80"
            />
          </div>
        </div>

      </div>
       <div className="container mx-auto px-6 text-center mt-12 border-t border-gray-800 pt-8 pb-8">
        <p className="text-gray-500 text-sm">
          © 2024 Eureka. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;