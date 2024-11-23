import React from 'react';

const ProductSkeleton = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(8).fill(null).map((_, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2"
          >
            {/* Image placeholder */}
            <div className="relative h-64 overflow-hidden bg-gray-200" />
            
            {/* Content area */}
            <div className="p-4">
              {/* Title */}
              <div className="h-6 bg-gray-200 rounded-md mb-2" />
              {/* Brand */}
              <div className="h-4 bg-gray-200 rounded-md w-2/3 mb-1" />
              {/* Price */}
              <div className="h-6 bg-gray-200 rounded-md w-1/3" />
            </div>

            {/* Bottom section */}
            <div className="p-4 border-t border-gray-100">
              {/* Color options */}
              <div className="flex space-x-2 mb-4">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-gray-200"
                  />
                ))}
              </div>
              {/* Button placeholder */}
              <div className="w-full h-12 bg-gray-200 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductSkeleton;