import React from 'react';
import Image from 'next/image';

const Poster = () => {
  return (
    <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
      {/* Use the Image component for optimized loading */}
      <Image
        src="/images/poster.jpeg"
        alt="banner"
        layout="responsive" // This will make the image responsive to container width
        width={1920} // Set the natural width of the image (adjust based on your image size)
        height={1080} // Set the natural height (adjust based on your image size)
        objectFit="cover" // Ensures the image scales proportionally
        priority // Loads the image faster as it's critical
      />
    </div>
  );
};

export default Poster;
