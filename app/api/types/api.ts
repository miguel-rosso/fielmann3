// API Response Types for Scayle Storefront API

export interface ApiResponse<T> {
  pagination: {
    total: number;
  };
  entities: T[];
}

export interface ProductAttribute {
  id: number;
  key: string;
  label: string;
  type: string;
  multiSelect: boolean;
  values: AttributeValue | AttributeValue[];
}

export interface AttributeValue {
  id: number;
  label: string;
  value: string;
}

export interface ProductImage {
  hash: string;
}

export interface ProductPrice {
  currencyCode: string;
  withTax: number;
  withoutTax: number;
  recommendedRetailPrice: number | null;
  tax: {
    vat: {
      amount: number;
      rate: number;
    };
  };
  appliedReductions: any[];
  reference: {
    withoutTax: number;
    withTax: number;
    size: number;
    unit: string;
  };
}

export interface ProductStock {
  supplierId: number;
  warehouseId: number;
  quantity: number;
  isSellableWithoutStock: boolean;
  expectedAvailabilityAt: string | null;
}

export interface ProductVariant {
  id: number;
  referenceKey: string;
  firstLiveAt: string;
  createdAt: string;
  updatedAt: string;
  stock: ProductStock;
  price: ProductPrice;
  customData: Record<string, any>;
}

export interface ApiProduct {
  id: number;
  isActive: boolean;
  isSoldOut: boolean;
  isNew: boolean;
  createdAt: string;
  updatedAt: string;
  indexedAt: string;
  firstLiveAt: string;
  masterKey: string;
  referenceKey: string;
  attributes: Record<string, ProductAttribute>;
  images: ProductImage[];
  variants: ProductVariant[];
  customData: Record<string, any>;
}

// Transformed types for UI components
export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  category: string;
  subCategory?: string;
  isNew: boolean;
  isSoldOut: boolean;
  inStock: boolean;
  attributes: {
    frameColor?: string;
    lensMaterial?: string;
    shape?: string;
    targetGroup?: string;
    rimType?: string;
    [key: string]: any;
  };
}

export interface GlassesApiParams {
  limit?: number;
  offset?: number;
  categoryId?: number;
  filters?: Record<string, any>;
  with?: string[];
}