import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { changeQuantity } from '../features/cart/cartSlice';
import Image from '../assets/images/test.jpg';
import { addItem } from '../features/cart/cartSlice';
import { ShoppingCart, Star, Truck, Shield } from 'lucide-react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductPage = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.products);
  const { items } = useSelector((store) => store.cart);
  
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  
  useEffect(() => {
    const productData = products.find(product => product.id === id);
    setProduct(productData);
    if (productData?.color_options?.length > 0) {
      setSelectedColor(productData.color_options[0]);
    }
  }, [id, products]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (quantity) => {
    dispatch(changeQuantity({ id, quantity }));
  };
  
  const productInCart = items.find(item => item.id === id);

  const handleAddToCart = async (product) => {
    setIsAdding(true);
    try {
      await dispatch(addItem({ 
        id: product.id, 
        product: {
          ...product,
          selectedColor
        }
      }));
      // Optional: Show success message or notification
    } catch (error) {
      // Handle error
    } finally {
      setIsAdding(false);
    }
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
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative min-h-screen pb-32">
      {/* Breadcrumb */}
      <nav className="pt-24 sm:pt-32 pb-6">
        <ol className="flex space-x-2 text-sm text-gray-500">
          <li><a href="/" className="hover:text-gray-900">Home</a></li>
          <li>/</li>
          <li><a href="/category" className="hover:text-gray-900">{product.category}</a></li>
          <li>/</li>
          <li className="text-gray-900">{product.name}</li>
        </ol>
      </nav>

      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Product Images */}
        <div className="lg:col-span-1 flex justify-center mb-8 lg:mb-0">
          <div className="w-full max-w-[500px]">
            <Slider {...sliderSettings}>
              {[1, 2, 3, 4].map(num => (
                <div key={num} className="focus:outline-none">
                  <img
                    src={product?.image_url || Image}
                    alt={`${product.name} - View ${num}`}
                    className="w-full h-[300px] sm:h-[500px] object-cover rounded-lg shadow-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:col-span-1 space-y-6">
          {/* Title and Brand */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>
            <p className="mt-2 text-lg text-gray-500">{product.brand_name}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={20}
                  fill={index < product.ratings_stars ? "currentColor" : "none"}
                  className={index < product.ratings_stars ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.rating_counts} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="border-t border-b border-gray-200 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </p>
                {product.old_price && (
                  <p className="text-sm text-gray-500 line-through">
                    ${product.old_price}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <div className="flex space-x-4 mt-2">
              {product.color_options.map((color, index) => (
                <button
                  key={index}
                  onClick={() => handleColorChange(color)}
                  className={`
                    w-8 h-8 rounded-full border-2 transition-all
                    ${selectedColor === color 
                      ? 'ring-2 ring-offset-2 ring-purple-500' 
                      : 'ring-transparent'
                    }
                  `}
                  style={{ backgroundColor: color }}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
            <div className="flex items-center space-x-4">
              <div className="flex border rounded-lg">
                <button
                  className="px-3 py-1 bg-gray-100 rounded-l-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                  onClick={() => handleQuantityChange((productInCart?.quantity || 1) - 1)} 
                  disabled={(productInCart?.quantity || 1) <= 1}
                >
                  −
                </button>
                <span className="px-6 py-1 bg-white flex items-center">
                  {productInCart?.quantity || 1}
                </span>
                <button
                  className="px-3 py-1 bg-gray-100 rounded-r-lg hover:bg-gray-200 transition-colors"
                  onClick={() => handleQuantityChange((productInCart?.quantity || 1) + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => handleAddToCart(product)}
            disabled={isAdding}
            className="w-full py-3 px-8 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 bg-purple-600 hover:bg-purple-700 text-white"
          >
            <ShoppingCart size={20} />
            <span>
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </span>
          </button>

          {/* Product Benefits */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">2 Year Warranty</span>
            </div>
          </div>

          {/* Product Description */}
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Product Description
            </h3>
            <div className="prose prose-sm text-gray-500">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;