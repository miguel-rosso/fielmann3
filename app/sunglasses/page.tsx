'use client';

import React, { useState, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import ProductCard from '../components/ProductCard';
import { sampleProducts } from '../data/products';

const SunglassesPage: React.FC = () => {
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'newest' | 'rating'>('name');
  
  // Filter products (sunglasses only)
  const sunglassesProducts = sampleProducts.filter(product => product.category === 'sunglasses');

  // Apply sorting
  const sortedProducts = useMemo(() => {
    const result = [...sunglassesProducts];
    
    result.sort((a, b) => {
      switch (sortBy) {
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
  }, [sunglassesProducts, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-neutral-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-serif text-primary-900 mb-4">
                Premium Sunglasses
              </h1>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
                Protect your eyes in style with our premium collection of sunglasses. 
                UV400 protection, polarized lenses, and timeless designs.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span>UV400 Protection</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span>Polarized Options</span>
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
          {/* Toolbar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <span className="text-sm text-neutral-600">
                {sortedProducts.length} sunglasses available
              </span>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-accent-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
      <CartSidebar />
    </div>
  );
};

export default SunglassesPage;