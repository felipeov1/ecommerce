import type { Attribute } from "./attribute";

export type CartItem = {
  id: string;
  name: string;
  inStock: boolean; 
  gallery: string[]; 
  description: string;
  category: string;
  attributes: Attribute[]; 
  prices: Price[]; 
  brand: string;
  quantity: number; 
  cartId?: string; 
};

export interface CartItemProps {
  item: CartItem;
  onAttributeSelection: (
    productId: string,
    attributeId: string,
    value: string
  ) => void;
  onQuantityChange: (id: string, change: number) => void;
}

export interface CartQuantityProps {
  item: CartItem;
  onQuantityChange: (id: string, change: number) => void;
}

export interface CartTotalProps {
  total: number;
}

export interface CartAttributesProps {
  productId: string;
  attributes: Attribute[];
  onAttributeSelection: (
    id: string,
    attributeId: string,
    value: string
  ) => void;
  selectedAttributes?: { [productId: string]: { [attributeId: string]: string } };
  customClass?: (attributeId: string, itemValue: string) => string; 
  disabled?: boolean; 
}

