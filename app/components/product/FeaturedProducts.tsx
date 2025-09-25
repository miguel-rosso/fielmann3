'use client';

import React from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { useAllProducts } from '@/api/hooks/useAllProducts';
import { useStaggeredAnimation } from '@/api/hooks/useStaggeredAnimation';

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const FeaturedProducts: React.FC = () => {
  const { products: featuredProducts, loading, error } = useAllProducts({ limit: 8 });
  const { getItemClass } = useStaggeredAnimation(featuredProducts.length + 2, 3, 300); // products + header + button

  if (error) {
    return (
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Featured Products</h2>
            <p className="text-neutral-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-white section-reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-12 ${getItemClass(0)}`}>
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-primary-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Discover our most popular eyewear, carefully selected for style, quality, and comfort.
          </p>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                className={getItemClass(index + 1)}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className={`text-center ${getItemClass(featuredProducts.length + 1)}`}>
          <Link
            href="/glasses"
            className="inline-flex items-center gap-2 btn-secondary"
          >
            View All Products
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;