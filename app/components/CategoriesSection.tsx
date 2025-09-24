'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStaggeredAnimation } from '../hooks/useStaggeredAnimation';

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  count: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, image, href, count }) => {
  return (
    <Link href={href} className="group block">
      <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm opacity-90 mb-3">{description}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{count}+ estilos</span>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const CategoriesSection: React.FC = () => {
  const { getItemClass } = useStaggeredAnimation(6, 3, 300); // 6 elementos (header + 4 categorías + CTA), 3 por grupo, 300ms delay

  const categories = [
    {
      title: 'Gafas Graduadas',
      description: 'Monturas clásicas y modernas para uso diario',
      image: '/api/placeholder/400/300',
      href: '/glasses',
      count: 150,
    },
    {
      title: 'Gafas de Sol',
      description: 'Protección UV con estilo incomparable',
      image: '/api/placeholder/400/300',
      href: '/sunglasses',
      count: 120,
    },
    {
      title: 'Lentes de Contacto',
      description: 'Opciones diarias, semanales y mensuales',
      image: '/api/placeholder/400/300',
      href: '/contacts',
      count: 50,
    },
    {
      title: 'Accesorios',
      description: 'Estuches, cadenas y productos de limpieza',
      image: '/api/placeholder/400/300',
      href: '/accessories',
      count: 80,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-neutral-50 section-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 ${getItemClass(0)}`}>
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-primary-900 mb-4">
            Comprar por Categoría
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Encuentra las gafas perfectas para tu estilo de vida y necesidades.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={category.href} className={getItemClass(index + 1)}>
              <CategoryCard {...category} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`mt-16 text-center ${getItemClass(5)}`}>
          <div className="bg-primary-900 rounded-2xl p-8 lg:p-12 text-white modern-card">
            <h3 className="text-2xl lg:text-3xl font-bold font-serif mb-4">
              ¿Necesitas Ayuda Eligiendo?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Nuestros expertos ópticos están aquí para ayudarte a encontrar las gafas perfectas. 
              Reserva una consulta gratuita o visita una de nuestras tiendas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation" className="btn-accent">
                Reservar Consulta Gratuita
              </Link>
              <Link href="/stores" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-900 px-6 py-3 rounded-lg font-medium transition-all duration-200">
                Encontrar Tienda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;