'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '../context/CartContext';
import { useCart } from '../context/CartContext';

const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const StarIcon = ({ filled }: { filled?: boolean }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-neutral-300'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      addToCart(product);
      // Simular un pequeño delay para mejor UX
      await new Promise(resolve => setTimeout(resolve, 300));
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  // Rating ficticio para demostración
  const rating = 4.5;
  const reviewCount = Math.floor(Math.random() * 200) + 10;

  return (
    <div className={`group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}>
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <HeartIcon filled={isWishlisted} />
        </button>

        {/* Sale Badge */}
        {Math.random() > 0.7 && (
          <div className="absolute top-3 left-3 bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Sale
          </div>
        )}

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white px-4 py-2 rounded-lg">
              <span className="text-sm font-medium text-neutral-900">Out of Stock</span>
            </div>
          </div>
        )}

        {/* Quick Add Button - Shows on Hover */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isLoading}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
              product.inStock
                ? 'bg-primary-900 text-white hover:bg-primary-800 active:scale-95'
                : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? 'Adding...' : 'Quick Add'}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand */}
        <div className="text-sm text-neutral-500 mb-1">
          {product.brand}
        </div>

        {/* Product Name */}
        <h3 className="font-medium text-neutral-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon key={star} filled={star <= Math.floor(rating)} />
            ))}
          </div>
          <span className="text-sm text-neutral-500 ml-1">
            ({reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-neutral-900">
              {formatPrice(product.price)}
            </span>
            {Math.random() > 0.8 && (
              <span className="text-sm text-neutral-500 line-through">
                {formatPrice(product.price * 1.2)}
              </span>
            )}
          </div>
          
          {/* Category Badge */}
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            product.category === 'glasses' ? 'bg-blue-100 text-blue-800' :
            product.category === 'sunglasses' ? 'bg-yellow-100 text-yellow-800' :
            product.category === 'contacts' ? 'bg-green-100 text-green-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {product.category}
          </span>
        </div>

        {/* Add to Cart Button - Mobile */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isLoading}
          className={`w-full mt-3 py-2 px-4 rounded-lg font-medium transition-all duration-200 md:hidden ${
            product.inStock
              ? 'bg-primary-900 text-white hover:bg-primary-800 active:scale-95'
              : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Adding...' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;