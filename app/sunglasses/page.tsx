'use client';

import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import ProductCard from '../components/ProductCard';
import ProductFilters, { FilterState } from '../components/ProductFilters';
import ProductToolbar from '../components/ProductToolbar';
import { useSunglasses } from '../hooks/useSunglasses';
import { useStaggeredAnimation } from '../hooks/useStaggeredAnimation';

const SunglassesPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 500],
    brands: [],
    inStock: null,
    sortBy: 'name',
  });

  // Fetch sunglasses data from API
  const { sunglasses, loading, error, brands } = useSunglasses();

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let result = sunglasses.filter(product => {
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
  }, [sunglasses, filters]);

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

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-neutral-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Sunglasses</h2>
            <p className="text-neutral-600">{error}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-neutral-50">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-neutral-200 section-reveal delay-header">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-serif text-primary-900 mb-4">
                Premium Sunglasses
              </h1>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
                Protect your eyes in style with our premium sunglasses collection. 
                UV400 protection, polarized lenses and timeless designs.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-background">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm ">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span>UV400 Protection</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span>Polarized Lenses</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span>Impact Resistant</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              availableBrands={brands}
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
                loading={loading}
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
                    No products found
                  </h3>
                  <p className="text-neutral-500 mb-4">
                    Try adjusting your filters to see more results.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="btn-primary"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartSidebar />
    </div>
  );
};

export default SunglassesPage;