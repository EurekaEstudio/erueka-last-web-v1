import React from 'react';
import AnimatedSection from '@/components/AnimatedSection';
import MotionElement from '@/components/MotionElement';

const ResultCard = ({ imgSrc, title }) => (
  <MotionElement className="bg-gray-900/50 p-6 rounded-xl border border-gray-700 hover-glow flex flex-col items-center text-center h-full">
    <div className="bg-white p-2 rounded-full mb-4 border-2 border-cyan-400/50 shadow-md">
      <img src={imgSrc} alt={title} className="h-10 w-10 md:h-12 md:w-12 object-contain" />
    </div>
    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white flex-grow flex items-center">{title}</h3>
  </MotionElement>
);

const Results = () => {
  const resultsData = [
    {
      imgSrc: "https://eurekaestudiocreativo.com/wp-content/uploads/2025/08/idea.gif",
      title: "Comunicación Clara y Creativa"
    },
    {
      imgSrc: "https://eurekaestudiocreativo.com/wp-content/uploads/2025/08/social-media.gif",
      title: "Imagen Profesional Impecable"
    },
    {
      imgSrc: "https://eurekaestudiocreativo.com/wp-content/uploads/2025/08/rocket.gif",
      title: "Ventas Eficientes y Automatizadas"
    },
    {
      imgSrc: "https://eurekaestudiocreativo.com/wp-content/uploads/2025/08/line-chart.gif",
      title: "Crecimiento Basado en Datos"
    }
  ];

  return (
    <AnimatedSection className="py-20 md:py-32 bg-black">
      <div className="container mx-auto px-6">
        <MotionElement as="h2" className="text-4xl md:text-6xl font-black text-center mb-16">
          Menos ruido,<br />
          <span className="text-cyan-400">más resultados.</span>
        </MotionElement>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
          {resultsData.map((result, index) => (
            <ResultCard 
              key={index}
              imgSrc={result.imgSrc} 
              title={result.title}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Results;