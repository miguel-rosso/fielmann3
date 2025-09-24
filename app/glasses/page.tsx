'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import ProductCard from '../components/ProductCard';
import { sampleProducts } from '../data/products';
import { useStaggeredAnimation } from '../hooks/useStaggeredAnimation';

const FilterIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
  </svg>
);

const GridIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const ListIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

interface FilterState {
  priceRange: [number, number];
  brands: string[];
  inStock: boolean | null;
  sortBy: 'name' | 'price' | 'newest' | 'rating';
}

const GlassesPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 500],
    brands: [],
    inStock: null,
    sortBy: 'name',
  });

  // Filter products (glasses only)
  const glassesProducts = sampleProducts.filter(product => product.category === 'glasses');
  
  // Get unique brands
  const availableBrands = [...new Set(glassesProducts.map(product => product.brand))];

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let result = glassesProducts.filter(product => {
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
          return b.id.localeCompare(a.id); // Simulate newer products having higher IDs
        case 'rating':
          return Math.random() - 0.5; // Random for demo
        default:
          return 0;
      }
    });

    return result;
  }, [glassesProducts, filters]);

  // Use staggered animation for product cards
  const { getItemClass } = useStaggeredAnimation(filteredProducts.length, 150);

  const handleBrandToggle = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

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
        {/* Page Header */}
        <div className="bg-white border-b border-neutral-200 section-reveal delay-header">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-3xl lg:text-4xl font-bold font-serif text-primary-900 mb-4">
                Prescription Glasses
              </h1>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Discover our premium collection of prescription glasses. From classic to contemporary designs, find the perfect frame for your style.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'} section-reveal delay-filters`}>
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-neutral-900">Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-accent-600 hover:text-accent-700"
                  >
                    Clear all
                  </button>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={filters.priceRange[0]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: [parseInt(e.target.value), prev.priceRange[1]]
                      }))}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                      }))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-neutral-600">
                      <span>€{filters.priceRange[0]}</span>
                      <span>€{filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Brand
                  </label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {availableBrands.map(brand => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={filters.brands.includes(brand)}
                          onChange={() => handleBrandToggle(brand)}
                          className="rounded border-neutral-300 text-accent-600 focus:ring-accent-500"
                        />
                        <span className="ml-2 text-sm text-neutral-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Availability
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="stock"
                        checked={filters.inStock === null}
                        onChange={() => setFilters(prev => ({ ...prev, inStock: null }))}
                        className="text-accent-600 focus:ring-accent-500"
                      />
                      <span className="ml-2 text-sm text-neutral-700">All products</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="stock"
                        checked={filters.inStock === true}
                        onChange={() => setFilters(prev => ({ ...prev, inStock: true }))}
                        className="text-accent-600 focus:ring-accent-500"
                      />
                      <span className="ml-2 text-sm text-neutral-700">In stock</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="stock"
                        checked={filters.inStock === false}
                        onChange={() => setFilters(prev => ({ ...prev, inStock: false }))}
                        className="text-accent-600 focus:ring-accent-500"
                      />
                      <span className="ml-2 text-sm text-neutral-700">Out of stock</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6 section-reveal delay-toolbar">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden flex items-center gap-2 text-neutral-600 hover:text-neutral-900"
                    >
                      <FilterIcon />
                      Filters
                    </button>
                    <span className="text-sm text-neutral-600">
                      {filteredProducts.length} products found
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Sort */}
                    <select
                      value={filters.sortBy}
                      onChange={(e) => setFilters(prev => ({ 
                        ...prev, 
                        sortBy: e.target.value as FilterState['sortBy']
                      }))}
                      className="border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-accent-500 focus:border-transparent text-background"
                    >
                      <option value="name">Sort by Name</option>
                      <option value="price">Sort by Price</option>
                      <option value="newest">Newest First</option>
                      <option value="rating">Highest Rated</option>
                    </select>

                    {/* View Mode */}
                    <div className="flex border border-neutral-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 ${viewMode === 'grid' ? 'bg-accent-500 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                      >
                        <GridIcon />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 ${viewMode === 'list' ? 'bg-accent-500 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                      >
                        <ListIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

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

export default GlassesPage;