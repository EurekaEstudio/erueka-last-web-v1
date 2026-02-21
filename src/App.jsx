import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Growth from '@/components/sections/Growth';
import Diagnosis from '@/components/sections/Diagnosis';
import Formula from '@/components/sections/Formula';
import SystemInAction from '@/components/sections/SystemInAction';
import Results from '@/components/sections/Results';
import LogoCloud from '@/components/sections/LogoCloud';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';
import Particles from '@/components/layout/Particles';
import { SplineSceneFooter } from '@/components/sections/SplineSceneFooter';
import ChatWidget from '@/components/ChatWidget';

function App() {
  return (
    <>
      <Helmet>
        <title>Eureka Estudio Creativo</title>
        <meta name="description" content="Integramos comunicación creativa con tecnología inteligente para que destaques en un mercado ruidoso y conviertas el interés en ventas reales. Agenda tu diagnóstico estratégico." />
      </Helmet>

      <div className="relative bg-black min-h-screen">
        <Particles />
        <Header />
        <main className="min-h-screen text-white font-sans overflow-x-hidden relative z-10 bg-transparent">
          <Hero />
          <LogoCloud />
          <div className="md:mt-20">
            <Diagnosis />
          </div>
          <Formula />
          <SplineSceneFooter />
          <SystemInAction />
          <Growth />
          <Results />
          <CTA />
          <Footer />
          <ChatWidget />
          <Toaster />
        </main>
      </div>
    </>
  );
}

export default App;