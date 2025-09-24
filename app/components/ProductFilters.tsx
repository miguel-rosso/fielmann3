'use client';

import React from 'react';

export interface FilterState {
  priceRange: [number, number];
  brands: string[];
  inStock: boolean | null;
  sortBy: 'name' | 'price' | 'newest' | 'rating';
}

interface ProductFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  availableBrands: string[];
  showFilters: boolean;
  onClearFilters: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  setFilters,
  availableBrands,
  showFilters,
  onClearFilters
}) => {
  const handleBrandToggle = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  return (
    <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'} section-reveal delay-filters`}>
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-neutral-900">Filtros</h3>
          <button
            onClick={onClearFilters}
            className="text-sm text-accent-600 hover:text-accent-700"
          >
            Limpiar todo
          </button>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Rango de Precio
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
            Marca
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
            Disponibilidad
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
              <span className="ml-2 text-sm text-neutral-700">Todos los productos</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="stock"
                checked={filters.inStock === true}
                onChange={() => setFilters(prev => ({ ...prev, inStock: true }))}
                className="text-accent-600 focus:ring-accent-500"
              />
              <span className="ml-2 text-sm text-neutral-700">En stock</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="stock"
                checked={filters.inStock === false}
                onChange={() => setFilters(prev => ({ ...prev, inStock: false }))}
                className="text-accent-600 focus:ring-accent-500"
              />
              <span className="ml-2 text-sm text-neutral-700">Sin stock</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;