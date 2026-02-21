import React from 'react';
import { SplineScene } from "@/components/ui/spline";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export function SplineSceneFooter() {
  return (
    <div className="container mx-auto px-6 my-16">
      {/* Se añaden clases para la transición del borde y el efecto de hover */}
      <Card className="w-full h-[500px] bg-black/[0.96] relative overflow-hidden border-gray-800 hover:border-cyan-400/50 transition-colors duration-300">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          // El color del spotlight se cambia a cian
          fill="#22d3ee" // Hex code for cyan-400
        />

        <div className="flex flex-col md:flex-row h-full">
          <div className="flex-1 p-8 relative z-10 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              <span className="text-white">Inteligencia Artificial</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">A tu Servicio</span>
            </h2>
            <p className="mt-4 text-gray-300 text-lg md:text-xl max-w-lg mx-auto md:mx-0 font-light leading-relaxed">
              Automatizamos tareas repetitivas y multiplicamos tu capacidad de respuesta. Te devolvemos el tiempo para que te concentres en <strong className="text-white font-semibold">liderar y escalar tu negocio</strong>.
            </p>
          </div>

          <div className="flex-1 relative h-64 md:h-full">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}