import { ApiResponse, ApiProduct, GlassesApiParams } from '@/api/types/api';

const API_BASE_URL = 'https://fim-test.storefront.api.scayle.cloud/v1';

// Helper function to get attribute value
function getAttributeValue(attributes: Record<string, any>, key: string): string {
  const attr = attributes[key];
  if (!attr) return '';
  
  if (Array.isArray(attr.values)) {
    return attr.values.map((v: any) => v.label).join(', ');
  }
  
  return attr.values?.label || '';
}

// Helper function to construct image URLs
function constructImageUrl(hash: string): string {
  // Hash format from API: "images/52d08cac15a71b5c02428c7989f634b9.png"
  // Scayle CDN pattern: https://{tenant}.cdn.scayle.cloud/{hash}
  return `https://fim-test.cdn.scayle.cloud/${hash}`;
}

// Import the CartContext Product type
import { Product as CartProduct } from '@/context/CartContext';

// Transform API product to CartContext Product type for compatibility
function transformProduct(apiProduct: ApiProduct): CartProduct {
  try {
    const attributes = apiProduct.attributes || {};
    
    const name = getAttributeValue(attributes, 'name') || 
                 getAttributeValue(attributes, 'productNameLong') || 
                 'Unknown Product';
    
    const brand = getAttributeValue(attributes, 'brand') || 'Unknown Brand';
    const modelName = getAttributeValue(attributes, 'modelName');
    const description = getAttributeValue(attributes, 'description') || 
                       (modelName ? `${brand} ${modelName}` : `${brand} Contact Lenses`);
    
    // Use the first image - API products should have images
    const image = apiProduct.images?.length > 0 
      ? constructImageUrl(apiProduct.images[0].hash)
      : 'https://fim-test.cdn.scayle.cloud/images/154f929e6dc5bf7e5625feeb26c64f06.jpeg';
    
    // Since we removed variants for speed, use basic pricing and stock from main product
    const price = 29.99; // Default contact lens price, you can adjust this
    // Use the main product soldOut status - if isSoldOut is false, then it's in stock
    const inStock = !apiProduct.isSoldOut;
    
    return {
      id: apiProduct.id.toString(),
      name,
      brand,
      description,
      price,
      image,
      category: 'contacts' as const,
      categoryId: 8, // Contact Lenses category ID
      inStock,
    };
  } catch (error) {
    console.error('Error in transformProduct:', error, 'Product:', apiProduct);
    throw error;
  }
}

// Fetch contact lenses products from the API
export async function fetchContacts(params: GlassesApiParams = {}): Promise<CartProduct[]> {
  try {
    const queryParams = new URLSearchParams();
    
    queryParams.append('page', '1');
    queryParams.append('perPage', '50'); 
    queryParams.append('filters[category]', '8');
    queryParams.append('with', 'attributes'); // Removed variants to speed up API
    
    const url = `${API_BASE_URL}/products?${queryParams.toString()}`;
    console.log('Fetching contact lenses from:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error('API Response Error:', response.status, response.statusText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    const data: ApiResponse<ApiProduct> = await response.json();
    console.log('API Response received:', data.pagination?.total || 0, 'total products');
    
    // Debug: Log the first product to see its structure
    if (data.entities && data.entities.length > 0) {
      const firstProduct = data.entities[0];
      console.log('First contact lens product ID:', firstProduct.id);
      console.log('Available attributes:', Object.keys(firstProduct.attributes || {}));
      
      // Try to extract names using different possible attribute keys
      const attrs = firstProduct.attributes || {};
      console.log('Testing name attributes:');
      console.log('- name:', getAttributeValue(attrs, 'name'));
      console.log('- productNameLong:', getAttributeValue(attrs, 'productNameLong'));
      console.log('- title:', getAttributeValue(attrs, 'title'));
      console.log('- productName:', getAttributeValue(attrs, 'productName'));
      console.log('- brand:', getAttributeValue(attrs, 'brand'));
    }
    
    if (!data.entities || !Array.isArray(data.entities)) {
      console.error('Invalid API response structure:', data);
      throw new Error('Invalid API response structure');
    }
    
    // All products returned should already be contact lenses (category 8) due to the API filter
    console.log(`Found ${data.entities.length} contact lenses products from API`);
    
    // Transform to our UI format with error handling
    const transformedProducts = data.entities.map((product, index) => {
      try {
        return transformProduct(product);
      } catch (transformError) {
        console.error(`Error transforming product ${product.id}:`, transformError);
        // Return a fallback product
        return {
          id: product.id.toString(),
          name: 'Unknown Product',
          brand: 'Unknown Brand',
          description: 'Product details unavailable',
          price: 0,
          image: 'https://fim-test.cdn.scayle.cloud/images/154f929e6dc5bf7e5625feeb26c64f06.jpeg',
          category: 'contacts' as const,
          categoryId: 8,
          inStock: false,
        };
      }
    });
    
    return transformedProducts;
    
  } catch (error) {
    console.error('Error fetching contact lenses:', error);
    throw new Error(
      error instanceof Error 
        ? `Failed to fetch contact lenses: ${error.message}`
        : 'Failed to fetch contact lenses: Unknown error'
    );
  }
}

// Get all available contact lenses brands
export async function fetchContactsBrands(): Promise<string[]> {
  try {
    const products = await fetchContacts({ limit: 100 });
    const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
    return brands.sort();
  } catch (error) {
    console.error('Error fetching contact lenses brands:', error);
    return [];
  }
}