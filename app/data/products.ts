export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;

  // Main category and niche
  mainCategory?: string;
  subCategory?: string;

  // Optional product images
  images?: string[];

  // Product variations
  colors?: string[];
  sizes?: string[];
  styles?: string[];

  // Optional stock
  stock?: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

// Products are loaded from Firebase.
// No hardcoded products are used.
export const products: Product[] = [];