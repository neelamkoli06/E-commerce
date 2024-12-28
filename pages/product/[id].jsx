import { fetchProductById } from '@/api/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductImage from '@/components/ProductImage';
import ProductInfo from '@/components/ProductInfo';
import ProductSlider from '@/components/ProductSlider';
import AddToCartButton from '@/components/AddToCartButton';
import Link from 'next/link';

const ProductDetails = ({ product }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Main Content */}
      <div className="  p-6 sm:p-10 max-w-4xl mx-auto mt-10">
        <div className="flex flex-col md:flex-row gap-8 center">
          {/* Product Image */}
          <ProductImage image={product.image} title={product.title} />

          {/* Product Info and Actions */}
          <div className="w-full md:w-1/2 ">
          
            <ProductInfo 
              title={product.title} 
              description={product.description} 
              price={product.price} 
              category={product.category} 
            />
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>


    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  try {
    const product = await fetchProductById(id);

    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Error fetching product by id in getServerSideProps:', error);

    return {
      notFound: true,
    };
  }
};

export default ProductDetails;
