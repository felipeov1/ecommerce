import React, { createContext, useState, useEffect, ReactNode } from "react";

import { CartItem } from "../types/cart";
import { Attribute } from "../types/attribute";

interface CartContextType {
  cartItems: CartItem[];
  isOpen: boolean;
  handleQuantityChange: (id: string, change: number) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartItemAttributes: (itemId: string, attributes: Attribute[]) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const generateCartItemId = (productId: string, attributes: Attribute[]) => {
    const attributeString = attributes
      .map((attr) => `${attr.name}:${attr.items.find((item) => item.selected)?.value}`)
      .join("|");
    return `${productId}|${attributeString}`;
  };

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: CartItem) => {
    setCartItems((prev) => {
      const cartItemId = generateCartItemId(product.id, product.attributes);
      const existingProduct = prev.find((item) => item.id === cartItemId);

      if (existingProduct) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, id: cartItemId, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) =>
      prev
        .filter((item) => !(item.id === id && item.quantity <= 1))
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
    );
  };

  const handleQuantityChange = (id: string, change: number) => {
    if (change > 0) {
      const item = cartItems.find((item) => item.id === id);
      if (item) addToCart(item);
    } else {
      removeFromCart(id);
    }
  };

  const updateCartItemAttributes = (
    itemId: string,
    newAttributes: Attribute[]
  ) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, attributes: newAttributes } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isOpen,
        handleQuantityChange,
        setIsOpen,
        addToCart,
        removeFromCart,
        updateCartItemAttributes,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

