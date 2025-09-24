'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStaggeredAnimation } from '@/api/hooks/useStaggeredAnimation';

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
              <span className="text-sm font-medium">{count}+ styles</span>
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
  const { getItemClass } = useStaggeredAnimation(6, 3, 300); // 6 elements (header + 4 categories + CTA), 3 per group, 300ms delay

  const categories = [
    {
      title: 'Prescription Glasses',
      description: 'Classic and modern frames for everyday wear',
      image: '/api/placeholder/400/300',
      href: '/glasses',
      count: 150,
    },
    {
      title: 'Sunglasses',
      description: 'UV protection with uncompromising style',
      image: '/api/placeholder/400/300',
      href: '/sunglasses',
      count: 120,
    },
    {
      title: 'Contact Lenses',
      description: 'Daily, weekly, and monthly options',
      image: '/api/placeholder/400/300',
      href: '/contacts',
      count: 50,
    },
    {
      title: 'Accessories',
      description: 'Cases, chains, and cleaning supplies',
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
            Shop by Category
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Find the perfect eyewear for your lifestyle and needs.
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
              Need Help Choosing?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Our expert opticians are here to help you find the perfect eyewear. 
              Book a free consultation or visit one of our stores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultation" className="btn-accent">
                Book Free Consultation
              </Link>
              <Link href="/stores" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-900 px-6 py-3 rounded-lg font-medium transition-all duration-200">
                Find a Store
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;