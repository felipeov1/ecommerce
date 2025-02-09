import React, { memo } from "react";

import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../apollo/queries/product";

import ProductCard from "../Product/ProductCard";

import { Product } from "../../types/product"; 

interface ProductListProps {
  selectedCategory: string;
}

const ProductList: React.FC<ProductListProps> = memo(({ selectedCategory }) => {
  const { loading, data } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "cache-first",
  });
  

  if (loading) return 

  
  const products: Product[] = data.products;


  const filteredProducts = selectedCategory && selectedCategory !== "all"
  ? products.filter((product) => product.category === selectedCategory)
  : products;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          gallery={product.gallery}
          name={product.name}
          prices={product.prices} 
          isOutOfStock={product.in_stock === 0}
          description={product.description} 
          category={product.category} 
          attributes={product.attributes} 
          brand={product.brand}
        />
      ))}
    </div>
  );
});

export default ProductList;
