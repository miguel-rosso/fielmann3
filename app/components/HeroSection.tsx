'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-accent-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold font-serif text-primary-900 mb-6 leading-tight reveal-animation">
                Tu <span className="text-gradient">Visión</span> Perfecta
                <span className="block text-gradient reveal-animation" style={{animationDelay: '0.2s'}}>
                  Comienza Aquí
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-neutral-600 mb-8 max-w-2xl reveal-animation" style={{animationDelay: '0.4s'}}>
                Descubre nuestra colección exclusiva de gafas de diseño, lentes de contacto 
                premium y accesorios de alta calidad. Más de 50 años creando momentos perfectos.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start reveal-animation" style={{animationDelay: '0.6s'}}>
                <Link href="/glasses" className="btn-primary inline-flex items-center gap-2 group">
                  <span>Explorar Gafas</span>
                  <ArrowRightIcon />
                </Link>
                <Link href="/sunglasses" className="btn-secondary inline-flex items-center gap-2 group">
                  <span>Ver Gafas de Sol</span>
                  <ArrowRightIcon />
                </Link>
              </div>

              {/* Enhanced Features */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="text-center reveal-animation glass-card rounded-xl p-4 modern-card" style={{animationDelay: '0.8s'}}>
                  <div className="text-2xl font-bold text-gradient mb-1 pulse-glow">5000+</div>
                  <div className="text-sm text-neutral-600 font-medium">Marcos Premium</div>
                </div>
                <div className="text-center reveal-animation glass-card rounded-xl p-4 modern-card" style={{animationDelay: '1s'}}>
                  <div className="text-2xl font-bold text-gradient mb-1 pulse-glow">30</div>
                  <div className="text-sm text-neutral-600 font-medium">Días Devolución</div>
                </div>
                <div className="text-center reveal-animation glass-card rounded-xl p-4 modern-card" style={{animationDelay: '1.2s'}}>
                  <div className="text-2xl font-bold text-gradient mb-1 pulse-glow">4.9</div>
                  <div className="text-sm text-neutral-600 font-medium">Rating Cliente</div>
                </div>
              </div>
            </div>

            {/* Enhanced Hero Image */}
            <div className="relative reveal-animation" style={{animationDelay: '0.3s'}}>
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden modern-card shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&h=500&fit=crop&crop=center"
                  alt="Premium eyewear collection"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"></div>
              </div>
              
              {/* Enhanced Floating Cards */}
              <div className="absolute -top-4 -left-4 glass-card p-4 rounded-xl shadow-lg float-animation backdrop-blur-md reveal-animation" style={{animationDelay: '1s'}}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center pulse-glow">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Envío Gratis</div>
                    <div className="text-sm text-neutral-500">En pedidos +€50</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 glass-card p-4 rounded-xl shadow-lg float-animation backdrop-blur-md reveal-animation" style={{ animationDelay: '1.2s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center pulse-glow">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Garantía 2 Años</div>
                    <div className="text-sm text-neutral-500">En todos los marcos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-gradient-to-br from-accent-200 to-accent-300 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-primary-200 to-primary-300 rounded-full opacity-20 blur-3xl"></div>
    </section>
  );
};

export default HeroSection;