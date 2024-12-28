
const ProductInfo = ({ title, description, price, category ,rating}) => {
  return (
    <>
      <h1 className="text-2xl sm:text-2xl font-extrabold text-gray-900 mb-4 leading-tight">
        {title}
      </h1>
      <p className=" sm-text-small text-gray-700 mb-6">{description}</p>
      <div className="flex items-center mb-4 space-x-4">
        <p className="text-xl sm:text-xl text-gray-800">Price:</p>
        <p className="text-xl sm:text-xl text-dark">${price}</p>
      </div>
      <p className="text-md sm:text-lg text-gray-600 font-medium mb-6">
        Category: {category}
      </p>
    </>
  );
};

export default ProductInfo;
