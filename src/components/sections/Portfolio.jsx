import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// 1. Import Swiper y sus módulos (sin Navigation)
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// 2. Importa los estilos de Swiper
import 'swiper/css';
import 'swiper/css/pagination';

// --- Datos del Portafolio ---
const portfolioData = [
  {
    type: 'Sitio Web',
    title: 'Galio Comunicaciones',
    description: 'Sitio web corporativo para agencia de comunicaciones.',
    imageUrl: 'https://image.thum.io/get/width/600/crop/400/https://galiocomunicaciones.com/',
    linkUrl: 'https://galiocomunicaciones.com/',
  },
  {
    type: 'Sitio Web',
    title: 'HLM Consultores',
    description: 'Plataforma web para consultora de negocios y gestión.',
    imageUrl: 'https://s0.wordpress.com/mshots/v1/https%3A%2F%2Fhlmconsultores.com%2F?w=600&h=400',
    linkUrl: 'https://hlmconsultores.com/',
  },
  {
    type: 'Sitio Web',
    title: 'El Buen Dentista',
    description: 'Página web para clínica dental, enfocada en la experiencia del paciente.',
    imageUrl: 'https://s0.wordpress.com/mshots/v1/https%3A%2F%2Felbuendentista.cl%2F?w=600&h=400',
    linkUrl: 'https://elbuendentista.cl/',
  },
  {
    type: 'Sitio Web',
    title: 'Yany Servicios',
    description: 'Plataforma de servicios integrales y soluciones personalizadas.',
    imageUrl: 'https://s0.wordpress.com/mshots/v1/https%3A%2F%2Fservicios.yany.cl%2F?w=600&h=400',
    linkUrl: 'https://servicios.yany.cl/',
  },
  {
    type: 'Sitio Web',
    title: 'Innova HRS',
    description: 'Consultoría y soluciones en recursos humanos.',
    imageUrl: 'https://image.thum.io/get/width/600/crop/400/https://innovahrs.com/',
    linkUrl: 'https://innovahrs.com/',
  },
];

// --- Componente de la Tarjeta de Proyecto ---
const PortfolioCard = ({ project }) => {
  return (
    <motion.a
      href={project.linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/50 hover:border-cyan-400/50 transition-colors duration-300 h-full flex flex-col"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.imageUrl}
          alt={`Previsualización de ${project.title}`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all"></div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-center">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold bg-gray-700 text-gray-200`}>
            {project.type}
          </span>
          <ArrowUpRight className="h-5 w-5 text-gray-500 transition-colors group-hover:text-cyan-400" />
        </div>
        <h3 className="mt-4 text-xl font-bold text-white">{project.title}</h3>
        <p className="mt-1 text-gray-400 flex-grow">{project.description}</p>
      </div>
    </motion.a>
  );
};

// --- Componente Principal de la Sección con Carrusel Infinito ---
const Portfolio = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl md:text-6xl font-black text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Nuestros Proyectos
        </motion.h2>
        
        <Swiper
          // Módulos: solo paginación
          modules={[Pagination]}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          // Navegación con flechas eliminada
          pagination={{ clickable: true }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 30
            },
          }}
          className="!pb-12"
        >
          {portfolioData.map((project, index) => (
            <SwiperSlide key={index} className="h-auto pb-4">
              <PortfolioCard project={project} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Portfolio;