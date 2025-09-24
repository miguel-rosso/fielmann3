'use client';

import React from 'react';
import { FilterState } from './ProductFilters';

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

interface ProductToolbarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  viewMode: 'grid' | 'list';
  setViewMode: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  productCount: number;
}

const ProductToolbar: React.FC<ProductToolbarProps> = ({
  filters,
  setFilters,
  viewMode,
  setViewMode,
  showFilters,
  setShowFilters,
  productCount
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 section-reveal delay-toolbar">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 text-neutral-600 hover:text-neutral-900 cursor-pointer"
          >
            <FilterIcon />
            Filtros
          </button>
          <span className="text-sm text-neutral-600">
            {productCount} productos encontrados
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
            className="border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-accent-500 focus:border-transparent text-background cursor-pointer"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="newest">Newest</option>
            <option value="rating">Mejor Valorados</option>
          </select>

          {/* View Mode */}
          <div className="flex border border-neutral-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 cursor-pointer ${viewMode === 'grid' ? 'bg-accent-500 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
            >
              <GridIcon />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 cursor-pointer ${viewMode === 'list' ? 'bg-accent-500 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
            >
              <ListIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductToolbar;