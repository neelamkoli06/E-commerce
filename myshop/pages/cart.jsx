// pages/cart.js
import { useFilter } from '@/context/CartContext';
import { useState } from 'react';
import Link from 'next/link';
import CartDetails from '@/components/CartDetails';
import { useRouter } from 'next/router';

const Cart = () => {
  const { cartItems, total } = useFilter();
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  const router = useRouter();

  const handleCheckout = () => {
    // Navigate to the checkout page when the button is clicked
    router.push('/checkout');
  };

  return (
    <div className="cart container mx-auto p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">My Cart</h2>
      
      {/* Home Button */}
      <div className="mb-6">
        <Link href="/" className="inline-block text-dark hover:underline transition duration-300 ease-in-out">
          &larr; Back to Home
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center text-lg text-gray-600">Cart is empty.</div>
      ) : (
        <>
          <ul className="space-y-6">
            {cartItems.map((cartItem) => (
              <CartDetails key={cartItem.id} cartItem={cartItem} />
            ))}
          </ul>

          {/* Cart Total */}
          <div className="mt-6 p-5 rounded-lg flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">Total Price:</h3>
            <p className="text-xl font-bold text-dark">${total}</p>
          </div>

          <div>
      {/* Checkout Button */}
      <div className="mt-6">
        <button
          onClick={handleCheckout}
          className="w-full py-3 bg-dark text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
        </>
      )}
    </div>
  );
};

export default Cart;
