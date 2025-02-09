import React from "react";

import type { CartQuantityProps } from "../../types/cart";

const CartQuantity: React.FC<CartQuantityProps> = ({ item, onQuantityChange }) => {
  return (
    <div className="relative flex flex-col justify-center align-center">
      <button
        onClick={() => onQuantityChange(item.id, 1)}
        className="text-black border-2 border-black px-[7px] font-semibold"
        data-testid="cart-item-amount-increase"
      >
        +
      </button>
      <span
        className="text-sm mt-2 mb-2 py-8 text-black text-center font-semibold"
        data-testid="cart-item-amount"
      >
        {item.quantity}
      </span>
      <button
        onClick={() => onQuantityChange(item.id, -1)}
        className="text-black border-2 border-black px-[7px] font-semibold"
        data-testid="cart-item-amount-decrease"
      >
        -
      </button>
    </div>
  );
};

export default CartQuantity;
