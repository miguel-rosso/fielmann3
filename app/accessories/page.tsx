'use client';

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import ProductCard from '../components/ProductCard';
import { sampleProducts } from '../data/products';

const AccessoriesPage: React.FC = () => {
  const accessoryProducts = sampleProducts.filter(product => product.category === 'accessories');

  const accessoryCategories = [
    {
      title: 'Cases & Protection',
      description: 'Keep your eyewear safe with premium cases and protective accessories',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: 'Cleaning & Care',
      description: 'Professional cleaning supplies to keep your lenses crystal clear',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: 'Chains & Straps',
      description: 'Fashion-forward chains and secure straps for active lifestyles',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
    },
    {
      title: 'Tools & Maintenance',
      description: 'Professional tools for adjustments and maintenance',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-neutral-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-serif text-primary-900 mb-4">
                Eyewear Accessories
              </h1>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
                Complete your eyewear experience with our premium collection of cases, 
                cleaning supplies, chains, and maintenance tools.
              </p>
            </div>
          </div>
        </div>

        {/* Category Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif text-primary-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-neutral-600">
              Professional accessories to protect, clean, and style your eyewear
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {accessoryCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                      {category.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Products */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold font-serif text-primary-900 mb-4">
              Featured Accessories
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {accessoryProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Care Guide */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold font-serif text-primary-900 mb-4">
                  Eyewear Care Guide
                </h2>
                <p className="text-lg text-neutral-600">
                  Proper care extends the life of your eyewear and maintains optimal vision
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Daily Cleaning</h3>
                  <p className="text-neutral-600 text-sm">
                    Clean lenses daily with microfiber cloth and lens cleaner. 
                    Rinse with lukewarm water before wiping.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Safe Storage</h3>
                  <p className="text-neutral-600 text-sm">
                    Always store glasses in a protective case when not wearing. 
                    Keep case clean and dry.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Regular Maintenance</h3>
                  <p className="text-neutral-600 text-sm">
                    Schedule professional cleaning and adjustments every 6 months 
                    to maintain optimal fit and function.
                  </p>
                </div>
              </div>

              <div className="text-center mt-12">
                <div className="bg-accent-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Professional Care Service
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    Bring your eyewear to any Fielmann store for complimentary professional cleaning, 
                    adjustments, and minor repairs.
                  </p>
                  <button className="btn-accent">
                    Find Nearest Store
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartSidebar />
    </div>
  );
};

export default AccessoriesPage;