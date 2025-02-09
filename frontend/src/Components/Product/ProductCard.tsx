import React, { useState } from "react";
import { useCart } from "../../hooks/useCart";

import { ProductCardProps } from "../../types/product";
import { CartItem } from "../../types/cart";

import { useNavigate } from "react-router-dom";

import { kebabCase } from "../../utils/helpers";

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  gallery,
  name,
  prices,
  isOutOfStock,
  description,
  category,
  attributes,
  brand,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    const defaultAttributes = attributes
      ? attributes.map((attr) => ({
          ...attr,
          items: attr.items.map((item, index) => ({
            ...item,
            selected: index === 0,
          })),
        }))
      : [];

    const product: CartItem = {
      id: String(id),
      name,
      inStock: !isOutOfStock,
      gallery,
      description,
      category,
      attributes: defaultAttributes,
      prices,
      brand,
      quantity: 1,
    };

    addToCart(product);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`, {
      state: {
        id,
        gallery,
        name,
        prices,
        description,
        category,
        attributes,
        brand,
        isOutOfStock,
      },
    });
  };

  const renderAddToCartButton = () => {
    if (isOutOfStock) return null; 

    const isMobile = window.innerWidth <= 768; 
    if (isMobile || isHovered) {
      return (
        <button
          className="absolute top-30 right-5 -translate-x-100 -translate-y-1/2 p-2 bg-[#5ECE7B] text-white rounded-full shadow-md"
          onClick={(event) => handleAddToCart(event)}
        >
          <img src="/assets/icons/EmptyCartWhite.svg" alt="cart" className="svg-cart" />
        </button>
      );
    }

    return null;
  };

  const renderOutOfStockMask = () => {
    if (!isOutOfStock) return null;
    return (
      <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
        <span className="text-[#8D8F9A] text-[24px] font-normal">
          OUT OF STOCK
        </span>
      </div>
    );
  };

  return (
    <div
      data-testid={`product-${kebabCase(name)}`}
      className="relative p-4 w-fit transition-shadow duration-300 ease-in-out hover:shadow-[0px_4px_35px_0px_rgba(168,172,188,0.3)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={gallery[0]}
          alt={name}
          className={`w-[354px] h-[330px] rounded-sm ${isOutOfStock ? "opacity-50" : ""}`}
        />
        {renderAddToCartButton()}
        {renderOutOfStockMask()}
      </div>
      <div className="mt-7">
        <h3 className="font-light text-lg text-[#1D1F22]">{name}</h3>
        {prices.map((price, index) => (
          <p key={index} className="text-[#1D1F22] font-normal text-lg">
            {price.currency.symbol}
            {price.amount}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
