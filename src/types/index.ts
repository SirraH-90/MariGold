export type Currency = 'DZD';

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
}

export interface ProductVariant {
  colorId: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  currency: Currency;
  description: string;
  fabric: string;
  care: string;
  dimensions: string;
  images: string[];
  colors: ColorOption[];
  variants: ProductVariant[];
  collectionId: string;
  fabricCategory: string;
  isBestseller: boolean;
  isNew: boolean;
  rating: number;
  reviewCount: number;
  popularity: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  isDemo: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  colorId: string;
  colorName: string;
  quantity: number;
}

export interface Wilaya {
  code: string;
  name: string;
  homeDelivery: boolean;
  deskDelivery: boolean;
  homeFee: number;
  deskFee: number;
}
