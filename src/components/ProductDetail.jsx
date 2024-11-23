import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { changeQuantity } from '../features/cart/cartSlice';
import Image from '../assets/images/test.jpg';
import { addItem } from '../features/cart/cartSlice';

const ProductPage = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.products);
  const { items } = useSelector((store) => store.cart);
  
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  
  useEffect(() => {
    const productData = products.find(product => product.id === id);
    setProduct(productData);
  }, [id, products]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (quantity) => {
    dispatch(changeQuantity({ id, quantity }));
  };
  
  const productInCart = items.find(item => item.id === id);

  const handleAddToCart = (product) => {
    dispatch(addItem({ id: product.id, product }));
  };
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative h-screen">
      <div className="lg:grid lg:grid-cols-2 lg:gap-12  mt-36">
        <div className="lg:col-span-1 flex justify-center">
          <div className="w-[400px] h-[400px]">
            <Slider {...sliderSettings}>
              {[1, 2, 3, 4].map(num => (
                <div key={num}>
                  <img
                    src={product?.image_url || Image}
                    alt={`Product Image ${num}`}
                    className="w-[400px] h-[400px] object-cover rounded-lg shadow-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="lg:col-span-1">
          <h1 className="text-3xl font-bold text-gray-900">{product?.name}</h1>
          <p className="text-sm text-gray-600">{product?.description}</p>
          <div className="mt-2">
            <span className="text-yellow-400 text-lg">
              {'★'.repeat(product?.ratings_stars)}{'☆'.repeat(5 - product?.ratings_stars)}
            </span>
            <span className="text-gray-600 text-sm ml-2">({product?.rating_counts} Reviews)</span>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-semibold text-gray-900">${product?.price}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Suggested payments with 6 months special financing</p>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Choose a color</h3>
            <div className="flex space-x-4 mt-2">
              {product?.color_options.map((color, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'ring-2 ring-purple-500' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorChange(color)}
                ></button>
              ))}
            </div>
          </div>

          <div className="flex items-center mt-6">
            <div className="flex border rounded-lg">
              <button
                className="px-3 py-1 bg-gray-100 rounded-l-lg"
                onClick={() => handleQuantityChange((productInCart?.quantity || 1) - 1)} 
                disabled={(productInCart?.quantity || 1) <= 1}
              >
                −
              </button>
              <span className="px-4 py-1 bg-white">{productInCart?.quantity || 1}</span>
              <button
                className="px-3 py-1 bg-gray-100 rounded-r-lg"
                onClick={() => handleQuantityChange((productInCart?.quantity || 1) + 1)}
              >
                +
              </button>
            </div>
            <span className="text-sm text-green-600 ml-4">Only 16 items left! Don’t miss it</span>
          </div>

          <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={() => handleAddToCart(product)}
          >
            <span className="text-lg">Add to Cart</span>
            <svg
              className="ml-2 w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.6 8M10 21h4M7 13h10l-1.6 8M16 21H8"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
