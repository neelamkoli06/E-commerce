import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-dark text-white p-4 text-center bottom-0 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center">
      © 2024 E-commerce Powered By {" "}
      <span className="text-blue-500 font-semibold">
        Futurism Technologies Pvt. Ltd.
      </span>
      </div>
    </footer>
  );
};

export default Footer;
