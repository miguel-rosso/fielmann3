'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartSidebar from '@/components/ui/CartSidebar';
import ProductCard from '@/components/product/ProductCard';
import ProductFilters, { FilterState } from '@/components/product/ProductFilters';
import ProductToolbar from '@/components/product/ProductToolbar';
import PageHeader from '@/components/shared/PageHeader';
import { useContacts } from '@/api/hooks/useContacts';
import { useStaggeredAnimation } from '@/api/hooks/useStaggeredAnimation';

const ContactsPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 500],
    brands: [],
    inStock: null,
    sortBy: 'name',
  });

  // Fetch contact lenses data from API
  const { contacts, loading, error, brands } = useContacts();

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let result = contacts.filter(product => {
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
  }, [contacts, filters]);

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
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Contact Lenses</h2>
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
        <PageHeader
          title="Contact Lenses"
          description="Experience the freedom of contact lenses. Daily, weekly and monthly options for every lifestyle and visual need."
          gradientFrom="from-blue-50"
          gradientTo="to-cyan-50"
          features={[
            { color: "bg-blue-400", text: "Daily Comfort" },
            { color: "bg-green-400", text: "FDA Approved" },
            { color: "bg-purple-400", text: "Expert Fitting" }
          ]}
        />

        {/* Contact Types */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12 section-reveal delay-300">
            <h2 className="text-3xl font-bold font-serif text-primary-900 mb-4">
              Choose Your Perfect Lens
            </h2>
            <p className="text-lg text-neutral-600">
              Different lifestyles need different solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 group-reveal delay-400">
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 modern-card">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Daily Lenses</h3>
                <p className="text-neutral-600 mb-4">
                  Perfect for occasional use, travel or trying lenses for the first time. 
                  No cleaning required - just use and dispose.
                </p>
                <div className="text-sm text-neutral-500">
                  Ideal for: New users, active lifestyles, allergies
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 modern-card">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
                  <span className="text-white font-bold text-lg">7</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Weekly Lenses</h3>
                <p className="text-neutral-600 mb-4">
                  Great balance between convenience and value. Weekly replacement reduces 
                  the risk of protein buildup while being cost-effective.
                </p>
                <div className="text-sm text-neutral-500">
                  Ideal for: Regular use, balanced lifestyle
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 modern-card">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 pulse-glow">
                  <span className="text-white font-bold text-lg">30</span>
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">Monthly Lenses</h3>
                <p className="text-neutral-600 mb-4">
                  More affordable for daily use. Advanced materials provide 
                  excellent oxygen permeability for all-day comfort.
                </p>
                <div className="text-sm text-neutral-500">
                  Ideal for: Daily use, budget-conscious users
                </div>
              </div>
            </div>
          </div>

          {/* Products with Filters */}
          <div className="text-center mb-8 section-reveal delay-filters">
            <h2 className="text-2xl font-bold font-serif text-primary-900 mb-4">
              Our Contact Lens Collection
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 mb-16">
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

        {/* CTA Section */}
        <div className="bg-primary-900 text-white py-16 section-reveal delay-grid">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold font-serif mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-xl text-primary-200 mb-8">
              Our certified optometrists will help you find the perfect contact lenses 
              for your eyes and lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center group-reveal delay-300">
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