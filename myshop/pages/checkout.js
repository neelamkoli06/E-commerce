import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFilter } from '../context/CartContext';
import Link from 'next/link';

const Checkout = () => {
  const { cartItems, total, removeCartItem, updateCartItem } = useFilter();
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [error, setError] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expirationDate: '',
    cvv: '',
  });
  const router = useRouter();

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/'); // Redirect to home page if cart is empty
    }
  }, [cartItems, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in shippingDetails) {
      setShippingDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setCardDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();

    if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.city || !shippingDetails.zip) {
      setError('Please fill in all shipping fields.');
      return;
    }

    if (!cardDetails.cardNumber || !cardDetails.cardHolder || !cardDetails.expirationDate || !cardDetails.cvv) {
      setError('Please fill in all card details.');
      return;
    }

    // Simulate order completion (e.g., integrate Stripe later)
    console.log('Order Completed!', { shippingDetails, cardDetails, cartItems, total });
    // Clear cart
    localStorage.removeItem('cartItems');
    router.push('/order-success'); // Redirect to success page after order completion
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Home Button */}
      <div className="mb-6">
        <Link href="/" className="inline-block text-dark hover:underline transition duration-300 ease-in-out">
          &larr; Back to Home
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Checkout</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Cart Items */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium mb-4 text-gray-800">Your Cart</h2>
          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-600">Your cart is empty</p>
            ) : (
              cartItems.map((product) => (
                <div key={product.id} className="flex justify-between items-center border-b pb-4">
                  {/* Displaying product image and name */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image} // Assuming the product has an 'image' field
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <span className="text-gray-700">{product.name}</span>
                  </div>
                  <span className="text-gray-700">${product.price} x {product.quantity}</span>
                  <button
                    onClick={() => removeCartItem(product.id)}
                    className="text-red-500 hover:text-red-700 transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="mt-4 font-semibold text-lg text-gray-800">Total: ${total}</div>
        </div>

        {/* Shipping Information */}
        <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-medium mb-4 text-gray-800">Shipping Information</h2>
          <form onSubmit={handleCheckout}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={shippingDetails.name}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={shippingDetails.address}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Street address"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={shippingDetails.city}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip Code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={shippingDetails.zip}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Zip code"
              />
            </div>

            {/* Payment Method */}
            <div className="mb-4">
              <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">Payment Method</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            {/* Card Details Form (only visible if payment method is Credit Card) */}
            {paymentMethod === 'credit-card' && (
              <div>
                <div className="mb-4">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your card number"
                    maxLength="19"
                  />
                </div>
                <div className="flex gap-4 mb-4">
                  <div className="w-1/2">
                    <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                    <input
                      type="text"
                      id="cardHolder"
                      name="cardHolder"
                      value={cardDetails.cardHolder}
                      onChange={handleChange}
                      className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="w-1/4">
                    <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">Expiration Date</label>
                    <input
                      type="month"
                      id="expirationDate"
                      name="expirationDate"
                      value={cardDetails.expirationDate}
                      onChange={handleChange}
                      className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-1/4">
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleChange}
                      className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="123"
                      maxLength="4"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-dark text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
