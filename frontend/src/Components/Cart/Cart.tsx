import React, { useState, useEffect, useMemo } from "react";
import { useCart } from "../../hooks/useCart";

import CartItem from "./CartItem";
import CartTotal from "./CartTotal";


import { useMutation } from "@apollo/client";
import { PLACE_ORDER_MUTATION } from "../../apollo/queries/order";

const Cart: React.FC = () => {
  const { cartItems, handleQuantityChange, updateCartItemAttributes, clearCart } =
    useCart();
  const [isOpen, setIsOpen] = useState(false);

  const [placeOrder, { loading }] = useMutation(PLACE_ORDER_MUTATION, {
    onCompleted: () => {
      clearCart(); 
      alert("Order placed successfully!");
    },
    onError: (error) => {
      alert("Error placing order: " + error.message);
    },
  });

  const handleAttributeSelection = (

    productId: string,
    attributeId: string,
    value: string
  ) => {
    const item = cartItems.find((item) => item.id === productId);
    if (!item) return;

    const updatedAttributes = item.attributes.map((attr) => {
      if (attr.name === attributeId) {
        return {
          ...attr,
          items: attr.items.map((item) => ({
            ...item,
            selected: item.value === value,
          })),
        };
      }
      return attr;
    });

    updateCartItemAttributes(productId, updatedAttributes);
  };

  const handlePlaceOrder = () => {
    const orderItems = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      attributes: item.attributes.map((attr) => ({
        name: attr.name,
        value: attr.items.find((item) => item.selected)?.value || "",
      })),
    }));

    const total = cartItems.reduce(
      (sum, item) => sum + item.prices[0].amount * item.quantity,
      0
    );

    placeOrder({
      variables: {
        orderItems,
        total,
      },
    });
  };

  const total = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.prices[0].amount * item.quantity,
        0
      ),
    [cartItems]
  );

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscapeKey);
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscapeKey);
    }
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  return (
    <div className="relative mr-[101px]" data-testid="cart-container">
      <button
        className="relative flex items-center"
        onClick={() => setIsOpen(!isOpen)}
        data-testid="cart-btn"
      >
        <img
          src="/assets/icons/EmptyCart.svg"
          alt="Cart"
          className="w-[21px] h-[21px]"
          data-testid="cart-icon"
        />
        {cartItems.length > 0 && (
          <span
            className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
            data-testid="cart-count"
          >
            {cartItems.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="fixed top-[4.5rem] inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsOpen(false)}
          data-testid="cart-overlay"
        ></div>
      )}

      {isOpen && (
        <div
          className="absolute md:right-0 mt-2 lg:w-96 sm:w-96 w-64 bg-white p-4 z-20"
          data-testid="cart-dropdown"
        >
          <h3
            className="text-lg text-black font-bold mb-3"
            data-testid="cart-title"
          >
            My Bag,
            <span
              className="text-md ml-1 text-black font-medium"
              data-testid="cart-items-count"
            >
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </span>
          </h3>
          <div
            className={`space-y-7 ${
              cartItems.length > 2 ? "scroll max-h-[400px] overflow-y-auto" : ""
            }`}
            data-testid="cart-items"
          >
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onAttributeSelection={handleAttributeSelection}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>
          <CartTotal total={total} data-testid="cart-total" />
          <button
            className={`mt-10 mb-6 w-full ${
              cartItems.length === 0 ? "bg-gray-400" : "bg-[#5ECE7B]"
            } text-white py-2 font-medium`}
            onClick={handlePlaceOrder}
            disabled={cartItems.length === 0 || loading}
            data-testid="place-order-btn"
          >
            {loading ? "Placing Order..." : "PLACE ORDER"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;