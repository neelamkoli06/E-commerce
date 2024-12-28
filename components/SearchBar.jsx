import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa"; // Importing the search icon

const SearchBar = ({ products, setFilteredProducts }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const searchBarRef = useRef(null);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 2) {
      const suggestions = products.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchSuggestions(suggestions);
      setIsSuggestionsVisible(true);
    } else {
      setIsSuggestionsVisible(false);
    }
  };

  const handleSuggestionClick = (product) => {
    setSearchTerm(product.title);
    setIsSuggestionsVisible(false);
    setFilteredProducts([product]);
  };

  // Close dropdown when clicking outside the search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setIsSuggestionsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchBarRef} className="relative w-full">
      {/* Input Field with Search Icon */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchInputChange}
        className="w-full pl-10 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-dark"
        placeholder="Search here..."
      />

      {/* Search Icon inside input */}
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />

      {/* Dropdown Suggestions */}
      {isSuggestionsVisible && (
        <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 shadow-lg rounded-lg max-h-60 overflow-y-auto z-50">
          {searchSuggestions.length > 0 ? (
            searchSuggestions.map((product) => (
              <li
                key={product.id}
                className="flex items-center p-3 cursor-pointer hover:bg-gray-100 transition"
                onClick={() => handleSuggestionClick(product)}
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={30}
                  height={30}
                  objectFit="cover"
                  className="mr-3 rounded"
                />
                <span className="text-sm">{product.title}</span>
              </li>
            ))
          ) : (
            <li className="p-3 text-gray-500 text-center">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
