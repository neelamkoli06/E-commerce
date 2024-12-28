import Link from "next/link";

const Login = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Logo and Home Link */}
      <div className="flex items-center justify-center w-full absolute top-40 z-10">
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-SageGreen transition duration-300"
        >
          MyShop
        </Link>
      </div>

      {/* Login Form */}
      <div className="z-10">
        <h1 className="text-2xl font-semibold mb-4 text-white">Login</h1>
        <form className="bg-white p-6 rounded shadow-md w-96">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
              <p className=" px-2 py-4 text-grey-200 text-xs">Don't have account? Click here to <Link  href="/signup" className="text-blue-400 underline">Signup</Link></p>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-dark text-white rounded hover:bg-SageGreen transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
