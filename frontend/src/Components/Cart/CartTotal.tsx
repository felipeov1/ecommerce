import React from "react";

import type { CartTotalProps } from "../../types/cart";

const CartTotal: React.FC<CartTotalProps> = ({ total }) => {
  return (
    <div className="mt-6 pt-4 flex justify-between items-center">
      <span className="text-lg font-bold text-black">Total:</span>
      <span className="text-lg font-bold text-black">${total.toFixed(2)}</span>
    </div>
  );
};

export default CartTotal;


