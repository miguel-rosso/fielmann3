'use client';

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import ProductCard from '../components/ProductCard';
import { sampleProducts } from '../data/products';

const ContactsPage: React.FC = () => {
  const contactProducts = sampleProducts.filter(product => product.category === 'contacts');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-neutral-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-serif text-primary-900 mb-4">
                Contact Lenses
              </h1>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
                Experience the freedom of contact lenses. Daily, weekly, and monthly options 
                for every lifestyle and vision need.
              </p>
              
              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Daily Comfort</h3>
                  <p className="text-neutral-600">Fresh pair every day for ultimate hygiene and comfort</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">FDA Approved</h3>
                  <p className="text-neutral-600">All lenses meet strict safety and quality standards</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">Expert Fitting</h3>
                  <p className="text-neutral-600">Professional consultation and perfect fit guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Types */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-serif text-primary-900 mb-4">
              Choose Your Perfect Lens
            </h2>
            <p className="text-lg text-neutral-600">
              Different lifestyles need different solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Daily Lenses</h3>
                <p className="text-neutral-600 mb-4">
                  Perfect for occasional wear, travel, or trying contacts for the first time. 
                  No cleaning required - just wear and dispose.
                </p>
                <div className="text-sm text-neutral-500">
                  Best for: New users, active lifestyles, allergies
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">7</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Weekly Lenses</h3>
                <p className="text-neutral-600 mb-4">
                  Great balance of convenience and value. Weekly replacement reduces 
                  the risk of protein buildup while being cost-effective.
                </p>
                <div className="text-sm text-neutral-500">
                  Best for: Regular wear, balanced lifestyle
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">30</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Monthly Lenses</h3>
                <p className="text-neutral-600 mb-4">
                  Most economical for daily wear. Advanced materials provide 
                  excellent oxygen permeability for all-day comfort.
                </p>
                <div className="text-sm text-neutral-500">
                  Best for: Daily wear, budget-conscious users
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold font-serif text-primary-900 mb-4">
              Our Contact Lens Collection
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold font-serif mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-xl text-primary-200 mb-8">
              Our certified optometrists will help you find the perfect contact lenses 
              for your eyes and lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-accent">
                Book Eye Exam
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-900 px-8 py-3 rounded-lg font-medium transition-all duration-200">
                Contact Specialist
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