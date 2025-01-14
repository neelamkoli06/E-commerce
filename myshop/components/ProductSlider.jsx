import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link'; // Import Link for navigation
import { fetchProducts } from '@/api/products';

const ProductSlider = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="product-slider mt-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 text-center">You may also like</h2>
      
      <Swiper
        spaceBetween={20}
        navigation
        loop={true}
        centeredSlides={true}
        modules={[Navigation]}
        className="w-full max-w-7xl mx-auto"
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Link href={`/product/${product.id}`} passHref>
              <div className="bg-white rounded-xl shadow-lg p-4 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer">
                <div className="relative w-full h-64 overflow-hidden rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full z-80 transition-all duration-300 ease-in-out hover:scale-110"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {product.title.length > 18
                      ? `${product.title.substring(0, 18)}...`
                      : product.title}
                  </h3>
                  <p className="text-lg text-blue-600 mt-2 font-medium">${product.price}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
