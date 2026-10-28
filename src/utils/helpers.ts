import type { CartItem, Product } from '@/types';

export const formatPrice = (price: number, _currency = 'DZD'): string => {
  return new Intl.NumberFormat('fr-DZ', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price) + ' DZD';
};

export const getProductBySlug = (products: Product[], slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getProductsByCollection = (products: Product[], collectionId: string): Product[] =>
  products.filter((p) => p.collectionId === collectionId);

export const getRelatedProducts = (products: Product[], product: Product, limit = 4): Product[] =>
  products
    .filter((p) => p.id !== product.id && p.collectionId === product.collectionId)
    .slice(0, limit);

export const isVariantInStock = (product: Product, colorId: string): boolean => {
  const variant = product.variants.find((v) => v.colorId === colorId);
  return variant ? variant.inStock : false;
};

export const cartTotal = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const cartCount = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.quantity, 0);

export const generateOrderRef = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `MG-${timestamp}-${random}`;
};

export const slugify = (s: string): string =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
