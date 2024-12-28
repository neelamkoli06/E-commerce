// components/CartDetails.js
import { useFilter } from '@/context/CartContext';
import Link from 'next/link';
import HeaderTop from "@/components/HeaderTop";
import { RxCross1 } from "react-icons/rx";

const CartDetails = ({ cartItem }) => {
  const { updateCartItem, removeCartItem } = useFilter();

  return (
    <li
      key={cartItem.id}
      className="flex flex-wrap items-center justify-between bg-white p-5 rounded-lg"
    >
      
      <div className="flex items-center space-x-5 w-full sm:w-auto">
        <Link href={`/product/${cartItem.id}`} passHref>
          <div className="flex items-center space-x-5 w-full sm:w-auto">
            <img
              src={cartItem.image}
              alt={cartItem.title}
              className="h-24 w-24 object-cover rounded-lg border border-gray-200"
            />
            <div className="flex-1">
              <h3 className="text-x font-semibold text-gray-800">{cartItem.title}</h3>
              <p className="text-gray-600">Price: ${cartItem.price}</p>
              <p className="text-gray-600">Total: ${(cartItem.price * cartItem.quantity).toFixed(2)}</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => updateCartItem(cartItem.id, cartItem.quantity - 1)}
          disabled={cartItem.quantity <= 1}
          className="p-2 border transition duration-300 ease-in-out"
        >
          -
        </button>
        <span className="text-lg font-medium text-gray-700">{cartItem.quantity}</span>
        <button
          onClick={() => updateCartItem(cartItem.id, cartItem.quantity + 1)}
          className="p-2 border transition duration-300 ease-in-out"
        >
          +
        </button>
        <button
          onClick={() => removeCartItem(cartItem.id)}
          className="p-2  text-dark hover:bg-red-400  transition duration-300 ease-in-out"
        >
          <span className="text-sm"><RxCross1 /></span>
        </button>
      </div>
    </li>
  );
};

export default CartDetails;
