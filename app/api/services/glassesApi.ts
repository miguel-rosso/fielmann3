import { ApiResponse, ApiProduct, GlassesApiParams } from '@/api/types/api';

const API_BASE_URL = 'https://fim-test.storefront.api.scayle.cloud/v1';
const IMAGE_BASE_URL = 'https://fim-test.storefront.api.scayle.cloud'; // We'll need to construct the full image URL

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
    const variant = apiProduct.variants?.[0]; // Use first variant for pricing
    
    const name = getAttributeValue(attributes, 'name') || 
                 getAttributeValue(attributes, 'productNameLong') || 
                 'Unknown Product';
    
    const brand = getAttributeValue(attributes, 'brand') || 'Unknown Brand';
    const modelName = getAttributeValue(attributes, 'modelName');
    const description = getAttributeValue(attributes, 'description') || 
                       (modelName ? `${brand} ${modelName}` : `${brand} Glasses`);
    
    // Use the first image - API products should have images
    const image = apiProduct.images?.length > 0 
      ? constructImageUrl(apiProduct.images[0].hash)
      : '/placeholder-glasses.jpg';
    
    const price = variant?.price?.withTax ? variant.price.withTax / 100 : 0;
    const inStock = variant?.stock?.quantity > 0;
    
    return {
      id: apiProduct.id.toString(),
      name,
      brand,
      description,
      price,
      image,
      category: 'glasses' as const,
      categoryId: 4, // Glasses category ID
      inStock,
    };
  } catch (error) {
    console.error('Error in transformProduct:', error, 'Product:', apiProduct);
    throw error;
  }
}

// Fetch glasses products from the API
export async function fetchGlasses(params: GlassesApiParams = {}): Promise<CartProduct[]> {
  try {
    const queryParams = new URLSearchParams();
    
    // Add basic parameters using page/perPage format
    queryParams.append('page', '1');
    queryParams.append('perPage', (params.limit || 50).toString());
    
    // Always include attributes and variants for detailed product info
    queryParams.append('with', 'attributes,variants');
    
    // Filter specifically for glasses products using category filter  
    // Category 4 corresponds to glasses/Brillen products
    queryParams.append('filters[category]', '4');
    
    const url = `${API_BASE_URL}/products?${queryParams.toString()}`;
    console.log('Fetching glasses from:', url);
    
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
    
    // All products returned should already be glasses (category 4) due to the API filter
    console.log(`Found ${data.entities.length} glasses products from API`);
    
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
          image: '/placeholder-glasses.jpg',
          category: 'glasses' as const,
          categoryId: 4,
          inStock: false,
        };
      }
    });
    
    return transformedProducts;
    
  } catch (error) {
    console.error('Error fetching glasses:', error);
    throw new Error(
      error instanceof Error 
        ? `Failed to fetch glasses: ${error.message}`
        : 'Failed to fetch glasses: Unknown error'
    );
  }
}

// Fetch a single glasses product by ID
export async function fetchGlassesById(id: number): Promise<CartProduct | null> {
  try {
    const url = `${API_BASE_URL}/products/${id}?with=attributes,variants`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    const apiProduct: ApiProduct = await response.json();
    
    // Check if it's actually a glasses product
    const mainCategory = getAttributeValue(apiProduct.attributes, 'mainCategory');
    if (mainCategory !== 'Brillen') {
      return null;
    }
    
    return transformProduct(apiProduct);
    
  } catch (error) {
    console.error('Error fetching glasses by ID:', error);
    throw new Error(
      error instanceof Error 
        ? `Failed to fetch glasses: ${error.message}`
        : 'Failed to fetch glasses: Unknown error'
    );
  }
}

// Get all available glasses brands
export async function fetchGlassesBrands(): Promise<string[]> {
  try {
    const products = await fetchGlasses({ limit: 100 });
    const brands = [...new Set(products.map(p => p.brand).filter(Boolean))];
    return brands.sort();
  } catch (error) {
    console.error('Error fetching glasses brands:', error);
    return [];
  }
}

// Get all available glasses categories
export async function fetchGlassesCategories(): Promise<string[]> {
  try {
    const products = await fetchGlasses({ limit: 100 });
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))] as string[];
    return categories.sort();
  } catch (error) {
    console.error('Error fetching glasses categories:', error);
    return [];
  }
}