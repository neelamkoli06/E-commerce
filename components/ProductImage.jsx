import Image from 'next/image';

const ProductImage = ({ image, title }) => {
  return (
    <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
      <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-112 xl:h-128 rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={title}
          layout="intrinsic"
          width={500}
          height={500}
          objectFit="contain"
          className="transform transition duration-500 hover:scale-105 shadow-xl rounded-lg"
        />
      </div>
    </div>
  );
};

export default ProductImage;
