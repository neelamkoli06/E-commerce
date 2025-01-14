import { useFilter } from '@/context/CartContext';

const AddToCartButton = ({ product }) => {
  const { addToCart, removeCartItem, cartItems } = useFilter();

  // Check if the product is already in the cart
  const isProductInCart = cartItems.some((item) => item.id === product.id);

  return (
    <>
      {isProductInCart ? (
        <button
          onClick={() => removeCartItem(product.id)}
          className="w-full py-3 bg-dark text-white rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-all ease-in-out transform hover:scale-105"
        >
          Remove from Cart
        </button>
      ) : (
        <button 
          onClick={() => addToCart(product)}
          className="w-full py-3 bg-dark text-white rounded-lg shadow-md hover:SageGreen focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-all ease-in-out transform hover:scale-105"
        >
          Add to Cart
        </button>
      )}
    </>
  );
};

export default AddToCartButton;
