import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, saveProducts, setError } from '../../features/product/productSlice';
import { addItem } from '../../features/cart/cartSlice';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Pagination } from 'flowbite-react';
import ProductSkeleton from '../ProductSkeleton';

function Main({ selectedBrand, selectedColor, sortBy }) {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((store) => store.products);
  const { items } = useSelector((store) => store.cart);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    async function fetchProducts() {
      dispatch(setLoading(true));
      const brandFilter = selectedBrand ? `brand_name=${selectedBrand}` : "";
      const query = brandFilter ? `?${brandFilter}` : "";
      const api = `https://headphones-server.onrender.com/products${query}`;

      try {
        const response = await fetch(api);
        const fetchedProducts = await response.json();

        const filteredData = selectedColor
          ? fetchedProducts.filter(product => product.color_options.includes(selectedColor))
          : fetchedProducts;

        dispatch(saveProducts(filteredData));
        dispatch(setError(null)); 
        // Reset to first page when filters change
        setCurrentPage(1);
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchProducts();
  }, [selectedBrand, selectedColor, sortBy, dispatch]);

  const sortedProducts = useMemo(() => {
    return [...products].sort((p1, p2) => {
      if (sortBy === "cheap") {
        return p1.price - p2.price;
      }
      if (sortBy === "expensive") {
        return p2.price - p1.price;
      }
      return 0;
    });
  }, [products, sortBy]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleAddToCart = (product) => {
    dispatch(addItem({ id: product.id, product }));
  };

  const getItemQuantity = (id) => {
    const item = items.find(item => item.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <main className="main container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        {loading ? (
          <ProductSkeleton />
        ) : (
          <h1 className="text-4xl font-bold text-gray-800 mb-4">GADGEDS</h1>
        )}
        {error && <p className="text-red-500">Error: {error}</p>}
      </div>

      {sortedProducts.length === 0 && !loading && !error && (
        <p className="text-center text-gray-400">No products found</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {currentProducts.map((p) => (
          <div 
            key={p.id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2"
          >
            <Link to={`/product/${p.id}`} className="block">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{p.name}</h3>
                <p className="text-gray-500 mb-1">{p.brand_name}</p>
                <p className="text-green-600 font-bold text-lg">${p.price}</p>
              </div>
            </Link>
            <div className="p-4 border-t">
              <div className="flex space-x-2 mb-4">
                {p.color_options.map((color, index) => (
                  <span
                    key={index}
                    className="w-6 h-6 rounded-full border-2 border-gray-300"
                    style={{ background: color }}
                  ></span>
                ))}
              </div>
              <button 
                className={`w-full py-3 rounded-lg flex justify-center items-center relative transition-colors ${
                  getItemQuantity(p.id) > 0 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-700 text-white hover:bg-green-800'
                }`}
                onClick={() => handleAddToCart(p)}
                disabled={getItemQuantity(p.id) > 0}
              >
                <FaShoppingCart className="mr-2" size={20} />
                Add to Cart
                {getItemQuantity(p.id) > 0 && (
                  <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {getItemQuantity(p.id)}
                  </span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {sortedProducts.length > productsPerPage && (
        <div className="flex justify-center ">
          <div className="custom-pagination flex items-center space-x-2">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(sortedProducts.length / productsPerPage)}
              onPageChange={(page) => setCurrentPage(page)}
              showIcons
              theme={{
                pages: {
                  base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
                  previous: {
                    base: "ml-0 rounded-l-lg border border-[#D5F8CF] bg-white py-2 px-3 leading-tight text-green-700 hover:bg-[#D5F8CF]",
                    icon: "h-5 w-5"
                  },
                  next: {
                    base: "rounded-r-lg border border-[#D5F8CF] bg-white py-2 px-3 leading-tight text-green-700 hover:bg-[#D5F8CF] ",
                    icon: "h-5 w-5", 
                    label: null
                  },
                  selector: {
                    base: "w-10 border border-[#D5F8CF] bg-white py-2 leading-tight  text-[#0BA42D] hover:bg-[#D5F8CF]  ",
                    active: "bg-[#D5F8CF] text-[#0BA42D]"
                  }
                }
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
}

export default Main;