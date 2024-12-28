import { createContext, useContext, useState, useEffect } from 'react';
import { fetchCategories } from '@/api/products';

const CartContext = createContext(undefined);

export const FilterProvider = ({ children }) => {
  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorLoadingCategories, setErrorLoadingCategories] = useState(null);

  // Cart state
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        setErrorLoadingCategories('Error loading categories');
        console.error('Error loading categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();

    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);

    const storedFavoriteItems = JSON.parse(localStorage.getItem('favoriteItems')) || [];
    setFavoriteItems(storedFavoriteItems);
  }, []);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    if (favoriteItems.length > 0) {
      localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
    }
  }, [favoriteItems]);

  // Cart functions
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartItem = (productId, quantity) => {
    if (quantity <= 0) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeCartItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Favorite functions
  const toggleFavorite = (product) => {
    setFavoriteItems((prevItems) => {
      const isFavorite = prevItems.some((item) => item.id === product.id);
      if (isFavorite) {
        return prevItems.filter((item) => item.id !== product.id);
      } else {
        return [...prevItems, product];
      }
    });
  };

  const isFavorite = (productId) => {
    return favoriteItems.some((item) => item.id === productId);
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = cartItems.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(cartItems.length / itemsPerPage);

  return (
    <CartContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        categories,
        cartItems,
        addToCart,
        updateCartItem,
        removeCartItem,
        total,
        currentPage,
        setCurrentPage,
        totalPages,
        currentItems,
        loadingCategories,
        errorLoadingCategories,
        favoriteItems,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
