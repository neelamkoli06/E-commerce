const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-between items-center space-x-4 mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors"
        disabled={currentPage === 1}
      >
        <span className="font-semibold">Previous</span>
      </button>
      
      {/* <span className="text-lg font-medium text-gray-700">
        {`Page ${currentPage} of ${totalPages}`}
      </span> */}
      
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 disabled:opacity-50 transition-colors"
        disabled={currentPage === totalPages}
      >
        <span className="font-semibold">Next</span>
      </button>
    </div>
  );
};

export default Pagination;
