import React from "react";

import type { CartItem } from "../../types/cart";
import type { CartItemProps } from "../../types/cart";

import Attributes from "../Product/Attributes";
import CartQuantity from "./CartQuantity";


const CartItem: React.FC<CartItemProps> = ({
  item,
  onAttributeSelection,
  onQuantityChange,
}) => {
  return (
    <div
      key={item.id}
      data-testid={`cart-item-${item.id}`}
      className="flex items-center justify-between border-b py-4"
    >

      <div className="flex-1 pr-4">
        <h4 className="text-lg font-light mb-2 text-[#1D1F22]">{item.name}</h4>

        <Attributes
          productId={item.id}
          attributes={item.attributes}
          onAttributeSelection={onAttributeSelection}
        />
      </div>

      <div className="flex items-center">
        <CartQuantity item={item} onQuantityChange={onQuantityChange} />
        <img
          src={item.gallery[0]}
          alt={item.name}
          className="h-[167px] lg:w-[121px] w-[100px]  ml-4"
        />
      </div>
    </div>
  );
};

export default CartItem;
