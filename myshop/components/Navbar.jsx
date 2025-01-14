// components/Navbar.js

import React, { useState } from "react";
import { FaHeart } from "react-icons/fa"; // Importing favorite icon
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useFilter } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import FavoriteList from "./FavoriteList"; // Import the FavoriteList component

const Navbar = () => {
  const { cartItems, favoriteItems, removeCartItem } = useFilter();
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isFavoriteDropdownOpen, setIsFavoriteDropdownOpen] = useState(false);

  // Cart count logic
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const favoriteCount = favoriteItems.length;

  // Toggle cart dropdown visibility
  const toggleCartDropdown = () => {
    setIsCartDropdownOpen((prev) => !prev);
    setIsFavoriteDropdownOpen(false); // Close favorite dropdown when cart dropdown opens
  };

  // Toggle favorite dropdown visibility
  const toggleFavoriteDropdown = () => {
    setIsFavoriteDropdownOpen((prev) => !prev);
    setIsCartDropdownOpen(false); // Close cart dropdown when favorite dropdown opens
  };

  // Close dropdowns
  const closeDropdowns = () => {
    setIsCartDropdownOpen(false);
    setIsFavoriteDropdownOpen(false);
  };

  return (
    <nav className="bg-dark from-indigo-600 via-purple-600 to-pink-600 shadow-lg transition-all duration-300">
      <div className="container mx-auto px-2 flex items-center justify-between h-16">
        {/* Left - Logo */}
        <div className="text-2xl font-bold text-white">
          <Link href="/">
            <Image
              // src="/images/logo.jpg"
              // alt="Company Logo"
              // width={150}
              // height={50}
              // className="object-contain"
              priority // Ensures the image is loaded quickly
            />
            MyShop
          </Link>
        </div>

        {/* Right - Favorite and Cart Icons */}
        <div className="relative flex items-center space-x-4">
          {/* Favorite Icon */}
          <div className="relative">
            <button onClick={toggleFavoriteDropdown} className="relative text-white">
              <FaHeart className="text-2xl" />
              {/* Badge for favorite count */}
              {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {favoriteCount}
                </span>
              )}
            </button>

            {/* Favorite Dropdown Menu */}
            {isFavoriteDropdownOpen && (
              <FavoriteList closeDropdowns={closeDropdowns} />
            )}
          </div>

          {/* Cart Icon */}
          <div className="relative">
            <button onClick={toggleCartDropdown} className="relative text-white">
              <HiOutlineShoppingBag className="text-2xl" />
              {/* Badge for cart count */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Cart Dropdown Menu */}
            {isCartDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg border p-4 z-10">
                {/* Close Button */}
                <button
                  onClick={closeDropdowns}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  <RxCross1 className="h-5 w-5" />
                </button>

                <h3 className="text-lg font-semibold mb-4">My Cart</h3>
                {cartItems.length === 0 ? (
                  <p className="text-center text-sm text-gray-500">Cart is empty.</p>
                ) : (
                  <ul className="space-y-4">
                    {cartItems.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center pb-4 border-b border-gray-300"
                      >
                        {/* Small product image */}
                        <div className="flex items-center space-x-2">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-10 w-10 object-cover rounded-lg border"
                          />
                          <div className="max-w-[150px]">
                            {/* Truncated title */}
                            <p className="font-semibold text-gray-800 truncate">{item.title}</p>
                          </div>
                        </div>

                        {/* Delete Icon (Trash) */}
                        <button
                          onClick={() => removeCartItem(item.id)}
                          className="text-dark"
                        >
                          <RxCross1 className="text-lg" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-4">
                  <Link href="/cart">
                    <button className="w-full text-center py-2 bg-dark text-white rounded-md hover:bg-SageGreen transition duration-300">
                      View Cart
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
