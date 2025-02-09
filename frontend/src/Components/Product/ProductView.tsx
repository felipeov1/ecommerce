
import { useState } from "react"; 
import { useCart } from "../../hooks/useCart";

import { Attribute, AttributeItem } from "../../types/attribute";

import { CartItem } from "../../types/cart";

import { useLocation } from "react-router-dom"; 

import ImageGallery from "../../Components/Product/ImagesGallery";
import Attributes from "./Attributes";

const ProductView = () => {
  const location = useLocation();

  const product = location.state;

  
  const { addToCart } = useCart();
  
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [productId: string]: { [attributeId: string]: string };
  }>({});

    const isAllAttributesSelected = product.attributes.every(
    (attribute: Attribute) =>
      selectedAttributes[product.id]?.[attribute.name] !== undefined
  );

  const cartId = crypto.randomUUID(); 


  const handleAddToCart = () => {
    const productToCart: CartItem = {
      id: product.id,
      name: product.name,
      inStock: product.isOutOfStock,
      gallery: product.gallery,
      description: product.description || "",
      category: product.category || "vazio",
      attributes: product.attributes.map((attribute: Attribute) => ({
        ...attribute,
        items: attribute.items.map((item: AttributeItem) => ({
          ...item,
          selected:
            selectedAttributes[product.id]?.[attribute.name] === item.value,
            cartId: cartId, 
          })),
      })),
      prices: product.prices,
      brand: product.brand || "Unknown",
      quantity: 1,
    };

    addToCart(productToCart);
  };

  const handleAttributeSelection = (
    productId: string,
    attributeId: string,
    value: string
  ) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [attributeId]: value,
      },
    }));
  };

  return (
    <div className="min-h-fit flex flex-col px-[10px] mt-2">
      <div className="flex flex-col lg:px-[100px] mt-12">
        <div className="flex flex-col justify-between md:flex-row">

          <div className="md:w-[80%]">
            <ImageGallery thumbnails={product.gallery} />
          </div>


          <div className="md:w-[30%] w-screen max-h-[90vh] overflow-y-auto">
            <h1 className="text-2xl font-bold mb-8 text-black">
              {product.name}
            </h1>


            <Attributes
              productId={product.id}
              attributes={product.attributes}
              onAttributeSelection={
                !product.inStock ? handleAttributeSelection : () => {}
              }
              customClass={(attributeId: string, itemValue: string) => {
                if (Attributes.name === "Color") {
                  return selectedAttributes[product.id]?.[attributeId] ===
                    itemValue
                    ? "border-green-500 bg-green-500 text-white" 
                    : "border-gray-300 bg-white text-black hover:bg-gray-100"; 
                }
                return selectedAttributes[product.id]?.[attributeId] ===
                  itemValue
                  ? "border-black bg-black text-white" 
                  : "border-[#1D1F22] bg-white text-black hover:bg-gray-200"; 
              }}
              disabled={product.inStock == "true"} 
            />

            <p className="text-lg font-bold text-black mt-4">PRICE:</p>
            <p className="text-2xl font-bold text-black mt-4">
              {product.prices[0].currency.symbol}
              {product.prices[0].amount}
            </p>

            <button
              className={`md:w-[292px] w-screen mt-6 text-white py-3 ${
                product.isOutOfStock
                  ? "bg-gray-400 cursor-not-allowed" 
                  : isAllAttributesSelected
                  ? "bg-[#5ECE7B] hover:bg-[#57ce76] cursor-pointer" 
                  : "bg-gray-400 cursor-not-allowed" 
              }`}
              onClick={handleAddToCart}
              disabled={product.isOutOfStock || !isAllAttributesSelected}
            >
              {
                product.isOutOfStock
                  ? "Out of Stock" 
                  : isAllAttributesSelected
                  ? "Add to Cart" 
                  : "Select All Attributes" 
              }
            </button>

            <p
              className="text-gray-600 mt-10"
              data-testid="product-description"
            >
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
