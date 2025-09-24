'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { Product } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 overflow-hidden group modern-card ${className}`}>
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center">
              <span className="text-white font-bold text-lg mb-2 block">Agotado</span>
              <div className="w-16 h-1 bg-red-500 mx-auto rounded-full"></div>
            </div>
          </div>
        )}
        
        {/* Brand Badge */}
        <div className="absolute top-4 right-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg pulse-glow">
          {product.brand}
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-md">
          {product.category}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Product Info */}
      <div className="p-6 bg-gradient-to-br from-white to-gray-50">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        {/* Price and Stock Status */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-gradient">
              €{product.price.toFixed(2)}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              {product.inStock ? 'En stock' : 'Sin stock'}
            </span>
          </div>
          
          {product.inStock && (
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform relative overflow-hidden ${
            product.inStock
              ? 'btn-primary hover:scale-105 cursor-pointer'
              : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600 cursor-not-allowed'
          }`}
        >
          <span className="relative z-10">
            {product.inStock ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01" />
                </svg>
                <span>Añadir al Carrito</span>
              </div>
            ) : (
              'No Disponible'
            )}
          </span>
        </button>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 bg-gradient-to-r from-primary-400 via-accent-400 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </div>
  );
};

export default ProductCard;
