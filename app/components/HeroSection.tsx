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
              <h1 className="text-4xl lg:text-6xl font-bold font-serif text-primary-900 mb-6 leading-tight">
                See the World
                <span className="block text-accent-600">
                  Clearly
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-neutral-600 mb-8 max-w-2xl">
                Discover our premium collection of glasses, sunglasses, and contact lenses. 
                Crafted with precision, designed for comfort, and built to last.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/glasses" className="btn-primary inline-flex items-center gap-2">
                  Shop Glasses
                  <ArrowRightIcon />
                </Link>
                <Link href="/sunglasses" className="btn-secondary inline-flex items-center gap-2">
                  Shop Sunglasses
                  <ArrowRightIcon />
                </Link>
              </div>

              {/* Features */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-900 mb-1">500+</div>
                  <div className="text-sm text-neutral-600">Premium Frames</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-900 mb-1">30</div>
                  <div className="text-sm text-neutral-600">Day Returns</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-900 mb-1">4.9</div>
                  <div className="text-sm text-neutral-600">Customer Rating</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/api/placeholder/600/500"
                  alt="Premium eyewear collection"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Free Shipping</div>
                    <div className="text-sm text-neutral-500">On orders over €50</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">2 Year Warranty</div>
                    <div className="text-sm text-neutral-500">On all frames</div>
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