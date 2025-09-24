import { ApiResponse, ApiProduct, GlassesApiParams } from '../types/api';

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
import { Product as CartProduct } from '../context/CartContext';

// Transform API product to CartContext Product type for compatibility
function transformProduct(apiProduct: ApiProduct): CartProduct {
  try {
    const attributes = apiProduct.attributes || {};
    const variant = apiProduct.variants?.[0]; // Use first variant for pricing
    
    const name = getAttributeValue(attributes, 'name') || 
                 getAttributeValue(attributes, 'productNameLong') || 
                 'Unknown Product';
    
    const brand = getAttributeValue(attributes, 'brand') || 'Unknown Brand';
    const modelName = getAttributeValue(attributes, 'modelName');
    const description = getAttributeValue(attributes, 'description') || 
                       (modelName ? `${brand} ${modelName}` : `${brand} Sunglasses`);
    
    // Use the first image - API products should have images
    const image = apiProduct.images?.length > 0 
      ? constructImageUrl(apiProduct.images[0].hash)
      : '/placeholder-sunglasses.jpg';
    
    const price = variant?.price?.withTax ? variant.price.withTax / 100 : 0;
    const inStock = variant?.stock?.quantity > 0;
    
    return {
      id: apiProduct.id.toString(),
      name,
      brand,
      description,
      price,
      image,
      category: 'sunglasses' as const,
      categoryId: 7, // Sunglasses category ID
      inStock,
    };
  } catch (error) {
    console.error('Error in transformProduct:', error, 'Product:', apiProduct);
    throw error;
  }
}

// Fetch sunglasses products from the API
export async function fetchSunglasses(params: GlassesApiParams = {}): Promise<CartProduct[]> {
  try {
    const queryParams = new URLSearchParams();
    
    // Add basic parameters using page/perPage format
    queryParams.append('page', '1');
    queryParams.append('perPage', (params.limit || 50).toString());
    
    // Always include attributes and variants for detailed product info
    queryParams.append('with', 'attributes,variants');
    
    // Filter for sunglasses products using category filter
    // Category 7 corresponds to sunglasses products
    queryParams.append('filters[category]', '7');
    
    const url = `${API_BASE_URL}/products?${queryParams.toString()}`;
    console.log('Fetching sunglasses from:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('API Response Error:', response.status, response.statusText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    const data: ApiResponse<ApiProduct> = await response.json();
    console.log('API Response received:', data.pagination?.total || 0, 'total products');
    
    if (!data.entities || !Array.isArray(data.entities)) {
      console.error('Invalid API response structure:', data);
      throw new Error('Invalid API response structure');
    }
    
    // All products returned should already be sunglasses due to the API filter
    console.log(`Found ${data.entities.length} sunglasses products from API`);
    
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
          image: '/placeholder-sunglasses.jpg',
          category: 'sunglasses' as const,
          categoryId: 7,
          inStock: false,
        };
      }
    });
    
    return transformedProducts;
    
  } catch (error) {
    console.error('Error fetching sunglasses:', error);
    throw new Error(
      error instanceof Error 
        ? `Failed to fetch sunglasses: ${error.message}`
        : 'Failed to fetch sunglasses: Unknown error'
    );
  }
}

// Get all available sunglasses brands
export async function fetchSunglassesBrands(): Promise<string[]> {
  try {
    const products = await fetchSunglasses({ limit: 100 });
    const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
    return brands.sort();
  } catch (error) {
    console.error('Error fetching sunglasses brands:', error);
    return [];
  }
}