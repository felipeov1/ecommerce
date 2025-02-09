import React, { useEffect, useState } from "react";

import Header from "../layouts/Header";
import ProductView from "../Components/Product/ProductView";

const ProductPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const storedCategory = localStorage.getItem("selectedCategory");
    if (storedCategory) {
      setSelectedCategory(storedCategory);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ProductView />
    </div>
  );
};

export default ProductPage;
