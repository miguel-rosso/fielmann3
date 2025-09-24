import { Product } from '../context/CartContext';

// Datos de ejemplo para productos
export const sampleProducts: Product[] = [
  // Glasses (Category ID: 4)
  {
    id: 'gl-001',
    name: 'Classic Aviator Frame - Premium Collection',
    price: 149.99,
    image: '/api/placeholder/400/400',
    category: 'glasses',
    categoryId: 4,
    brand: 'Fielmann Classic',
    description: 'Timeless aviator-style eyeglasses with premium materials and exceptional comfort.',
    inStock: true,
    shopId: 10004,
  },
  {
    id: 'gl-002',
    name: 'Modern Rectangle Frame - Business Line',
    price: 199.99,
    image: '/api/placeholder/400/400',
    category: 'glasses',
    categoryId: 4,
    brand: 'Fielmann Pro',
    description: 'Professional rectangular frame perfect for business and everyday wear.',
    inStock: true,
    shopId: 10004,
  },
  {
    id: 'gl-003',
    name: 'Vintage Round Frame - Heritage Collection',
    price: 179.99,
    image: '/api/placeholder/400/400',
    category: 'glasses',
    categoryId: 4,
    brand: 'Fielmann Heritage',
    description: 'Vintage-inspired round frame with contemporary comfort features.',
    inStock: false,
    shopId: 10001,
  },
  {
    id: 'gl-004',
    name: 'Ultra Light Titanium Frame',
    price: 299.99,
    image: '/api/placeholder/400/400',
    category: 'glasses',
    categoryId: 4,
    brand: 'Fielmann Titanium',
    description: 'Featherweight titanium frame with superior durability and comfort.',
    inStock: true,
    shopId: 10006,
  },

  // Sunglasses (Category ID: 7)
  {
    id: 'sg-001',
    name: 'Classic Aviator Sunglasses - Gold Frame',
    price: 89.99,
    image: '/api/placeholder/400/400',
    category: 'sunglasses',
    categoryId: 7,
    brand: 'Fielmann Sun',
    description: 'Iconic aviator sunglasses with gold-plated frame and UV400 protection.',
    inStock: true,
    shopId: 10004,
  },
  {
    id: 'sg-002',
    name: 'Polarized Sport Sunglasses',
    price: 129.99,
    image: '/api/placeholder/400/400',
    category: 'sunglasses',
    categoryId: 7,
    brand: 'Fielmann Sport',
    description: 'High-performance polarized sunglasses for active lifestyles.',
    inStock: true,
    shopId: 10001,
  },
  {
    id: 'sg-003',
    name: 'Designer Cat-Eye Sunglasses',
    price: 159.99,
    image: '/api/placeholder/400/400',
    category: 'sunglasses',
    categoryId: 7,
    brand: 'Fielmann Luxury',
    description: 'Elegant cat-eye sunglasses with premium acetate construction.',
    inStock: true,
    shopId: 10005,
  },
  {
    id: 'sg-004',
    name: 'Retro Round Sunglasses',
    price: 99.99,
    image: '/api/placeholder/400/400',
    category: 'sunglasses',
    categoryId: 7,
    brand: 'Fielmann Retro',
    description: 'Vintage-inspired round sunglasses with modern lens technology.',
    inStock: false,
    shopId: 10006,
  },

  // Contact Lenses (Category ID: 8)
  {
    id: 'cl-001',
    name: 'Daily Comfort Contact Lenses - 30 Pack',
    price: 29.99,
    image: '/api/placeholder/400/400',
    category: 'contacts',
    categoryId: 8,
    brand: 'Fielmann Vision',
    description: 'Premium daily disposable contact lenses for all-day comfort.',
    inStock: true,
    shopId: 10004,
  },
  {
    id: 'cl-002',
    name: 'Monthly Extended Wear Lenses - 6 Pack',
    price: 39.99,
    image: '/api/placeholder/400/400',
    category: 'contacts',
    categoryId: 8,
    brand: 'Fielmann Vision',
    description: 'Long-lasting monthly contact lenses with superior oxygen permeability.',
    inStock: true,
    shopId: 10001,
  },
  {
    id: 'cl-003',
    name: 'Colored Contact Lenses - Blue',
    price: 49.99,
    image: '/api/placeholder/400/400',
    category: 'contacts',
    categoryId: 8,
    brand: 'Fielmann Color',
    description: 'Natural-looking colored contact lenses in stunning blue.',
    inStock: true,
    shopId: 10005,
  },

  // Accessories (Category ID: 9)
  {
    id: 'ac-001',
    name: 'Premium Leather Glasses Case',
    price: 24.99,
    image: '/api/placeholder/400/400',
    category: 'accessories',
    categoryId: 9,
    brand: 'Fielmann Accessories',
    description: 'Handcrafted leather case to protect your eyewear in style.',
    inStock: true,
    shopId: 10004,
  },
  {
    id: 'ac-002',
    name: 'Microfiber Cleaning Kit',
    price: 14.99,
    image: '/api/placeholder/400/400',
    category: 'accessories',
    categoryId: 9,
    brand: 'Fielmann Care',
    description: 'Professional cleaning kit with microfiber cloths and cleaning solution.',
    inStock: true,
    shopId: 10001,
  },
  {
    id: 'ac-003',
    name: 'Adjustable Glasses Chain - Gold',
    price: 19.99,
    image: '/api/placeholder/400/400',
    category: 'accessories',
    categoryId: 9,
    brand: 'Fielmann Style',
    description: 'Elegant gold-plated glasses chain for secure and stylish wearing.',
    inStock: true,
    shopId: 10006,
  },
  {
    id: 'ac-004',
    name: 'Blue Light Blocking Screen Wipes',
    price: 9.99,
    image: '/api/placeholder/400/400',
    category: 'accessories',
    categoryId: 9,
    brand: 'Fielmann Tech',
    description: 'Specialized wipes for cleaning screens and blue light blocking lenses.',
    inStock: true,
    shopId: 10005,
  },
];

// Información de tiendas
export const shopInfo = {
  10004: { country: 'Germany', code: 'DE', name: 'Germany Store' },
  10001: { country: 'Austria', code: 'AT', name: 'Austria Store' },
  10006: { country: 'Poland', code: 'PL', name: 'Poland Store' },
  10005: { country: 'Czech Republic', code: 'CZ', name: 'Czech Store' },
};

// Categorías de productos
export const productCategories = {
  4: { name: 'Glasses', slug: 'glasses' },
  7: { name: 'Sunglasses', slug: 'sunglasses' },
  8: { name: 'Contact Lenses', slug: 'contacts' },
  9: { name: 'Accessories', slug: 'accessories' },
};

// Funciones de utilidad
export const getProductsByCategory = (categoryId: number): Product[] => {
  return sampleProducts.filter(product => product.categoryId === categoryId);
};

export const getProductsByShop = (shopId: number): Product[] => {
  return sampleProducts.filter(product => product.shopId === shopId);
};

export const getFeaturedProducts = (count: number = 8): Product[] => {
  return sampleProducts.slice(0, count);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return sampleProducts.filter(
    product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.brand.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery)
  );
};