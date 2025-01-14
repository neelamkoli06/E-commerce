import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useFilter } from "@/context/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Heart icons for favorite
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import FilterComponent from "@/components/FilterComponent";
import Pagination from "@/components/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderTop from "@/components/HeaderTop";
import Poster from "../components/poster";

const Home = ({ initialProducts }) => {
  const {
    selectedCategory,
    priceRange,
    addToCart,
    toggleFavorite,
    isFavorite,
    favoriteItems,
  } = useFilter();
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const updatedFilteredProducts = products.filter((product) => {
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesPrice;
    });

    setFilteredProducts(updatedFilteredProducts);
  }, [products, selectedCategory, priceRange]);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.title} has been added to the cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
    });
  };

  const handleFavoriteToggle = (product) => {
    toggleFavorite(product);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderTop />
      <Navbar />

      <div className="container mx-auto p-4 lg:px-2 backdrop-blur-md bg-opacity-60">
        {/* SearchBar and FilterComponent */}
        <div className="flex items-center justify-center mb-6 flex-wrap">
          <div className="flex-grow sm:w-full md:w-3/4">
            <SearchBar
              products={products}
              setFilteredProducts={setFilteredProducts}
            />
          </div>
        </div>

        {/* Poster */}
        <Poster />

        {/* Product Grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
          {currentProducts.map((product) => (
            <li
              key={product.id}
              className="product-card rounded-lg shadow-lg p-4 hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out backdrop-blur-md bg-opacity-60"
            >
              <div className="relative w-full sm:w-1/2 mx-auto mb-4 lg:h-[200px]">
                <Image
                  className="rounded-lg object-cover"
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  objectFit="cover"
                />
              </div>
              <h2 className="text-sm sm:text-lg font-semibold text-dark truncate">
                {product.title}
              </h2>
              <p className="text-sm sm:text-md font-semibold text-dark-300 mt-2">
                Price: ${product.price}
              </p>

              {/* Favorite Icon */}
              <button
                onClick={() => handleFavoriteToggle(product)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                {isFavorite(product.id) ? (
                  <FaHeart size={20} />
                ) : (
                  <FaRegHeart size={20} />
                )}
              </button>

              {/* Add to Cart */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="p-2 bg-dark text-white rounded hover:bg-SageGreen hover:scale-110"
                >
                  Add To Cart
                </button>
                <Link
                  href={`/product/${product.id}`}
                  className="text-dark hover:underline transition font-medium mb-2 sm:mb-0"
                >
                  View details
                </Link>
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={filteredProducts.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <Footer />

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();

    return {
      props: {
        initialProducts: products,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        initialProducts: [],
      },
    };
  }
};

export default Home;
