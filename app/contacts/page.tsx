'use client';

import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import ProductCard from '../components/ProductCard';
import ProductFilters, { FilterState } from '../components/ProductFilters';
import ProductToolbar from '../components/ProductToolbar';
import { sampleProducts } from '../data/products';
import { useStaggeredAnimation } from '../hooks/useStaggeredAnimation';

const ContactsPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 500],
    brands: [],
    inStock: null,
    sortBy: 'name',
  });

  // Filter products (contacts only)
  const contactProducts = sampleProducts.filter(product => product.category === 'contacts');
  
  // Get unique brands
  const availableBrands = [...new Set(contactProducts.map(product => product.brand))];

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let result = contactProducts.filter(product => {
      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      // Stock filter
      if (filters.inStock !== null && product.inStock !== filters.inStock) {
        return false;
      }

      return true;
    });

    // Apply sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price':
          return a.price - b.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return b.id.localeCompare(a.id);
        case 'rating':
          return Math.random() - 0.5;
        default:
          return 0;
      }
    });

    return result;
  }, [contactProducts, filters]);

  // Use staggered animation for product cards (3 items per group, 300ms between groups)
  const { getItemClass } = useStaggeredAnimation(filteredProducts.length, 3, 300);

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 500],
      brands: [],
      inStock: null,
      sortBy: 'name',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-neutral-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-neutral-200 section-reveal delay-header">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-serif text-primary-900 mb-4">
                Lentes de Contacto
              </h1>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
                Experimenta la libertad de los lentes de contacto. Opciones diarias, semanales y mensuales 
                para cada estilo de vida y necesidad visual.
              </p>
              
              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 group-reveal delay-200">
                <div className="bg-white rounded-xl p-6 shadow-sm modern-card">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Comodidad Diaria</h3>
                  <p className="text-neutral-600">Par fresco cada día para máxima higiene y comodidad</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm modern-card">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Aprobado por FDA</h3>
                  <p className="text-neutral-600">Todos los lentes cumplen estrictos estándares de seguridad y calidad</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm modern-card">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Ajuste Experto</h3>
                  <p className="text-neutral-600">Consulta profesional y garantía de ajuste perfecto</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Types */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12 section-reveal delay-300">
            <h2 className="text-3xl font-bold font-serif text-primary-900 mb-4">
              Elige Tu Lente Perfecto
            </h2>
            <p className="text-lg text-neutral-600">
              Diferentes estilos de vida necesitan diferentes soluciones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 group-reveal delay-400">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 modern-card">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Lentes Diarios</h3>
                <p className="text-neutral-600 mb-4">
                  Perfectos para uso ocasional, viajes o para probar lentes por primera vez. 
                  No requieren limpieza - solo úsalos y deséchalos.
                </p>
                <div className="text-sm text-neutral-500">
                  Ideal para: Usuarios nuevos, estilos de vida activos, alergias
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 modern-card">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
                  <span className="text-white font-bold text-lg">7</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Lentes Semanales</h3>
                <p className="text-neutral-600 mb-4">
                  Gran equilibrio entre conveniencia y valor. El reemplazo semanal reduce 
                  el riesgo de acumulación de proteínas siendo rentable.
                </p>
                <div className="text-sm text-neutral-500">
                  Ideal para: Uso regular, estilo de vida equilibrado
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 modern-card">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
                  <span className="text-white font-bold text-lg">30</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Lentes Mensuales</h3>
                <p className="text-neutral-600 mb-4">
                  Más económicos para uso diario. Materiales avanzados proporcionan 
                  excelente permeabilidad al oxígeno para comodidad todo el día.
                </p>
                <div className="text-sm text-neutral-500">
                  Ideal para: Uso diario, usuarios conscientes del presupuesto
                </div>
              </div>
            </div>
          </div>

          {/* Products with Filters */}
          <div className="text-center mb-8 section-reveal delay-filters">
            <h2 className="text-2xl font-bold font-serif text-primary-900 mb-4">
              Nuestra Colección de Lentes de Contacto
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 mb-16">
            {/* Filters Sidebar */}
            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              availableBrands={availableBrands}
              showFilters={showFilters}
              onClearFilters={clearFilters}
            />

            {/* Products Section */}
            <div className="flex-1">
              {/* Toolbar */}
              <ProductToolbar
                filters={filters}
                setFilters={setFilters}
                viewMode={viewMode}
                setViewMode={setViewMode}
                showFilters={showFilters}
                setShowFilters={setShowFilters}
                productCount={filteredProducts.length}
              />

              {/* Products Grid */}
              <div className={`${viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
              } section-reveal delay-grid`}>
                {filteredProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    className={`${viewMode === 'list' ? 'flex-row' : ''} ${getItemClass(index)}`}
                  />
                ))}
              </div>

              {/* No Results */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-neutral-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">
                    No se encontraron productos
                  </h3>
                  <p className="text-neutral-500 mb-4">
                    Intenta ajustar tus filtros para ver más resultados.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="btn-primary"
                  >
                    Limpiar Filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary-900 text-white py-16 section-reveal delay-grid">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold font-serif mb-4">
              ¿Necesitas Ayuda para Elegir?
            </h2>
            <p className="text-xl text-primary-200 mb-8">
              Nuestros optometristas certificados te ayudarán a encontrar los lentes de contacto perfectos 
              para tus ojos y estilo de vida.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center group-reveal delay-300">
              <button className="btn-accent">
                Reservar Examen Visual
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-900 px-8 py-3 rounded-lg font-medium transition-all duration-200">
                Contactar Especialista
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartSidebar />
    </div>
  );
};

export default ContactsPage;