


import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Cart from "../Components/Cart/Cart";
import { GET_CATEGORIES } from "../apollo/queries/categories";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const navigate = useNavigate();
  const {  data } = useQuery(GET_CATEGORIES);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories: string[] = React.useMemo(
    () => data?.categories.map((cat: { name: string }) => cat.name) || [],
    [data]
  );

  useEffect(() => {
    const storedCategory = localStorage.getItem("selectedCategory");
    if (storedCategory) {
      setSelectedCategory(storedCategory);
    } else if (categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, setSelectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    localStorage.setItem("selectedCategory", category); 
    navigate("/"); 
  };

  return (
    <header className="bg-white lg:px-28 md:p-4">
      <div className="flex items-center justify-between mx-4 md:mx-10 lg:mx-20">
        <nav className="hidden md:flex space-x-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`relative uppercase ${
                selectedCategory === category
                  ? "font-semibold text-[#5ECE7B]"
                  : "font-normal text-[#1D1F22]"
              }`}
            >
              {category}
              {selectedCategory === category && (
                <span className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-green-500"></span>
              )}
            </button>
          ))}
        </nav>

        <div className="flex justify-center flex-grow md:flex-grow-0">
            <img
              src="/assets/logos/a-logo.svg"
              alt="Logo"
              className="h-[41px]"
            />
        </div>

        <div className="md:hidden absolute">
          <Cart />
        </div>
        <div className="hidden md:flex">
          <Cart />
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <h1>X</h1> : <h1>Menu</h1>}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden flex flex-col items-start space-y-4 mt-4 p-4 absolute left-0 top-16 bg-white w-full shadow-md">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                handleCategoryClick(category);
                setIsMenuOpen(false);
              }}
              className={`uppercase ${
                selectedCategory === category
                  ? "font-semibold text-[#5ECE7B]"
                  : "font-normal text-[#1D1F22]"
              }`}
            >
              {category}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
