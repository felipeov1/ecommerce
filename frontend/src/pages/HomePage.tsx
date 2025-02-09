import React, { useEffect, useState } from "react";

import Header from "../layouts/Header";
import ProductList from "../Components/Product/ProductList";

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const storedCategory = localStorage.getItem("selectedCategory");
    if (storedCategory) {
      setSelectedCategory(storedCategory);
    }
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="lg:px-36 mt-10 flex-grow">
        <h2 className="text-[42px] font-normal mb-24 p-4 text-[#1D1F22] first-letter-uppercase">
          {selectedCategory}
        </h2>

        <ProductList selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default HomePage;
