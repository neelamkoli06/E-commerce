// components/FavoriteList.js

import React from "react";
import { RxCross1 } from "react-icons/rx";
import { useFilter } from "@/context/CartContext";

const FavoriteList = ({ closeDropdowns }) => {
  const { favoriteItems, toggleFavorite } = useFilter();

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg border p-4 z-10">
      {/* Close Button */}
      <button
        onClick={closeDropdowns}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <RxCross1 className="h-5 w-5" />
      </button>

      <h3 className="text-lg font-semibold mb-4">My Favorites</h3>
      {favoriteItems.length === 0 ? (
        <p className="text-center text-sm text-gray-500">No favorites yet.</p>
      ) : (
        <ul className="space-y-4">
          {favoriteItems.map((item) => (
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

              {/* Delete Favorite Icon */}
              <button
                onClick={() => toggleFavorite(item)}
                className="text-dark"
              >
                <RxCross1 className="text-lg" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteList;
