import React from "react";
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useRouter } from "next/router"; // Import useRouter for navigation

const HeaderTop = () => {
  const router = useRouter(); // Initialize the router

  // Handlers for navigation
  const handleLoginClick = () => {
    router.push("/login"); // Navigate to the login page
  };

  const handleSignUpClick = () => {
    router.push("/signup"); // Navigate to the signup page
  };

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-12 w-full px-4 md:px-6 py-2 md:py-0 justify-between items-center shadow-md bg-lightGreen dark:bg-gray-800 text-white dark:text-gray-200">
      {/* Social Icons */}
      <div className="flex flex-row gap-4 text-sm md:text-base">
        <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="hover:text-blue-500 transition duration-300 cursor-pointer" />
        </a>
        <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
          <FaInstagramSquare className="hover:text-pink-500 transition duration-300 cursor-pointer" />
        </a>
        <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="hover:text-blue-700 transition duration-300 cursor-pointer" />
        </a>
        <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="hover:text-sky-500 transition duration-300 cursor-pointer" />
        </a>
      </div>

      {/* Contact Information */}
      <div className="flex flex-col md:flex-row gap-4 text-sm md:text-base">
        {/* Email */}
        <div className="flex items-center gap-2">
          <MdEmail className="text-lg" aria-hidden="true" />
          <a
            href="mailto:e-commerce@gmail.com"
            className="hover:underline"
            aria-label="Send an email to e-commerce@gmail.com"
          >
            e-commerce@gmail.com
          </a>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2">
          <BsFillTelephoneFill className="text-lg" aria-hidden="true" />
          <a
            href="tel:+919999999999"
            className="hover:underline"
            aria-label="Call +91 9999999999"
          >
            +91 9999999999
          </a>
        </div>
      </div>

      {/* Login and SignUp Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleLoginClick} // Navigate to Login page
          className="px-4 py-1 text-sm font-medium text-white dark:text-gray-200 border border-gray-300 rounded hover:bg-SageGreen dark:hover:bg-gray-700 hover:shadow-md transition duration-300"
          aria-label="Login button"
        >
          Login
        </button>
        <button
          onClick={handleSignUpClick} // Navigate to SignUp page
          className="px-4 py-1 text-sm font-medium text-white bg-dark rounded hover:bg-SageGreen shadow hover:shadow-lg transition duration-300"
          aria-label="SignUp button"
        >
          SignUp
        </button>
      </div>
    </div>
  );
};

export default HeaderTop;
