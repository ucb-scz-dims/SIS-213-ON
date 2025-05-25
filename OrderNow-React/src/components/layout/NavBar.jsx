import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart, useRestaurant } from "../../context/CartContext";
import SearchBar from "../SearchBar/SearchBarContainer";
import SearchBarContainer from "../SearchBar/SearchBarContainer";

const NavBar = () => {
  const { restaurantId } = useRestaurant();
  const products = useCart();
  const getQuantity = products.reduce(
    (acc) => acc + 1,
    0
  );

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurante/${restaurantId}/cart`);
  };

  const showCart = getQuantity > 0;

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 fixed top-0 left-0 w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            OrderNow
          </span>
        </a>
        <div className="flex md:order-2 gap-5">
          {/* Cart icon */}
          {showCart && (
            <div
              className="flex items-center justify-center cursor-pointer"
              onClick={handleClick}
            >
              <div className="relative scale-75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-8 w-8 text-black dark:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                <span className="absolute -top-2 left-4 rounded-full bg-red-500 p-0.5 px-2 text-sm text-red-50">
                  {getQuantity}
                </span>
              </div>
            </div>
          )}
          {/* Search bar component */}
          <SearchBarContainer />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;